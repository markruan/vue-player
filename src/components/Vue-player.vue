<template>
    <div class="musicPlay" v-if="songUrl" v-show="showAplayer">
        <audio ref="aplayer" controls="controls" :src="this.songUrl" @timeupdate="timeupdate" @play="play" @ended="onended" />
        <!--        迷你播放器-->
        <div v-show="minOrMax||!isFullPlayer" class="audio-com-box-min">
            <van-image @click="showFullPlayer" round width="50px" height="50px" :src="songImg" :class="{'Rotation':playing}" />
            <div class="musicName" @click="showFullPlayer">
                <p>{{songName===''?'正在播放电台':songName}}</p>
                <p class="tip" v-text="songArtist"></p>
            </div>
            <div class="musicIcon">
                <van-icon v-show="!playing" name="play-circle-o" size="36px" color="#bfbfbf" @click="isplay" />
                <van-icon v-show="playing" name="pause-circle-o" size="36px" color="#bfbfbf" @click="ispause" />
                <van-icon class="menu" name="bars" @click="showPlayList" size="36px" color="#bfbfbf" />
            </div>
        </div>
        <van-action-sheet v-model="showList" title="播放列表">
            <van-list>
                <van-cell @click="setSongId(item.songId)" v-for="item in playList" :key="item.songId" :title="item.songName+'--'+item.songArtist" />
            </van-list>
        </van-action-sheet>
        <!--全屏模式-->
        <div v-show="!minOrMax&&isFullPlayer">
            <fullplayer />
            <div class="audio-player">
                <div class="audio__btn-wrap">
                    <div class="audio__play--previous" @click="onPlayPrev">
                        <van-icon name="arrow-left" />
                    </div>
                    <div @click="playerPause()" v-if="playing" class="audio__play--pause">
                        <van-icon name="pause-circle-o" />
                    </div>
                    <div v-else @click="playerPause()" class="audio__play--start">
                        <van-icon name="play-circle-o" />
                    </div>
                    <div class="audio__play--next" @click="onPlayNext">
                        <van-icon name="arrow" />
                    </div>
                </div>
                <div class="audio__progress-wrap" ref="audioProgressWrap">
                    <div class="audio__progress" ref="audioProgress" :style="'width:'+sliderTime+'%'" />
                    <div class="audio__progress-point" ref="audioProgressPoint" :style="'left:'+sliderTime+'%'" />
                </div>
                <div class="audio__time-wrap">
                    <div class="audio__current-time" v-text="currentTimeAfterFormat">0：00</div>
                    <div class="audio__duration" v-text="formatTime(duration)=='NaN'?'3:51':formatTime(duration)"></div>
                </div>
            </div>
        </div>
    </div>
</template>>
<script>
import fullplayer from "../pages/player";
import {
    mapState,
    mapActions
} from "vuex";
export default {
    name: "app",
    data: () => ({
        showList: false,
        musicInfo: {},
        minOrMax: true,
        sliderTime: 0,
        currentTimeAfterFormat: "", // 音频播放当时时间（格式化后）
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
            // this.minOrMax = true
            this.setShowAplayerActions(true)
            if (!val) {
                this.$refs.aplayer.pause();
            } else {
                this.$refs.aplayer.play();
            }
        },
        currentIndex(val) {

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
            "currentIndex",
            "duration",
            "isFullPlayer",
            "currentTime"
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
            "setShowAplayerActions",
            "setIsFullPlayerActions",
            "setPlayListActions",
            "setCurrentIndexActions"
        ]),
        handleEvent(e) {
            // console.log(e);
        },
        setSongId(id) {
            this.setSongIdActions(id)
            this.showList=false
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
        onended(){
          this.onPlayNext()
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
            this.minOrMax = false
        },
        async getMusicInfo() {
            const songData = await this.$http.get("/song/detail", {
                params: {
                    ids: this.songId
                }
            });
            if (songData) {
                this.setSongNameActions(songData.data.songs[0].name);
                this.setSongIdActions(songData.data.songs[0].id);
                this.setSongImgActions(songData.data.songs[0].al.picUrl);
                this.setSongArtistActions(songData.data.songs[0].ar[0].name);
                const data = songData.data.songs[0]
                const list = {
                    songName: data.name,
                    songId: data.id,
                    songImg: data.al.picUrl,
                    songArtist: data.ar[0].name
                }
                this.setPlayListActions(list)
            }
            const this_ = this;
            this.$http
                .get("/song/url", {
                    params: {
                        id: this.songId
                    }
                })
                .then(response => {
                    this.setSongUrlActions(response.data.data[0].url);
                })
                .catch(error => {
                    console.log("接口或处理逻辑出错");
                });
        },
        // 格式化秒为分
        formatTime(second) {
            return [parseInt((second / 60) % 60), parseInt(second % 60)]
                .join(":")
                .replace(/\b(\d)\b/g, "0$1");
        },
        showFullPlayer() {
            this.minOrMax = false
            this.setIsFullPlayerActions(true)
        },
        playerPause() {
            this.setPlayingActions(!this.playing);
        },
        showPlayList() {
            this.showList = true
        },
        onPlayPrev() {
            let index = this.currentIndex - 1;

            if (index < 0) {
                index += this.playList.length;
            }
            this.setCurrentIndexActions(index)
            this.setSongIdActions(this.playList[index].songId)
        },
        onPlayNext() {
            if (this.playList.length > 0) {

                let index = this.currentIndex;
                index++;
                if (index >= this.playList.length) {
                    index %= this.playList.length;
                }
                this.setCurrentIndexActions(index)
                this.setSongIdActions(this.playList[index].songId)
                //获取音乐url，歌词，启动播放


            } else {
                this.Toast('没有更多了')
            }
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
    flex: none;

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

.menu {
    padding-left: 2px;
}

.content {
    padding: 16px 16px 160px;
    max-height: 40%;
}
</style>