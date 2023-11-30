import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "templateApp",
  webDir: "dist",
  server: {
    // androidScheme: 'https',
    //url填写本地运行的地址可以热重载调试代码
    url: "http://192.168.8.156:8100/",
    cleartext: true,
  },
};

export default config;
