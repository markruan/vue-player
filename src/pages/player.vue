 
<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <div>
      <van-swipe class="my-swipe myswipe" indicator-color="red" v-if="songImg">
        <van-swipe-item>
          <div class="v-image">
            <div class="border">
              <van-image
                :src="songImg+'?param=300y300'"
                round
                :class="{'Rotation':playing}"
                style="width:100%"
              ></van-image>
            </div>
            <div class="title">{{songName+'-'+songArtist}}</div>
          </div>
        </van-swipe-item>

        <van-swipe-item v-if="lyricShow" class="v-lyric">
          <LyricScroll
            :lyric="lyric"
            lyricLineheight="1.2rem"
            :current-time="currentTime"
            :lyricActiveClass="active"
          />
        </van-swipe-item>
      </van-swipe>
      <div class="audio-player">
        <div class="audio__btn-wrap">
          <div class="audio__play--previous">
            <van-icon name="arrow-left" />
          </div>

          <div @click="playerPause()" v-if="playing" class="audio__play--pause">
            <van-icon name="pause-circle-o" />
          </div>
          <div v-else @click="playerPause()" class="audio__play--start">
            <van-icon name="play-circle-o" />
          </div>

          <div class="audio__play--next">
            <van-icon name="arrow" />
          </div>
        </div>

        <div class="audio__progress-wrap" ref="audioProgressWrap">
          <div class="audio__progress" ref="audioProgress" :style="'width:'+sliderTime+'%'" />
          <div
            class="audio__progress-point"
            ref="audioProgressPoint"
            :style="'left:'+sliderTime+'%'"
          />
        </div>

        <div class="audio__time-wrap">
          <div class="audio__current-time" v-text="currentTimeAfterFormat">0：00</div>
          <div
            class="audio__duration"
            v-text="formatTime(duration)=='NaN'?'3:51':formatTime(duration)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import LyricScroll from "vue-lyric-scroll";

export default {
  name: "app",
  data() {
    return {
      isfull: false,
      audioSources: {},
      audioList: [],
      timeupdate: {},
      xuzhuan: "Rotation",
      lyric: {},
      active: "lyric-active",
      lyricShow: false,
      currentTimeAfterFormat: "", // 音频播放当时时间（格式化后）
      sliderTime: 0
    };
  },
  components: {
    LyricScroll
  },
  created() {
    this.init();
    this.setShowAplayerActions(false);
  },
  watch: {
    currentTime: function(val) {
      if (val) {
        this.lyricShow = true;
      }
      this.currentTimeAfterFormat = this.formatTime(val);
      this.sliderTime = parseInt((val / this.duration) * 100);
    }
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  methods: {
    ...mapActions([
      "setSongIdActions",
      "setShowAplayerActions",
      "setPlayingActions"
    ]),
    async init() {
      this.setSongIdActions(this.$route.params.id);
      await this.getlyric();
    },
    // 格式化秒为分
    formatTime(second) {
      return [parseInt((second / 60) % 60), parseInt(second % 60)]
        .join(":")
        .replace(/\b(\d)\b/g, "0$1");
    },
    playerPause() {
      this.setPlayingActions(!this.playing);
    },
    timeStrToNum(str) {
      const minute = Number(str.slice(0, 2));
      const second = Number(str.slice(3, 5));
      const minSec = Number(str.slice(6, 8));
      return minute * 60 + second + minSec / 100;
    },
    // 将歌词字符串转换为对象，格式为{开始时间: 歌词, ...}
    lyricToObj(lyricStr) {
      const obj = {};
      let perLyric;
      let time;
      lyricStr.split("\n").forEach((item, idx) => {
        perLyric = item.slice(item.indexOf("]") + 1);
        if (perLyric) {
          time = this.timeStrToNum(item.slice(1, 9));
          obj[time] = perLyric;
        }
      });
      return obj;
    },
    onClickLeft() {
      this.$router.go(-1); //返回上一层
      this.setShowAplayerActions(true);
    },
    async getlyric() {
      const self = this;
      await this.$http
        .get(this.host + "/lyric", { params: { id: this.$route.params.id } })
        .then(response => {
          if (response.data.lrc.lyric) {
            this.lyric = self.lyricToObj(response.data.lrc.lyric);
          }
        })
        .catch(error => {
          console.log("接口或处理逻辑出错");
        });
    }
  },
  mounted() {},
  computed: {
    ...mapState([
      "songArtist",
      "songId",
      "songImg",
      "songName",
      "songUrl",
      "playing",
      "currentTime",
      "duration"
    ])
  }
};
</script>
 <style scoped >
.lyric-view[data-v-47b84102] {
  padding-top: 30px;
}
.v-lyric {
  text-align: center !important;
}
.lyric-active {
  color: red !important;
  font-size: 20px !important;
}
.v-image {
  position: absolute;
  left: 15%;
  top: 15%;
  width: 70%;
  box-sizing: border-box;
}
.border {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}

.Rotation {
  -webkit-transform: rotate(360deg);
  animation: rotation 8s linear infinite;
  -moz-animation: rotation 8s linear infinite;
  -webkit-animation: rotation 8s linear infinite;
  -o-animation: rotation 8s linear infinite;
}
.title {
  padding-top: 12px;
  text-align: center;
}
.myswipe {
  height: 25rem;
}
.audio-player {
  margin: 0 15px;
  position: fixed;
  width: 90%;
  bottom: 0;
}
.audio-player {
  margin: 0 15px;
}

.audio-player .audio__btn-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.audio-player .audio__btn-wrap .audio__play__icon {
  width: 100%;
  height: 100%;
  fill: currentColor;
  overflow: hidden;
  color: #e35924;
}

.audio-player .audio__btn-wrap .audio__play--previous {
  font-size: 33px;
  width: 21px;
  height: 33px;
}

.audio-player .audio__btn-wrap .audio__play--previous.disable {
  opacity: 0.5;
}

.audio-player .audio__btn-wrap .audio__play--start {
  font-size: 42px;
  width: 42px;
  height: 42px;
  margin: 0 30px 0 40px;
}

.audio-player .audio__btn-wrap .audio__play--pause {
  font-size: 42px;
  width: 42px;
  height: 42px;
  margin: 0 30px 0 40px;
}

.audio-player .audio__btn-wrap .audio__play--next {
  font-size: 33px;
  width: 21px;
  height: 33px;
}

.audio-player .audio__btn-wrap .audio__play--next.disable {
  opacity: 0.5;
}

.audio-player .audio__progress-wrap {
  position: relative;
  background: #ddd;
  height: 2px;
  margin-top: 10px;
}

.audio-player .audio__progress-wrap .audio__progress {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  background: #e35924;
}

.audio-player .audio__progress-wrap .audio__progress-point {
  position: absolute;
  left: 0;
  top: 50%;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-top: -8px;
  background: #e35924;
  box-shadow: 0 0 10px 1px rgba(227, 89, 36, 0.5);
}
.lyric-active {
  color: red;
  font-size: 18px;
}
.audio-player .audio__progress-wrap .audio__progress-point:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  margin: -4px 0 0 -4px;
  background: #fff;
  border-radius: 50%;
}

.audio-player .audio__time-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 7px;
}

.audio-player .audio__time-wrap .audio__current-time {
  font-size: 10px;
  color: #888;
}

.audio-player .audio__time-wrap .audio__duration {
  font-size: 10px;
  color: #888;
}

.audio-player .audio-player__audio {
  display: block;
  margin: 0 auto;
}
</style>