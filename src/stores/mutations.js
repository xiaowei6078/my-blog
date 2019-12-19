import { TEST, SET_TOKEN } from "./mutationsTypes";

const mutations = {
    [TEST](state) {
        state.num++;
    },
    [SET_TOKEN](state, token) {
        state.token = token;
    }
}

export default mutations;