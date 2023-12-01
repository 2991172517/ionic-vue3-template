<template>
  <!-- <ion-page> -->
    <ion-content color="bg-dark">
      <div class="main-container">
        <div class="list-container">
          <ion-button @click="scanDevice()">扫描蓝牙</ion-button>
          <ion-card
            color="light-dark"
            button
            v-for="item in deviceList.data"
            :key="item.id"
          >
            <ion-radio-group :value="selectDevice" @ionChange="radioChange">
              <ion-item color="light-dark">
                <ion-label>{{ item.id }}</ion-label>
                <ion-radio slot="end" :value="item.id"></ion-radio>
              </ion-item>
            </ion-radio-group>
          </ion-card>
        </div>
        <div class="buttons-container">
          <ion-button
            class="middle-btn"
            shape="round"
            @click="connectDevice"
            :disabled="!selectDevice"
            >确定</ion-button
          >
          <ion-button
            class="middle-btn"
            fill="outline"
            shape="round"
            @click="cancel"
            >取消</ion-button
          >
        </div>
        <ion-loading
          :is-open="connectLoading"
          cssClass="my-custom-class"
          message="正在连接"
        >
        </ion-loading>
      </div>
    </ion-content>
  <!-- </ion-page> -->
</template>
<script lang="ts" setup>
import { Device } from "@/utils/interface";
// import instanceDevice from "@/plugins/ble/instanceDevice";

const router = useRouter();
const deviceList: { data: Array<Device> } = reactive({ data: [] });
const selectDevice = ref("");

onMounted(() => {
  // scanDevice();
});

// onIonViewWillEnter(() => {
//   deviceList.data = [];
//   scanDevice();
// });

async function scanDevice() {
  deviceList.data = [];

  await instanceDevice.open();
  console.log("开始扫描123");

  instanceDevice.scan((device: Device) => {
    if (device.id) {
      deviceList.data.push(device);
    }
  });
}

const connectLoading = ref(false);
async function connectDevice() {
  connectLoading.value = true;
  try {
    // await instanceDevice.stopScan();
    await instanceDevice.connect(selectDevice.value);
    connectLoading.value = false;
  } catch (e) {
    toast("连接失败");
    console.log(e);
    connectLoading.value = false;
  }
}

function radioChange(val: any) {
  selectDevice.value = val.detail.value;
}

async function cancel() {
  try {
    // await instanceDevice.stopScan();
    await instanceDevice.disConnect();
  } catch (e) {
    console.log(e);
  } finally {
    router.back();
  }
}

onIonViewWillLeave(() => {
  // 从此页离开关闭扫描,但直接点退出登录不生效？
  instanceDevice.stopScan();
});
</script>

<style lang="less" scoped>
ion-label {
  padding: 20px 0;
}

.main-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px 30px 10px;
  .list-container {
    width: 100%;
    height: calc(100% - 150px);
    overflow: auto;
  }
  .buttons-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    ion-button {
      --border-width: 0.5px;
    }
  }
}
</style>
