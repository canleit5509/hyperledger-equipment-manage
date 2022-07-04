import axios from "axios";
import Vue from "vue";
import router from '../router/index'
const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL || "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});

axiosInstance.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    Vue.toasted.error("Your session has expired. Please login again.");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push({
      path: "/login"
    });
  }
  return Promise.reject(error);
});
const handleSuccessResponse = (response, resolve, message) => {
  resolve(response);
  if (message) {
    Vue.toasted.success(message, {
      duration: 5000
    })
  }
};

const handleErrorResponse = (error, reject) => {
  reject(error);
  let messages = (error.response.data.message);
  if (typeof(messages) == 'object') messages = Object.values(messages);
  Vue.toasted.error( messages, {
    duration: 5000
  })
};

let API_URL = process.env.VUE_APP_API_DEV_URL;

const service = {
  get(endPoint) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(`${API_URL}${endPoint}`, {
          headers: localStorage.getItem("token")
            ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
            : null,
        })
        .then((response) => {
          handleSuccessResponse(response, resolve);
        })
        .catch((error) => {
          handleErrorResponse(error, reject);
        });
    });
  },
  getListUser(endPoint, params) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(`${API_URL}${endPoint}`, params, {
          headers: localStorage.getItem("token")
            ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
            : null,
        })
        .then((response) => {
          handleSuccessResponse(response, resolve);
        })
        .catch((error) => {
          handleErrorResponse(error, reject);
        });
    });
  },
  post(endPoint, params, mess) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`${API_URL}${endPoint}`, params, {
          headers: localStorage.getItem("token")
            ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
            : null,
        })
        .then((response) => {
          handleSuccessResponse(response, resolve, mess);
        })
        .catch((error) => {
          handleErrorResponse(error, reject);
        });
    });
  },
  put(endPoint, params, message) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .put(`${API_URL}${endPoint}`, params, {
          headers: localStorage.getItem("token")
            ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
            : null,
        })
        .then((response) => {
          handleSuccessResponse(response, resolve, message);
        })
        .catch((error) => {
          handleErrorResponse(error, reject);
        });
    });
  },
  delete(endPoint, mess) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .delete(`${API_URL}${endPoint}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          handleSuccessResponse(response, resolve, mess);
        })
        .catch((error) => {
          handleErrorResponse(error, reject);
        });
    });
  },
  getUrlImg(params) {
    return new Promise((resolve, reject) => {
      axios
        .post("https://api.cloudinary.com/v1_1/dj5xafymg/image/upload", params)
        .then((response) => {
          handleSuccessResponse(response, resolve);
        })
        .catch((error) => {
          handleErrorResponse(error, reject);
        });
    });
  },
};

export default service;
