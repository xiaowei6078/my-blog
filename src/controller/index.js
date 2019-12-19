import loginApis from "./login/login.controller";

export default {
    install: Vue => {
        Vue.prototype.$http = {
            ...loginApis
        };
    }
};
