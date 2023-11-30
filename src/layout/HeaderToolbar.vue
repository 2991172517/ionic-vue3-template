<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="bg-dark">
        <ion-buttons slot="start">
          <!-- <ion-button
            v-if="currentName == 'AdminDevice' || currentName == 'AdminTask'"
            @click="changeMode"
          >
            <ion-icon slot="icon-only" :icon="swapHorizontalOutline"></ion-icon>
          </ion-button> -->
          <ion-button @click="back">
            <ion-icon slot="icon-only" :icon="arrowBack"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="showPopover($event)">
            <ion-icon slot="icon-only" :icon="person"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-progress-bar
          type="indeterminate"
          color="medium"
          v-if="showProcess"
        ></ion-progress-bar>
      </ion-toolbar>
    </ion-header>
    <ion-popover
      :is-open="popoverShow"
      @didDismiss="popoverShow = false"
      :event="event.e"
      size="auto"
      :dismiss-on-select="true"
      color="light-dark"
    >
      <ion-content class="list-container" color="light-dark">
        <ion-list lines="none">
          <ion-item :button="true" color="light-dark" @click="checkUpdate"
            >检查更新</ion-item
          >
          <ion-item :button="true" color="light-dark" @click="showLogoutAlert"
            >退出登录</ion-item
          >
        </ion-list>
      </ion-content>
    </ion-popover>
    <ion-content>
      <div class="ion-padding">
        <ion-router-outlet></ion-router-outlet>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { person, arrowBack, swapHorizontalOutline } from "ionicons/icons";

const router = useRouter();
const title = ref("");
const showProcess = ref(false);
const currentName = ref();

watch(
  () => router.currentRoute.value.path,
  () => {
    const meta: any = router.currentRoute.value.meta;
    title.value = meta.title;
    showProcess.value = meta.showProcess ? true : false;
    currentName.value = router.currentRoute.value.name;
  },
  { deep: true, immediate: true }
);

const popoverShow = ref(false);
const event: { e: null | Event } = reactive({ e: null });
function showPopover(e: Event) {
  event.e = e;
  popoverShow.value = true;
}

async function back() {
  router.back();
}

async function showLogoutAlert() {
  const realName = (await Preferences.get({ key: "realName" })).value;
  ionAlert(
    { header: "是否退出?", subHeader: "当前用户：" + realName },
    () => {
      logout();
    },
    () => {}
  );
}
async function logout() {
  //这里可以进行断开蓝牙等操作
  //
  //

  if (instanceDevice.hasConnect) {
    console.log(1);
  }
  router.replace({ name: "Login" });
  await Preferences.clear();
}
function checkUpdate() {
  update();
}
</script>

<style scoped>
ion-title {
  text-align: center;
}
.list-md {
  background: var(--ion-color-light-dark);
  border: none;
}
ion-popover {
  --width: auto;
}
</style>
