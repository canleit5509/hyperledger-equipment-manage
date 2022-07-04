import axios from "axios";

const BASE_URL = process.env.VUE_APP_API_URL ||"http://localhost:8007";

const http = {
   get: async (url) => {
      return await axios.get(`${BASE_URL}/${url}`, {
         headers: localStorage.getItem("token") ?
            {Authorization: `Bearer ${localStorage.getItem("token")}`} : {},
      });
   },
   post: async (url, data) => {
      return await axios.post(`${BASE_URL}/${url}`, data, {
         headers: localStorage.getItem("token") ?
            {Authorization: `Bearer ${localStorage.getItem("token")}`} : {},
      });
   },
   put: async (url, data) => {
      return await axios.put(`${BASE_URL}/${url}`, data, {
         headers: localStorage.getItem("token") ?
            {Authorization: `Bearer ${localStorage.getItem("token")}`} : {},
      });
   },
   delete: async (url) => {
      return await axios.delete(`${BASE_URL}/${url}`, {
         headers: localStorage.getItem("token") ?
            {Authorization: `Bearer ${localStorage.getItem("token")}`} : {},
      });
   },
   uploadImage: async (data) => {
      return await axios.post("https://api.cloudinary.com/v1_1/dj5xafymg/image/upload", data);
   },

};

export default http;