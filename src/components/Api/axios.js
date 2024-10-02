import axios from "axios"
const axiosInstance = axios.create({
    //local instance of using firebase functions
    // baseURL: "http://127.0.0.1:5001/clone-43126/us-central1/api", 
    // //deploy version of amazon server on Render.com
    baseURL: "https://amazon-api-deploy-nksc.onrender.com",
  });

  export {axiosInstance}