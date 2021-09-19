import axios from "axios";
import { baseUrl } from "./Constatnts/Constants";
const instance = axios.create({
  baseURL: baseUrl,
});
export default instance;
