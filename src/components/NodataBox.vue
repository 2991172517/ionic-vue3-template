
<template>
  <div class="container">
    <ion-icon :icon="fileTrayStackedOutline"></ion-icon>
    <ion-label>
      <slot> </slot>
    </ion-label>
  </div>
</template>
<script lang="ts" setup>
import { fileTrayStackedOutline } from "ionicons/icons";
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  border-radius: 3%;
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
ion-label {
  padding: 12px;
  font-size: 18px;
  color: rgb(165, 165, 165);
}
ion-icon {
  font-size: 60px;
  color: rgb(165, 165, 165);
}
</style>
