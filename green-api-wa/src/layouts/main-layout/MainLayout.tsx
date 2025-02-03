import { Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import "./mainlayout.css";
import Sidebar from "../../components/sidebar/Sidebar";

const MainLayout: React.FC = observer(() => {
  return (
    <div className="main-layout">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
});

export default MainLayout;
