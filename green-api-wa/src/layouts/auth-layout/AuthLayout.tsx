import { Outlet } from "react-router-dom";
import "./authlayout.css";

const AuthLayout: React.FC = () => {
  return (
    <div className="layout">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
