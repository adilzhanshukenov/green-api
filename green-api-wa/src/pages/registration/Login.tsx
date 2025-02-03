import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import accountStore from "../../stores/accountStore/AccountStore";

const Login: React.FC = () => {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setIApiTokenInstance] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    const accountNumber = idInstance.substring(0, 4);

    const apiUrl = `https://${accountNumber}.api.greenapi.com`;
    accountStore.login(idInstance, apiTokenInstance, apiUrl);
    navigate("/chatpage", { replace: true });
  };

  return (
    <div className="registration-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="input-div">
          <h2>Your IdInstance</h2>
          <input
            type="text"
            placeholder="type your IdInstance"
            value={idInstance}
            onChange={(e) => setIdInstance(e.target.value)}
          />
        </div>
        <div className="input-div">
          <h2>Your apiTokenInstance</h2>
          <input
            type="text"
            placeholder="type your apiTokenInstance"
            value={apiTokenInstance}
            onChange={(e) => setIApiTokenInstance(e.target.value)}
          />
        </div>
        <button type="submit">chat</button>
      </form>
    </div>
  );
};
export default Login;
