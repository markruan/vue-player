<<<<<<< HEAD
<template>
	<div class="musicPlay" v-if="songUrl" v-show="showAplayer">
		<div v-show="false">
			<audio ref="aplayer" controls="controls" :src="songUrl" @timeupdate="timeupdate" @playing="onPlaying" @ended="onEnded"
  @canplay="onCanPlay" />
		</div>
		<!--        迷你播放器-->
		<div v-show="!isFullPlayer&&showAplayer" class="audio-com-box-min">
			<van-image @click="openFullPlayer" round width="50px" height="50px" :src="songImg+'?param=50y50'" :class="{'Rotation':playing}" />
			<div @click="openFullPlayer" class="musicName">
				<p>{{songName===''?'正在播放电台':songName}}</p>
				<p class="tip" v-text="songArtist"></p>
			</div>
			<div class="musicIcon">
				<van-icon v-show="!playing" name="play-circle-o" size="36px" color="#bfbfbf" @click="replay()" />
				<van-icon v-show="playing" name="pause-circle-o" size="36px" color="#bfbfbf" @click="pause" />
			</div>
			<div class="musicIcon" @click="showlist()">
				<van-icon name="more-o" size="36px" color="#bfbfbf" />
			</div>
		</div>
		<van-popup v-model="showPlayList" round position="bottom" :style="{ height: '30%' }">
			<van-list>
				<van-cell title="播放列表" value title-style="font-size:16px" />
				<van-cell v-for="(item,index) in playList" @click="setPlay(index)" :key="item.id" :title="item.songName" :label="item.songArtist" />
			</van-list>
		</van-popup>
		<!--全屏模式-->
		<div class="content" v-if="showAplayer&&isFullPlayer">
			<div class="banner_bg" :style="{'background-image':`url(${songImg+'?param=50y50'})`,
  'animation-play-state':animationShow}"></div>
			<div>
				<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
				<div>
					<imgLyric :lyric="lyric" />
					<div class="audio-player">
						<div class="audio__btn-wrap">
							<div @click="onPlayPrev()" class="audio__play--previous">
								<van-icon name="arrow-left" />
							</div>

							<div @click="playerPause()" v-if="playing" class="audio__play--pause">
								<van-icon name="pause-circle-o" />
							</div>
							<div v-else @click="playerPause()" class="audio__play--start">
								<van-icon name="play-circle-o" />
							</div>

							<div @click="onPlayNext()" class="audio__play--next">
								<van-icon name="arrow" />
							</div>
						</div>

						<div class="audio__progress-wrap" ref="audioProgressWrap">
							<div class="audio__progress" ref="audioProgress" :style="'width:'+sliderTime+'%'" />
							<div class="audio__progress-point" ref="audioProgressPoint" :style="'left:'+sliderTime+'%'" />
						</div>

						<div class="audio__time-wrap">
							<div class="audio__current-time" v-text="currentTimeAfterFormat">0：00</div>
							<div class="audio__duration" v-text="duration?formatTime(duration):'3:51'"></div>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>>

<script>
	import imgLyric from "./lyric.vue"
	import {
		mapState,
		mapActions
	} from "vuex";
	export default {
		name: "app",
		data: () => ({
			musicInfo: {},
			musicSongId: "",
			showPlayList: false,
			isfull: false,
			audioSources: {},
			audioList: [],
			lyric: {},
			lyricShow: false,
			currentTimeAfterFormat: "", // 音频播放当时时间（格式化后）
			sliderTime: 0,
			animationShow: "running",
		}),
		components: {
			imgLyric
		},
		watch: {
			songUrl: function(val) {
				if (val) {
					this.show = true;
					setTimeout(() => {
						let aplayer = this.$refs.aplayer;
						aplayer.play();
						this.setDurationActions(aplayer.duration);
					}, 500);
				}
			},
			songId(val) {
				if (val) {
					this.getMusicInfo();
					this.init();
				}
			},
			playing(val) {
				if (!val) {
					this.$refs.aplayer.pause();
				} else {
					this.$refs.aplayer.play();
				}
			},
			currentTime: function(val) {
				if (val) {
					this.lyricShow = true;
				}
				this.currentTimeAfterFormat = this.formatTime(val);
				this.sliderTime = parseInt((val / this.duration) * 100);
			}
		},
		created() {
			this.show = false;

		},
		async mounted() {},
		computed: {
			...mapState([
				"songArtist",
				"songId",
				"songImg",
				"songName",
				"songUrl",
				"playing",
				"showAplayer",
				"playList",
				"isFullPlayer",
				"duration",
				"currentTime",
				"currentIndex"
			])
		},
		methods: {
			...mapActions([
				"setSongNameActions",
				"setDurationActions",
				"setSongIdActions",
				"setSongUrlActions",
				"setSongImgActions",
				"setSongArtistActions",
				"setCurrentTimeActions",
				"setPlayingActions",
				"setPlayListActions",
				"setIsFullPlayerActions",
				"setCurrentIndexActions"
			]),
			timeupdate(e) {
				this.setCurrentTimeActions(e.target.currentTime)
			},
			onEnded() {
				this.onPlayNext()
			},
			onPlayPrev: function() {
				let aplayer = this.$refs.aplayer;

				if (this.currentIndex == 0) {
					aplayer.play();
				} else{
					console.log(this.currentIndex - 1)
					this.setPlay(this.currentIndex - 1)
					/* */
				}
			},
			onPlayNext: function() {
				let aplayer = this.$refs.aplayer;

				if (this.playList.length == 1) {
					aplayer.play();
				} else if (this.playList.length == this.currentIndex + 1) {
					this.setPlay(0)
				} else {
					console.log(this.currentIndex + 1)
					this.setPlay(this.currentIndex + 1)
					/* */
				}
			},
			onPlaying: function(time) {
				this.setPlayingActions(true);
			},
			onPause: function() {
				console.log("onPause");
				this.setPlayingActions(false);
			},
			onProgressChange: function(progress) {
				console.log("onProgressChange", progress);
			},
			onModeChange: function(mode) {
				console.log("onVolumeChange", mode);
			},
			setPlay(index) {
				this.setSongIdActions(this.playList[index].songId);
				console.log(index)
				this.setCurrentIndexActions(index)
				this.getMusicInfo();
				this.showPlayList = false
			},
			onCanPlay(e) {
				this.setDurationActions(e.target.duration)
			},
			replay() {
				let aplayer = this.$refs.aplayer;
				aplayer.play();
			},
			pause() {
				let aplayer = this.$refs.aplayer;
				aplayer.pause();
				this.setPlayingActions(false)
			},
			showlist() {
				this.showPlayList = true;
			},
			openFullPlayer() {
				this.setIsFullPlayerActions(true)

			},
			async getMusicInfo() {
				const songData = await this.$http.get("/song/detail", {
					params: {
						ids: this.songId
					}
				});
				if (songData.data.songs.length) {
					this.setSongNameActions(songData.data.songs[0].name);

					this.setSongIdActions(songData.data.songs[0].id);
					this.setSongImgActions(songData.data.songs[0].al.picUrl);
					this.setSongArtistActions(songData.data.songs[0].ar[0].name);
					const songinfo = {
						songArtist: songData.data.songs[0].ar[0].name,
						songImg: songData.data.songs[0].al.picUrl,
						songId: songData.data.songs[0].id,
						songName: songData.data.songs[0].name
					};
					this.setPlayListActions(songinfo);

					this.getUrl()
				}
			},
			async getUrl() {
				const data = await this.$http.get('/song/url', {
					params: {
						id: this.songId
					}
				})
				this.setSongUrlActions(data.data.data[0].url)
			},
			async init() {
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
				this.setIsFullPlayerActions(false)
			},
			async getlyric() {
				const self = this;
				await this.$http
					.get("/lyric", {
						params: {
							id: this.songId
						}
					})
					.then(response => {
						if (response.data.lrc.lyric) {
							this.lyric = self.lyricToObj(response.data.lrc.lyric);
						}
					})
					.catch(error => {
						console.log("接口或处理逻辑出错");
					});
			}
		}
	};
</script>>
<style scoped>
	audio {
		display: none;
	}

	@keyframes rotatePic {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	.move2-enter-active,
	.move2-leave-active {
		transition: all 0.7s;
	}

	/* 显示前或隐藏后的效果 */
	.move2-enter,
	.move2-leave-to {
		transform: translateY(200%);
	}

	.audio-com-box-min {
		position: fixed;
		bottom: 0;
		width: -webkit-fill-available;
		border: 1px solid #e5e5e5;
		border-radius: 10px;
		padding: 5px;
		display: flex;
		align-items: center;
		background-color: rgba(255, 255, 255, 0.99);
	}

	p {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin: 1px;
	}

	.tip {
		margin-top: 5px;
		font-size: 14px;
		color: #a7a6a7;
	}

	.musicName {
		flex: 3;
		padding-left: 25px;
		font-weight: 600;
	}

	/*音频图标*/

	.musicIcon {
		flex: 1;

		img {
			margin-top: 15px;
			margin-left: 50px;
		}
	}

	.move-enter-active,
	.move-leave-active {
		transition: all 0.7s;
	}

	/* 显示前或隐藏后的效果 */
	.move-enter,
	.move-leave-to {
		transform: translateY(200%);
	}

	.Rotation {
		-webkit-transform: rotate(360deg);
		animation: rotation 8s linear infinite;
		-moz-animation: rotation 8s linear infinite;
		-webkit-animation: rotation 8s linear infinite;
		-o-animation: rotation 8s linear infinite;
	}

	@-webkit-keyframes rotation {
		from {
			-webkit-transform: rotate(0deg);
		}

		to {
			-webkit-transform: rotate(360deg);
		}
	}

	.border {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}



	.title {
		padding-top: 12px;
		text-align: center;
	}



	.audio-player {
		margin: 0 15px;
		position: fixed;
		width: 90%;
		bottom: 15px;
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

	.banner_bg {
		width: 100%;
		background-repeat: no-repeat;
		background-size: cover;
		-webkit-filter: blur(100px);
		-moz-filter: blur(100px);
		-o-filter: blur(100px);
		-ms-filter: blur(100px);
		filter: blur(100px);
		position: absolute;
		left: 0;
		top: 0;
		height: fit-content;
		height: -webkit-fill-available;
	}
</style>
=======
<template>
  <div class="musicPlay" v-if="songUrl" v-show="showAplayer">
    <audio
      ref="aplayer"
      controls="controls"
      :src="this.songUrl"
      @timeupdate="timeupdate"
      @play="play"
    />
    <!--        迷你播放器-->
    <div  v-show="minOrMax" class="audio-com-box-min">
      <van-image round width="50px" height="50px" :src="songImg" />
      <div class="musicName">
        <p>{{songName===''?'正在播放电台':songName}}</p>
        <p class="tip" v-text="songArtist"></p>
      </div>
      <div class="musicIcon">
        <van-icon
          v-show="!playing"
          name="play-circle-o"
          size="36px"
          color="#bfbfbf"
           @click="isplay"
        />
        <van-icon
          v-show="playing"
          name="pause-circle-o"
          size="36px"
          color="#bfbfbf"
            @click="ispause"
        />
        <van-icon 
          name="coupon-circle-o"
          size="24px"
          color="#bfbfbf"
          @click="ispause"
        />
      </div>
    </div>
    <!--全屏模式-->
    <div v-show="!minOrMax" >
     <fullplayer/>
    </div>
    
  </div>
</template>>

<script>
import fullplayer from "../pages/player";
import { mapState, mapActions } from "vuex";
export default {
  name: "app",
  data: () => ({
    musicInfo: {},
    minOrMax:true
  }),
  components: {
    fullplayer
  },
  watch: {
    songUrl: function(val) {
      if (val) {
        this.show = true;
        setTimeout(() => {
          let aplayer = this.$refs.aplayer;
          aplayer.play();
        }, 1000);
      }
    },
    songId(val) {
      if (val) {
        this.getMusicInfo();
      }
    },
    playing(val) {
      if (!val) {
        this.$refs.aplayer.pause();
      } else {
        this.$refs.aplayer.play();
      }
    },
    showAplayer(val) {
      // console.log(val)
    }
  },
  created() {
    this.show = false;
  },
  async mounted() {},
  computed: {
    ...mapState([
      "songArtist",
      "songId",
      "songImg",
      "songName",
      "songUrl",
      "playing",
      "showAplayer",
      "playList"
    ])
  },
  methods: {
    ...mapActions([
      "setSongNameActions",
      "setDurationActions",
      "setSongIdActions",
      "setSongUrlActions",
      "setSongImgActions",
      "setSongArtistActions",
      "setCurrentTimeActions",
      "setPlayingActions"
    ]),
    handleEvent(e) {
      // console.log(e);
    },
    isplay(e) {
      this.setPlayingActions(true);
    },
    play(e) {
      this.setPlayingActions(true);
      this.setDurationActions(e.target.duration);
    },
    isplaying(e) {
      // console.log(e);111
      111;
    },
    ispause(e) {
      //  console.log(e);
      this.setPlayingActions(false);
    },
    timeupdate(e) {
      this.setCurrentTimeActions(e.target.currentTime);
      this.setDurationActions(e.target.duration);
    },
    isMinPlayer() {
      this.minOrMax=false
    },
    async getMusicInfo() {
      const songData = await this.$http.get("/song/detail", {
        params: {
          ids: this.$route.params.id
        }
      });
      this.setSongNameActions(songData.data.songs[0].name);
      this.setSongIdActions(songData.data.songs[0].id);
      this.setSongImgActions(songData.data.songs[0].al.picUrl);
      this.setSongArtistActions(songData.data.songs[0].ar[0].name);

      const this_ = this;
      this.$http
        .get("/song/url", { params: { id: this.$route.params.id } })
        .then(response => {
          this.setSongUrlActions(response.data.data[0].url);
        })
        .catch(error => {
          console.log("接口或处理逻辑出错");
        });
    }
  }
};
</script>>
<style scoped >
audio {
  display: none;
}
@keyframes rotatePic {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.move2-enter-active,
.move2-leave-active {
  transition: all 0.7s;
}

/* 显示前或隐藏后的效果 */
.move2-enter,
.move2-leave-to {
  transform: translateY(200%);
}

.audio-com-box-min {
  position: fixed;
  bottom: 0;
  width: -webkit-fill-available;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 5px;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.99);
}
p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 1px;
  
}

.tip {
  margin-top: 5px;
  font-size: 14px;
  color: #a7a6a7;
}

.musicName {
  flex: 3;
  padding-left: 25px; 
  font-weight: 600;
}
/*音频图标*/

.musicIcon {
  flex: 1;

  img {
    margin-top: 15px;
    margin-left: 50px;
  }
}

.move-enter-active,
.move-leave-active {
  transition: all 0.7s;
}

/* 显示前或隐藏后的效果 */
.move-enter,
.move-leave-to {
  transform: translateY(200%);
}
</style>
>>>>>>> ccd475819d87add24b33c1ff4e303ffe966121d6
