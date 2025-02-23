import axios from "axios";
import { getCookie, setCookie } from "../utils/cookie";
import { getNewToken } from "../services/token";

const api = axios.create({
  baseURL:"http://localhost:3400/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (request)=>{
  const accessToken=getCookie("accessToken");
  if(accessToken){
    request.headers["Authorization"]=`bearer ${accessToken}`;
  }
  return request;
},
  (error)=>{return Promise.reject(error)}
);

api.interceptors.response.use(
  (response)=>{
    return response;
  },
  async(error)=>{
    const orginialRequest=error.config;
    if(error.response.status===401&& !orginialRequest._retry){
      orginialRequest._retry=true;
      
      const res=await getNewToken();
      if(!res?.response)return;
      setCookie(res.response.data);

      return api(orginialRequest);
    }
  }
)

export default api;
