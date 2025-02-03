import { action, makeAutoObservable, observable } from "mobx";

class AccountStore {

    @observable idInstance = localStorage.getItem("idInstance") || "";
    @observable apiTokenInstance = localStorage.getItem("apiTokenInstance") || "";
    @observable apiUrl = localStorage.getItem("apiUrl") || "";
    @observable isLoggedIn = !!localStorage.getItem("isLoggedIn");

    constructor() {
        makeAutoObservable(this);
    }

    @action
    login = async(idInstance: string, apiTokenInstance: string, apiUrl: string) => {
        this.idInstance = idInstance;
        this.apiTokenInstance = apiTokenInstance;
        this.apiUrl = apiUrl
        this.isLoggedIn = true;
    
        // Save to localStorage
        localStorage.setItem("idInstance", idInstance);
        localStorage.setItem("apiTokenInstance", apiTokenInstance);
        localStorage.setItem("apiUrl", apiUrl);
        localStorage.setItem("isLoggedIn", "true");
      }


    @action
    logout = async () => {
        this.idInstance = "";
        this.apiTokenInstance = "";
        this.isLoggedIn = false;

        // Remove from localStorage
        localStorage.removeItem("idInstance");
        localStorage.removeItem("apiTokenInstance");
        localStorage.removeItem("apiUrl");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("chats");
        localStorage.removeItem("contacts");
    }
}

const accountStore = new AccountStore();
export default accountStore;