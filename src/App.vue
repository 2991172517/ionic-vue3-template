<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { autoUpdate } from "./utils/update";


autoUpdate();

// 屏幕常亮
// (window as any).plugins.insomnia.keepAwake(
//   () => {
//     console.log("开启常亮成功");
//   },
//   () => {
//     console.log("开启屏幕常亮失败");
//   }
// );
</script>
