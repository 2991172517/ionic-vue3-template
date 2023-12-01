import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  plugins: [
    vue(),
    legacy(),
    //autoImport未生效可能是tsconfig里的inlcude没包含'./auto-imports.d.ts'
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: [
        "vue", //// 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        "vue-router", //自动导入router相关函数
        {
          "@ionic/vue": [
            //自动导入ionic/vue相关
            "onIonViewWillEnter",
            "onIonViewWillLeave",
            "IonApp",
            "IonRouterOutlet",
            "toastController",
            "alertController",
          ],
          "@capacitor/preferences": ["Preferences"],
        },

        //自动导入type,未决定是否必要使用这个功能
        {
          from: "vue-router",
          imports: ["RouteLocationRaw"],
          type: true,
        },
      ],
      dts: "./auto-imports.d.ts", //生成自动导入的ts声明文件
      dirs: ["src/utils", "src/plugins/ble","src/plugins/camera", "src/request"],
    }),
    Components({
      dirs: ["src/components"],
      extensions: ["vue"],
    }),
    topLevelAwait({
      promiseExportName: "__tla",
      promiseImportName: (i) => `__tla_${i}`,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
});
