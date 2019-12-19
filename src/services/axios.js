import axios from "axios";
import req from "./request";
import res from "./response";
import conf from "../conf/service.config";

const service = axios.create(conf);

req(service.interceptors.request);

res(service.interceptors.response);

export default service;
