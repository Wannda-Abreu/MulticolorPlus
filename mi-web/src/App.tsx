import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { ProtectedAdminRoute } from "./components/admin/ProtectedAdminRoute";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/layout/SiteHeader";
import { AdminPage } from "./pages/AdminPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";

const ADMIN_ROUTE = "/___admin___multicolorplus___";

function App() {
  const location = useLocation();
  const isAdminRoute =
    location.pathname === ADMIN_ROUTE || location.pathname === "/admin";

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff8f1_0%,#fff3f6_35%,#f7f6ff_68%,#eefcff_100%)] text-slate-950">
      {!isAdminRoute ? <SiteHeader /> : null}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<Navigate to={ADMIN_ROUTE} replace />} />
        <Route
          path={ADMIN_ROUTE}
          element={
            <ProtectedAdminRoute>
              <AdminPage />
            </ProtectedAdminRoute>
          }
        />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!isAdminRoute ? <SiteFooter /> : null}
    </div>
  );
}

export default App;
