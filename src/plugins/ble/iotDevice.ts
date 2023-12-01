/* eslint-disable @typescript-eslint/ban-types */
import * as ble from "cordova-plugin-ble-central/www/ble";

export default class IotDevice {
  private device_id?: string;
  private service_notify?: string;
  private service_write?: string;
  private characteristic_notify?: string;
  private characteristic_write?: string;
  hasConnected: boolean = false;

  constructor() {}

  open() {
    return new Promise((resolve, reject) => {
      ble.enable(
        () => resolve("开启iot设备成功"),
        () => reject("开启iot设备失败")
      );
    });
  }

  scan(findDeviceCallBack: Function) {
    ble.startScan([], (device) => {
      console.log(this.hasConnected + "扫描到设备", device);
      findDeviceCallBack(device);
    });
  }

  stopScan() {
    return new Promise((resolve, reject) => {
      ble.stopScan(
        () => {
          console.log("停止扫描");

          resolve("停止扫描成功");
        },
        () => {
          reject("停止扫描失败");
        }
      );
    });
  }

  connect(device_id: string) {
    this.device_id = device_id;
    return new Promise((resolve, reject) => {
      ble.connect(
        this.device_id,
        (res) => {
          this.service_notify = res.characteristics[7].service;
          this.characteristic_notify = res.characteristics[7].characteristic;
          this.service_write = res.characteristics[6].service;
          this.characteristic_write = res.characteristics[6].characteristic;
          this.hasConnected = true;
          console.log("连接设备成功", res);
          resolve(res);
        },
        (e) => {
          console.log("连接设备失败");
          reject(e);
        }
      );
    });
  }

  private isConnected() {
    return new Promise((resolve, reject) => {
      ble.isConnected(
        this.device_id,
        (res) => {
          // this.hasConnected = false;
          console.log("判断是否连接结果：已连接，返回信息:" + res);
          resolve(res);
        },
        (e) => reject(e)
      );
    });
  }

  disConnect() {
    return new Promise((resolve, reject) => {
      ble.disconnect(
        this.device_id,
        (res) => {
          console.log("断开设备成功");
          this.hasConnected = false;
          resolve(res);
        },
        (e) => {
          console.log("断开设备失败");
          reject(e);
        }
      );
    });
  }

  notify(notifyCallBack: Function) {
    ble.startNotification(
      this.device_id,
      this.service_notify,
      this.characteristic_notify,
      (buffer) => {
        notifyCallBack(buffer);
      }
    );
  }

  stopNotify() {
    return new Promise((resolve, reject) => {
      ble.stopNotification(
        this.device_id,
        this.service_notify,
        this.characteristic_notify,
        (res) => {
          console.log("停止订阅成功");
          resolve(res);
        },
        (e) => {
          console.log("停止订阅失败");
          reject(e);
        }
      );
    });
  }

  @debounce(300)
  write(msg: string) {
    return new Promise((resolve, reject) => {
      ble.write(
        this.device_id,
        this.service_write,
        this.characteristic_write,
        this.stringToArrayBuffer(msg),
        (res) => {
          console.log("写入设备成功");
          resolve(res);
        },
        (e) => {
          console.log("写入设备失败");
          reject(e);
        }
      );
    });
  }
  protected stringToArrayBuffer(str: string) {
    const ret = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
      ret[i] = str.charCodeAt(i);
    }
    return ret.buffer;
  }
}
