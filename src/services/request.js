import store from "@s";
import qs from "qs";

const req = request => {
    request.use(
        config => {
            if (store.getters.getToken) {
                // 让每个请求携带令牌——['Has-Token']作为自定义密钥。
                // 请根据实际情况修改。
                // config.headers['Has-Token'] = getToken()
            }
            //在这里根据自己相关的需求做不同请求头的切换，我司是需要使用这两种请求头。
            if (config.method === "post") {
                config.headers["Content-Type"] = "application/json";
                config.data = qs.stringify(config.data); //利用qs做json序列化
            } else {
                config.headers["Content-Type"] =
                    "application/x-www-form-urlencoded;charset=UTF-8";
            }
            console.log(config);
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );
};

export default req;
