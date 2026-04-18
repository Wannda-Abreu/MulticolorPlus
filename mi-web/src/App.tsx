import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/layout/SiteHeader";
import { Navigate, usePathname } from "./lib/router";
import { ADMIN_ROUTE_PATH } from "./lib/constants";
import { AdminAccessPage } from "./pages/AdminAccessPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  const pathname = usePathname();

  let content;

  if (pathname === "/") {
    content = <HomePage />;
  } else if (pathname === "/admin") {
    content = <Navigate to={ADMIN_ROUTE_PATH} replace />;
  } else if (pathname === ADMIN_ROUTE_PATH) {
    content = <AdminAccessPage />;
  } else if (pathname === "/checkout") {
    content = <CheckoutPage />;
  } else if (pathname === "/home") {
    content = <Navigate to="/" replace />;
  } else {
    content = <NotFoundPage />;
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff8f1_0%,#fff3f6_35%,#f7f6ff_68%,#eefcff_100%)] text-slate-950">
      <SiteHeader />
      {content}
      <SiteFooter />
    </div>
  );
}

export default App;
