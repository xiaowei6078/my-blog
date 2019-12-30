import store from "@s";
import qs from "qs";

const req = request => {
    request.use(
        config => {
            const _t = Date.parse(new Date()) / 1000;
            if (store.getters.getToken) {
                // 让每个请求携带令牌——['Has-Token']作为自定义密钥。
                // 请根据实际情况修改。
                // config.headers['Has-Token'] = getToken()
            }

            if (config.method === "post") {
                //利用qs做json序列化
                config.data = qs.stringify({
                    ...config.data,
                    _t
                });
            } else {
                config.params = {
                    ...config.params,
                    _t
                };
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );
};

export default req;
