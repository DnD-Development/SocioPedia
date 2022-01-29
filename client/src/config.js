import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dnd-sociopedia.herokuapp.com/api/",
});

export default axiosInstance;
