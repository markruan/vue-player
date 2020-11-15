<template>
  <div>
    <div v-if="islogin" style="margin-top:5%">
      <div class="mian">
        <van-image round width="6rem" height="6rem" :src="user_info.avatarUrl" />
      </div>

      <h3 style="text-align: center;" v-text="user_info.nickname||'未登录'"></h3>
      <h5 style="text-align: center;" v-text="user_info.signature"></h5>
      <van-grid clickable :column-num="3" :border="false">
        <van-grid-item text="动态" to="/">
          <template #icon>
            <span>{{user_info.eventCount}}</span>
          </template>
        </van-grid-item>
        <van-grid-item text="关注" to="/">
          <template #icon>
            <span>{{user_info.followeds}}</span>
          </template>
        </van-grid-item>
        <van-grid-item text="粉丝" to="/">
          <template #icon>
            <span>{{user_info.follows}}</span>
          </template>
        </van-grid-item>
      </van-grid>

      <van-cell-group>
        <van-cell title="本地音乐" is-link icon="music-o" />
        <van-cell title="我的收藏" is-link icon="star-o" value="内容" />
      </van-cell-group>
      <van-collapse v-model="activeName" accordion>
        <van-collapse-item icon="user-o" title="我创建的歌单" :value="myList.length" name="1">
          <List :hotList="myList" />
        </van-collapse-item>
        <van-collapse-item icon="like-o" title="我收藏的歌单" :value="myClectd.length" name="2">
          <List :hotList="myClectd" />
        </van-collapse-item>
      </van-collapse>

      <div style="margin: 16px;">
        <van-button round block type="warning" @click="loginOut" style="margin-top:40px">注销</van-button>
      </div>
    </div>
    <van-empty v-else description="未登录">
      <van-button @click="goLogin" round type="primary" class="bottom-button">登录</van-button>
    </van-empty>
  </div>
</template>>
<script>
import {
  Toast,
  Empty,
  Button,
  
  Collapse,
  CollapseItem
} from "vant";
import { mapState, mapActions } from "vuex";
import List from "../components/List";
export default {
  data() {
    return {
      islogin: false,
      activeName: "",
      myList: [],
      myClectd: [],
      loading: true,
      finished: false,
      user_info: {}
    };
  },
  components: {
    List,
    [Empty.name]: Empty,
     [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Button.name]: Button
  },
  watch: {
    userinfo(val) {
      if (val) {
        this.getUserInfo();
        this.getMyList();
      }
    }
  },
  created() {
    this.getUserInfo();
    if (this.islogin) {
      this.getMyList();
    }
  },
  computed: {
    ...mapState(["userinfo"])
  },
  methods: {
    getUserInfo() {
      if (localStorage.getItem("userinfo")) {
        this.user_info = JSON.parse(localStorage.getItem("userinfo"));
        this.islogin = true;
      } else {
        this.islogin = false;
      }
    },
    async getMyList() {
      const res = await this.$http.get("/user/playlist", {
        params: { uid: this.user_info.userId }
      });
      if (res.data.code == 200) {
        const List = res.data.playlist;
        List.forEach(item => {
          if (
            item.creator.userId ==
            JSON.parse(localStorage.getItem("userinfo")).userId
          ) {
            this.myList.push(item);
          } else {
            this.myClectd.push(item);
          }
        });
      } else {
        Toast("登录错误");
      }
    },
    goLogin() {
      this.$router.push("/login");
    },
    loginOut() {
      localStorage.removeItem("userinfo");
      this.getUserInfo();
    }
  }
};
</script>
<style scoped>
.mian {
  margin-top: 2%;
  width: 70%;
  margin: 0 auto;
  text-align: center;
}
.bottom-button {
  width: 160px;
  height: 40px;
}
</style>