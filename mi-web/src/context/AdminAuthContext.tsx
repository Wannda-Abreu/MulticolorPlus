import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  ADMIN_PASSWORD,
  ADMIN_SESSION_STORAGE_KEY,
} from "../lib/constants";

interface AdminSession {
  isAuthenticated: boolean;
  writeApiKey: string;
}

interface AdminAuthContextValue extends AdminSession {
  login: (password: string, writeApiKey: string) => void;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(
  undefined,
);

const readAdminSession = (): AdminSession => {
  if (typeof window === "undefined") {
    return { isAuthenticated: false, writeApiKey: "" };
  }

  try {
    const raw = window.localStorage.getItem(ADMIN_SESSION_STORAGE_KEY);

    if (!raw) {
      return { isAuthenticated: false, writeApiKey: "" };
    }

    const parsed = JSON.parse(raw) as Partial<AdminSession>;

    return {
      isAuthenticated: Boolean(parsed.isAuthenticated),
      writeApiKey:
        typeof parsed.writeApiKey === "string" ? parsed.writeApiKey : "",
    };
  } catch {
    return { isAuthenticated: false, writeApiKey: "" };
  }
};

const persistAdminSession = (session: AdminSession) => {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    ADMIN_SESSION_STORAGE_KEY,
    JSON.stringify(session),
  );
};

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<AdminSession>(() => readAdminSession());

  const value = useMemo<AdminAuthContextValue>(
    () => ({
      ...session,
      login: (password, writeApiKey) => {
        if (password !== ADMIN_PASSWORD) {
          throw new Error("La contrasena de administrador no es correcta.");
        }

        const normalizedKey = writeApiKey.trim();

        if (!normalizedKey) {
          throw new Error("Introduce la API_KEY de escritura.");
        }

        const nextSession = {
          isAuthenticated: true,
          writeApiKey: normalizedKey,
        };

        setSession(nextSession);
        persistAdminSession(nextSession);
      },
      logout: () => {
        const nextSession = { isAuthenticated: false, writeApiKey: "" };
        setSession(nextSession);
        persistAdminSession(nextSession);
      },
    }),
    [session],
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error("useAdminAuth must be used inside AdminAuthProvider.");
  }

  return context;
};
