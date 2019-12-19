import axios from "./axios";

export const get = (url = "", data = {}) => {
    return axios({
        method: "GET",
        url,
        data
    });
};

export const post = (url = "", data = {}) => {
    return axios({
        method: "POST",
        url,
        data
    });
};
