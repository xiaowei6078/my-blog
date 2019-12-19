import { get, post } from "../../services/index";

const loginApis = {
    login(data) {
        return post("/api/user/login", data);
    }
};

export default loginApis;
