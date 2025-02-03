import { useNavigate } from "react-router-dom";
import "./sidebar.css";
import accountStore from "../../stores/accountStore/AccountStore";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <aside className="sidebar">
      <button>Chats</button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          accountStore.logout();
          navigate("auth/login");
        }}
      >
        LOG OUT
      </button>
    </aside>
  );
};

export default Sidebar;
