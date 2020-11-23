<template>
	<div>
		<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
		<div>
			<van-swipe class="my-swipe myswipe" indicator-color="red" v-show="songUrl&&isFullPlayer">
				<van-swipe-item>
					<div class="v-image">
						<div class="border">
							<van-image :src="songImg+'?param=300y300'" round :class="{'Rotation':playing}" style="width:100%"></van-image>
						</div>
						<div class="title">{{songName+'-'+songArtist}}</div>
					</div>
				</van-swipe-item>

				<van-swipe-item v-if="songUrl&&isFullPlayer" class="v-lyric">
					<LyricScroll :lyric="lyric" lyricLineheight="1.2rem" :current-time="currentTime" :lyricActiveClass="active" />
				</van-swipe-item>
			</van-swipe>

		</div>
	</div>
</template>

<script>
	import {
		mapState,
		mapActions
	} from "vuex";
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
			songId(val) {
				this.init()
			}
		},
		beforeRouteLeave(to, from, next) {
			next();
		},
		methods: {
			...mapActions([
				"setSongIdActions",
				"setShowAplayerActions",
				"setPlayingActions",
				"setIsFullPlayerActions"
			]),
			async init() {
				await this.getlyric();
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
				"duration",
				"isFullPlayer"
			])
		}
	};
</script>
<style>
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
</style>
