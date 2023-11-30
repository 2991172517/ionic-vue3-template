import { ToastOptions, AlertButton, toastController, alertController } from "@ionic/vue";
import { AlertData } from "./interface";

export async function toast(
  msg: string,
  color?: string,
  position?: ToastOptions["position"],
  buttons?: Array<object>
) {
  const toast = await toastController.create({
    message: msg,
    duration: buttons?.length ? 4000 : 1500,
    position: position || "top",
    color: color || "danger",
    buttons: buttons,
  });
  await toast.present();
}

export async function ionAlert(
  data: AlertData,
  success: AlertButton["handler"],
  cancel: AlertButton["handler"]
) {
  const alert = await alertController.create({
    header: data.header,
    subHeader: data.subHeader,
    message: data.message,
    buttons: [
      {
        text: "取消",
        role: "cancel",
        handler: cancel,
      },
      {
        text: "确定",
        role: "confirm",
        handler: success,
      },
    ],
  });

  await alert.present();
}

export function debounce(delay: number) {
  return function (targets: any, key: any, descriptor: any) {
    const oldValue = descriptor.value;
    let timer: any = null;
    descriptor.value = function (...args: any) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        oldValue.apply(this, args);
      }, delay);
    };
  };
}

export function stringToArrayBuffer(str: string) {
  const ret = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    ret[i] = str.charCodeAt(i);
  }
  return ret.buffer;
}


