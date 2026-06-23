import axios from "axios";

const useAxios = () => {
  return axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });
};

export default useAxios;
