const conf = {
    baseURL: "http://localhost:9091",
    withCredentials: true, // 当跨域请求时发送cookie
    timeout: 30000, // 请求时间
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    }
};

export default conf;
