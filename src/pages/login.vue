<template>
  <div style="margin-top:20%">
    <div class="mian">
      <van-image round width="10rem" height="10rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
    </div>
    <van-nav-bar title="登录" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="phone"
        name="phone"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>>
<script>
import { Toast, NavBar, Button, Form, Field } from "vant";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      phone: "",
      password: ""
    };
  },
  components: {
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [Form.name]: Form,
    [Field.name]: Field
  },
  methods: {
    ...mapActions(["setUserInfoActions"]),
    async onSubmit(values) {
      const res = await this.$http.get("/login/cellphone", {
        params: { phone: values.phone, password: values.password }
      });

      if (res.data.code == 200) {
        Toast("登录成功");
        this.setUserInfoActions(res.data.profile);
        localStorage.setItem("userinfo", JSON.stringify(res.data.profile));
        this.$router.push("/");
      } else {
        Toast("登录错误");
      }
    }
  },
  computed: {
    ...mapState(["userinfo"])
  }
};
</script>
<style scoped>
.mian {
  margin-top: 20%;
  height: 15rem;
  width: 70%;
  margin: 0 auto;
  text-align: center;
}
</style>