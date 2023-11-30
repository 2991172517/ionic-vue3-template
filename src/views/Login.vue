<template>
  <ion-page>
    <ion-content :fullscreen="true" color="bg-dark">
      <div class="main-container">
        <div class="title-container">
          <h1 style="font-weight: bolder">欢迎登录</h1>
          <h6>智能焊接</h6>
        </div>
        <div class="form-container">
          <ion-list ref="formRef">
            <ion-item prop="username" color="light-dark">
              <ion-label position="stacked">账号</ion-label>
              <ion-input
                placeholder="请输入账号"
                v-model="formData.username"
                maxlength="11"
              ></ion-input>
              <ion-note slot="error">{{ formRules.username.message }}</ion-note>
            </ion-item>
            <ion-item prop="nickname" color="light-dark">
              <ion-label position="stacked">密码</ion-label>
              <ion-input
                placeholder="请输入密码"
                v-model="formData.nickname"
                type="password"
              ></ion-input>
              <ion-note slot="error">{{ formRules.nickname.message }}</ion-note>
            </ion-item>
            <ion-button
              size="large"
              expand="block"
              shape="round"
              @click="validate"
              >登 录</ion-button
            >
          </ion-list>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { User } from "../utils/interface";

onMounted(async () => {
  //根据有没有存roleId来判读是否登录过
  // const roleId = (await Preferences.get({ key: "roleId" })).value;
  // const token = (await Preferences.get({ key: "token" })).value;
});

const router = useRouter();
const formData: User = reactive({
  username: "123",
  nickname: "456",
});
const formRules: any = reactive({
  username: {
    required: true,
    message: "请输入账号",
    // 可以传入验证格式
    // validator: (val: string) => {
    //   const reg = /^1[3456789]\d{9}$/;
    //   return reg.test(val);
    // },
  },
  nickname: { required: true, message: "不能为空" },
});

const formRef: any = ref(null);

async function validate() {
  console.log("formData", formData);

  const valid = Validate(formRef.value, formData, formRules);

  if (valid) {
    router.push({ name: "Home" });
  }

  // if (valid) {
  //   const { data }: any = await login(formData);
  //   if (data.code == 200) {
  //     await Preferences.set({
  //       key: "realName",
  //       value: data.data.account.realName,
  //     });
  //     await Preferences.set({
  //       key: "userId",
  //       value: data.data.account.id,
  //     });
  //     await Preferences.set({
  //       key: "roleId",
  //       value: data.data.account.roleId,
  //     });
  //     await Preferences.set({
  //       key: "token",
  //       value: data.data.token,
  //     });
  //   } else {
  //     toast("登录失败");
  //   }
  // }
}
</script>

<style lang="less" scoped>
ion-content {
  // --padding-start: 30px;
  // --padding-end: 30px;

  .bg-image {
    height: 100%;
  }
  .main-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 30px;

    background-image: url(/login_bg_pic.png);
    background-repeat: no-repeat;
    background-position: right top;
    background-size: 60% auto;

    .title-container {
      text-align: left !important;
      margin-bottom: 20px;
      margin-top: -10%;
    }
    .form-container {
      width: 100%;
    }

    ion-list {
      background: var(--ion-color-light-dark);
      padding: 20px;
      border-radius: 15px;
      width: 100%;
      ion-item {
        height: 100px;
      }
      ion-item::part(native) {
        border-color: rgb(116, 116, 116) !important;
      }
    }

    ion-label {
      font-size: 25px;
      font-weight: bold;
      margin-bottom: 5px;
    }
  }
}
</style>
