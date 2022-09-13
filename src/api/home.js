import Axios from "./index";

// import Axios from "";
//分类列表
export function getCateList(params) {
  return Axios.post("/api/get_cate_list", params);
}
//文章列表
export function GetArtList(params) {
  return Axios.post("/api/get_article_list", params);
}
//手机号修改密码 忘记密码
export function UserForget(params) {
  return Axios.post("/user/forget", params);
}

//搜索
export function Search(params) {
  return Axios.get("/api/search", { params });
}
//获取用户信息
export function getUserInfo(params) {
  return Axios.get("/user/getuserInfo", { params });
}
//收藏列表

export function getFavList(params) {
  return Axios.get("/api/get_fav_list", { params });
}
//我的发布

export function getUserArtList(params) {
  return Axios.get("/api/get_user_article_list", { params });
}
//浏览历史

export function getHistoryList(params) {
  return Axios.get("/api/get_history_list", { params });
}
//评论列表
export function getcommentList(params) {
  return Axios.post("/api/get_comment_list", params);
}
