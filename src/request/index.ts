import { CapacitorHttp } from "@capacitor/core";
import router from "../router/index";

const url = import.meta.env.BASE_URL;

const headers = {
  "Content-Type": "application/json",
  Authorization: (await Preferences.get({ key: "token" })).value!,
};


//封装一个get请求
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function get(data: any) {
  const response: any = await CapacitorHttp.get(data);
  if (response.data.code == 511) {
    router.replace({ name: "Login" });
    toast("登录已过期,请重新登录", "danger");
    await Preferences.clear();
  }
  return response;
}

export const login = async (params: any) => {
  const options = {
    url: url + "/login",
    headers,
    data: { username: params.username, password: params.nickname },
  };
  const response: any = await CapacitorHttp.post(options);
  headers.Authorization = response.data.data.token;

  return response;
};
