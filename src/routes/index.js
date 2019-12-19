import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routers"

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: "/",
            redirect() {
                return "/login";
            }
        },
        ...routes
    ]
})

export default router;
