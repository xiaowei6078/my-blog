import router from "@r";
import store from "@s";
import { MessageBox, Message } from "element-ui";

const resDef = resArg => {
    resArg.use(
        response => {
            const res = response.data; //这是响应返回后的结果
            //在这里可以根据返回的状态码对存在响应错误的请求做拦截，提前做处理。

            //以下为我司的处理规则
            // 如果自定义代码不是200，则判断为错误。
            if (res.code === 0) {
                return res;
            }
            if (res.code === 200 || res.code === 300) {
                // 重新登陆
                MessageBox.confirm(
                    "您的登录状态存在问题，您可以取消以停留在此页面，或再次登录",
                    "系统提示",
                    {
                        confirmButtonText: "重新登录",
                        type: "warning"
                    }
                ).then(() => {
                    store.dispatch("user/resetToken").then(() => {
                        location.reload();
                    });
                    router.replace({
                        path: "/login"
                    });
                });
                return;
            } else {
                if (res.code == 700) {
                    Message.warning("您没有获取请求的权限！");
                    router.replace({
                        path: "/login"
                    });
                    return;
                } else {
                    return res;
                }
            }
        },
        error => {
            debugger;
            Message({
                message: error.message,
                type: "error",
                duration: 5 * 1000
            });
            return Promise.reject(error);
        }
    );
};

export default resDef;
