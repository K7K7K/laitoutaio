import Axios from "./index";

//获取七牛token
export function getUploadToke() {
  return Axios.get("/upload/token");
}
//上传七牛
export function uploadQiniu(formData) {
  return Axios.post("https://upload-z1.qiniup.com", formData);
}
