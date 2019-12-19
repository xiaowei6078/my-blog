import { TEST, SET_TOKEN } from "./mutationsTypes";

const actions = {
    test({ commit }) {
        commit(TEST);
    },
    setToken({ commit }) {
        commit(SET_TOKEN);
    }
}

export default actions;