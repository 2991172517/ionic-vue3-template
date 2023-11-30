export interface User {
  username: string;
  nickname: string;
}

export interface Task {
  userId: string;
  token: string;
  status: number;
}

export interface Hjcard {
  hjCard: string;
  token: string;
}

export interface AlertData {
  header?: string;
  subHeader?: string;
  message?: string;
}

export interface ResponseData {
  code: number;
  data?: any;
  msg?: string;
}

export interface MqttPlugin {
  send(data: {
    vol: number;
    cur: number;
    temp: string;
    account: string;
    task: string;
    device: string;
    tim: number;
    minVol?: number;
    maxVol?: number;
    minCur?: number;
    maxCur?: number;
  }): Promise<ResponseData>;
}

export interface Device {
  id: string;
  name: string;
  [key: string]: any;
}

export interface AppInfomation {
  currentPlatform: string;
  currentVersion: string;
  serverVersion: string;
  serverAndroidAppUpdateUrl: string;
  apkName: string;
}
