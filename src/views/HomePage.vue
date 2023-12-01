<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-button @click="takePhoto('code1')">拍照</ion-button>
      <div style="height: 300px; width: 100%">
        <img :src="imgUrl" alt="" />
      </div>
      <DeviceList></DeviceList>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { usePhotoGallery } from "../plugins/camera/useCamera";
const { takePhoto, photos } = usePhotoGallery();

const imgUrl = ref("");

watch(
  () => photos.value,
  () => {
    console.log("图片", photos.value[0].dataUrl);
    imgUrl.value = photos.value[0].dataUrl;
  },
  { deep: true }
);
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
