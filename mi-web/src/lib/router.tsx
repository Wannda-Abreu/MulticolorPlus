import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";

const RouterContext = createContext<{
  pathname: string;
  navigate: (to: string, replace?: boolean) => void;
} | null>(null);

const basePath = (import.meta.env.BASE_URL || "/").replace(/\/$/, "") || "";

const stripBase = (pathname: string) => {
  if (!basePath) return pathname || "/";
  return pathname.startsWith(basePath)
    ? pathname.slice(basePath.length) || "/"
    : pathname || "/";
};

const withBase = (pathname: string) => {
  if (!basePath) return pathname;
  return `${basePath}${pathname === "/" ? "" : pathname}`;
};

const readPathname = () => stripBase(window.location.pathname);

export const RouterProvider = ({ children }: { children: ReactNode }) => {
  const [pathname, setPathname] = useState(() =>
    typeof window === "undefined" ? "/" : readPathname(),
  );

  useEffect(() => {
    const handlePopState = () => setPathname(readPathname());

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const value = useMemo(
    () => ({
      pathname,
      navigate: (to: string, replace = false) => {
        const target = withBase(to);

        if (replace) {
          window.history.replaceState({}, "", target);
        } else {
          window.history.pushState({}, "", target);
        }

        setPathname(to);
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    }),
    [pathname],
  );

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
};

const useRouter = () => {
  const context = useContext(RouterContext);

  if (!context) {
    throw new Error("Router components must be used inside RouterProvider.");
  }

  return context;
};

export const usePathname = () => useRouter().pathname;

export const Navigate = ({
  to,
  replace = false,
}: {
  to: string;
  replace?: boolean;
}) => {
  const { navigate } = useRouter();

  useEffect(() => {
    navigate(to, replace);
  }, [navigate, replace, to]);

  return null;
};

export const Link = ({
  to,
  onClick,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
}) => {
  const { navigate } = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      props.target === "_blank" ||
      to.startsWith("http") ||
      to.startsWith("#")
    ) {
      return;
    }

    event.preventDefault();
    navigate(to);
  };

  return (
    <a href={withBase(to)} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};

export const NavLink = ({
  to,
  end = false,
  className,
  ...props
}: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
  to: string;
  end?: boolean;
  className?: string | ((state: { isActive: boolean }) => string);
}) => {
  const pathname = usePathname();
  const isActive =
    to === "/"
      ? pathname === "/"
      : end
        ? pathname === to
        : pathname === to || pathname.startsWith(`${to}/`);

  const resolvedClassName =
    typeof className === "function" ? className({ isActive }) : className;

  return <Link to={to} className={resolvedClassName} {...props} />;
};
