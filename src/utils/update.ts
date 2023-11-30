import { Device } from "@capacitor/device";
import { App } from "@capacitor/app";
import { FileTransferObject } from "@awesome-cordova-plugins/file-transfer";
import { AndroidPermissions } from "@awesome-cordova-plugins/android-permissions";
import { CapacitorHttp } from "@capacitor/core";
import { AppInfomation } from "@/utils/interface";

const appInfomation: AppInfomation = {
  currentPlatform: "", // 当前平台
  currentVersion: "", // 当前app版本
  serverVersion: "", // 服务器最新app版本 - Android
  serverAndroidAppUpdateUrl: "", // 服务器最新app下载地址 - Android
  apkName: "app", // 服务器android安装包的名字
};

let deviceId = "";
const serverUrl = import.meta.env.VITE_APP_UPDATE_URL;

export const update = async () => {
  await getDeviceInfo();
  await getCurrentAppInfo();
  await getServerInfo(serverUrl);
  updateApp(appInfomation);
};

export const autoUpdate = async () => {
  await getDeviceInfo();
  await getCurrentAppInfo();
  await getServerInfo(serverUrl);

  console.log(appInfomation.currentVersion, appInfomation.serverVersion);

  let ifUpdate = false;
  ifUpdate = appInfomation.currentVersion !== appInfomation.serverVersion;

  // 如果需要进行更新
  if (ifUpdate && appInfomation.serverAndroidAppUpdateUrl) {
    if (appInfomation.currentPlatform === "android") {
      // 触发 Anroid 平台的提示
      presentAlert(appInfomation);
    }
  }
};

async function getDeviceInfo() {
  const info = await Device.getInfo();
  const { uuid } = await Device.getId();
  deviceId = uuid;
  appInfomation.currentPlatform = info.platform;
}

async function getCurrentAppInfo() {
  const appInfo: any = await App.getInfo();

  appInfomation.currentVersion = appInfo.version;
}

async function getServerInfo(serverUrl: string) {
  const { data } = await CapacitorHttp.get({
    url: serverUrl,
    params: { id: deviceId, version: appInfomation.currentVersion },
  });
  if (data.code == 0) {
    appInfomation.serverVersion = data.data.version;
    appInfomation.serverAndroidAppUpdateUrl = data.data.url;
  } else {
    toast("code:" + data.code + ",msg:" + data.msg);
  }
}

function updateApp(appInfomation: AppInfomation) {
  // 根据版本号是否更新
  let ifUpdate = false;
  ifUpdate = appInfomation.currentVersion !== appInfomation.serverVersion;

  // 如果需要进行更新
  if (ifUpdate && appInfomation.serverAndroidAppUpdateUrl) {
    if (appInfomation.currentPlatform === "android") {
      // 触发 Anroid 平台的提示
      presentAlert(appInfomation);
    }
  } else {
    toast("已是最新版本", "success");
  }
}

async function presentAlert(appInfomation: AppInfomation) {
  const alert = await alertController.create({
    header: "发现新版本, 是否更新?",
    cssClass: "update-pop",
    message:
      '<div class="versions">当前版本号：' +
      appInfomation.currentVersion +
      '</div><div class="versions">待更新版本号：' +
      appInfomation.serverVersion +
      "</div>",

    buttons: [
      {
        text: "取消",
        handler: () => {
          console.log("用户暂不更新应用");
        },
      },
      {
        text: "立即更新",
        handler: async () => {
          //写法错误
          // const res1 = await AndroidPermissions.requestPermissions([
          //   "READ_EXTERNAL_STORAGE",
          //   "WRITE_EXTERNAL_STORAGE",
          // ]);

          await AndroidPermissions.requestPermissions([
            AndroidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
            AndroidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
          ]);
          const writeExternalStorage = await AndroidPermissions.checkPermission(
            AndroidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
          );

          const readExternalStorage = await AndroidPermissions.checkPermission(
            AndroidPermissions.PERMISSION.READ_EXTERNAL_STORAGE
          );

          if (
            writeExternalStorage.hasPermission &&
            readExternalStorage.hasPermission &&
            appInfomation.currentPlatform === "android" &&
            appInfomation.apkName
          ) {
            // 下载app
            const path =
              (window as any).cordova.file.externalRootDirectory +
              "Download/" +
              appInfomation.apkName +
              new Date().getTime() +
              ".apk";

            fileDownload(
              appInfomation.serverAndroidAppUpdateUrl,
              path,
              "application/vnd.android.package-archive"
            );
          } else {
            console.log("准备执行 ios/web 下载");
          }
        },
      },
    ],
  });
  alert.present();
}

//下载文件
function fileDownload(url: any, filePath: string, mimeType: string): any {
  const fileTransfer = new FileTransferObject();

  //打开进度条
  createProgressPop();
  //进度计算
  calProgress(fileTransfer);

  fileTransfer
    .download(url, filePath, true, {})
    .then((e) => {
      closeProgressPop();
      //下载成功后打开文件
      fileOpen(filePath, mimeType);
    })
    .catch((e) => {
      closeProgressPop();
      console.log("下载失败" + JSON.stringify(e));
    });
}

function fileOpen(filePath: string, mimeType: string) {
  (window as any).cordova.plugins.fileOpener2
    .open(filePath, mimeType)
    .then(() => {
      console.log("文件打开成功！");
    })
    .catch(() => {
      alert("文件打开失败，请重试!");
    });
}

/**
 * 计算文件下载进度
 */
function calProgress(fileTransfer: any) {
  // 下载进度
  let progressValue = 0;
  // 计算下载进度，不可以用回调，会失去效果
  fileTransfer.onProgress((progressEvent: any) => {
    if (progressEvent.lengthComputable) {
      progressValue = progressEvent.loaded / progressEvent.total;
      console.log("应该是小数", progressValue);
    } else {
      progressValue++;
    }
    // 将 0.01321... 这种下载进度转换为整数
    const showNumber = Math.floor(progressValue * 100);

    // 填充已下载文字提示信息
    document.getElementsByClassName(
      "downed"
    )[0].innerHTML = `已完成：${showNumber}%`;
    // 填充进度条外框样式 - style会失效，因此在此处修改
    document.getElementsByClassName("progress")[0]["style"].width = "100%";
    document.getElementsByClassName("progress")[0]["style"].height = "4px";
    document.getElementsByClassName("progress")[0]["style"].background = "#eee";
    // 填充进度条进度样式 - style会失效，因此在此处修改
    document.getElementsByClassName("blue")[0]["style"].display = "block";
    document.getElementsByClassName("blue")[0][
      "style"
    ].width = `${showNumber}%`;
    document.getElementsByClassName("blue")[0]["style"].height = "100%";
    document.getElementsByClassName("blue")[0]["style"].background = "#1890ff";
  });
}

// 下载进度框
let alertPop: any;
/**
 * 初始化下载进度框
 */
async function createProgressPop() {
  alertPop = await alertController.create({
    message:
      '<p class="title">正在下载，请稍等...</p><div class="progress"><span class="blue"></span></div><p class="downed">已完成：0%</p>',
    backdropDismiss: false,
  });
  await alertPop.present();
}

/**
 * 关闭下载进度框
 */
async function closeProgressPop() {
  if (alertPop) {
    await alertPop.dismiss();
    alertPop = null;
  }
}

// 下面是远程下载文件到设备
// export const downLoadData = async (deviceId, searchDate) => {
//   const fileName = await getExportDownloadUrl(deviceId, searchDate);
//   await downLoadCVData(fileName);
// };

// function downLoadCVData(fileName: any) {
//   const fileTransfer = new FileTransferObject();
//   const url = "http://81.68.136.170:8008/sys/files?path=" + fileName;
//   const filePath =
//     (window as any).cordova.file.externalRootDirectory + "Download/" + fileName;
//   const mimeType =
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

//   // //打开进度条
//   // createProgressPop();
//   // //进度计算
//   // calProgress(fileTransfer);

//   fileTransfer
//     .download(url, filePath, true, {})
//     .then((e) => {
//       // closeProgressPop();
//       //下载成功后询问打开文件
//       toast("下载成功,文件存储在：" + filePath, "success", undefined, [
//         {
//           text: "打开",
//           role: "cancel",
//           handler: () => {
//             fileOpen(filePath, mimeType);
//           },
//         },
//       ]);
//     })
//     .catch((e) => {
//       console.log(e.code, "下载失败" + JSON.stringify(e));
//       if (e.code == 1) {
//         toast("下载成功,文件存储在：" + filePath, "success", undefined, [
//           {
//             text: "打开",
//             role: "cancel",
//             handler: () => {
//               fileOpen(filePath, mimeType);
//             },
//           },
//         ]);
//       }
//     });
// }

// async function getExportDownloadUrl(deviceId: string, searchDate: string) {
//   const { data } = await exportDateData({ id: deviceId, date: searchDate });
//   if (data.code == 200) {
//     return data.data;
//   } else {
//     return null;
//   }
// }
