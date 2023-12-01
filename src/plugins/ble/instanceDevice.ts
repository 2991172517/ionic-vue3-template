/* eslint-disable @typescript-eslint/ban-types */
import IotDevice from "./iotDevice";
class instanceDevice extends IotDevice {
  taskData: string = "";
  private startFlag: boolean = false;
  private endFlag: boolean = false;
  private setHistory = { cmd: "setMode", mode: "History" };
  static instance: any = null;

  startRealTimeNotify(SuccessNotifyCallBack: Function) {
    this.notify((buffer) => {
      try {
        const data = JSON.parse(
          String.fromCharCode.apply(null, new Uint8Array(buffer) as any)
        );
        SuccessNotifyCallBack(data);
      } catch (e) {
        console.log(e);
      }
    });
  }

  async startHistoryNotify(SuccessNotifyCallBack: Function) {
    await this.write(JSON.stringify(this.setHistory));
    this.notify((buffer) => {
      try {
        const data: string = String.fromCharCode.apply(
          null,
          new Uint8Array(buffer) as any
        );

        let res = "";
        if (data.includes("NOFILE")) {
          this.startFlag = false;
          this.endFlag = true;
          res = "NOFILE";
        }
        if (data.includes("END")) {
          this.startFlag = false;
          this.endFlag = true;
          res = "END";
        }

        if (this.endFlag) {
          this.startFlag = false;
          this.endFlag = false;
        }
        if (data.includes("START")) {
          this.startFlag = true;
          res = "START";
        }
        SuccessNotifyCallBack(res);
      } catch (e) {
        console.log(e);
      }
    });
  }

  static getInstance() {
    if (!instanceDevice.instance) {
      instanceDevice.instance = new instanceDevice();
    }
    return instanceDevice.instance;
  }
}

export default instanceDevice.getInstance();
