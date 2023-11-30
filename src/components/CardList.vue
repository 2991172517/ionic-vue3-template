<template>
  <ion-list style="background: var(--ion-color-bg-dark)">
    <NodataBox v-if="noData"> 暂无数据 </NodataBox>
    <div class="cards-container" v-else>
      <ion-card
        color="light-dark"
        v-for="(item, index) in props.listData"
        :key="index"
        button
        @click="emit('cardClick', item)"
      >
        <slot :item="item" :index="index"></slot>
      </ion-card>
    </div>
  </ion-list>
</template>

<script setup lang="ts">
const props = defineProps({
  listData: { type: Array<any>, required: true },
});

const noData = ref(false);
watch(
  () => props.listData,
  () => {
    if (props.listData.length == 0) {
      noData.value = true;
    } else {
      noData.value = false;
    }
  }
);
const emit = defineEmits(["cardClick"]);
</script>

<style lang="less" scoped>
ion-list {
  height: 100%;
  overflow: auto;
}

:deep(ion-item) {
  font-size: 12px;
  --min-height: 30px;
  span {
    color: aqua;
  }
}
:deep(ion-label) {
  margin: 0px;
  padding: 0px;
}
</style>
