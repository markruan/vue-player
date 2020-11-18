 
/* Copyright.

 */
import Vue from 'vue'
import Vuex from 'vuex'
import tool from "@/assets/utils.js" 
 
//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
    state: {
        //存放的键值对就是所要管理的状态
        playing: false,
        duration: 0,
        currentTime: 0,
        songId: {},
        songName: {},
        songUrl: '',
        songImg: '',
        songArtist: {},
        showAplayer: true,
        playList:[],
        userinfo:'',
		currentIndex:0,
		isFullPlayer:false
    },
    mutations: {
        setSongName(state, name) {
            state.songName = name
        },
        setDuration(state, duration) {
            state.duration = duration
        },
        setCurrentTime(state, currentTime) {
            state.currentTime = currentTime
        },
        setSongId(state, id) {

            state.songId = id
        },
        setSongUrl(state, songUrl) {
            state.songUrl = songUrl
        },
        setSongImg(state, songImg) {
            state.songImg = songImg
        },
        
        setSongArtist(state, songArtist) {
            state.songArtist = songArtist
        },
        setPlaying(state, playing) {
            state.playing = playing
        },
        setShowAplayer(state, showAplayer) {
            state.showAplayer = showAplayer
        },
        setPlayList(state,list){
		  console.log(tool.ishas(state.playList,list))
          if(!tool.ishas(state.playList,list)){
			  state.playList.push(list)
		  }
        },
        setUserInfo(state,info){
          state.userinfo=info
        },
		setCurrentIndex(state,index){
		  state.currentIndex=index	
        },
		setIsFullPlayer(state,set){
			state.isFullPlayer=set
		}

    },
    actions: {
        setSongNameActions(context, name) {
            context.commit('setSongName', name)
        },
        setDurationActions(context, duration) {
            context.commit('setDuration', duration)
        },
        setCurrentTimeActions(context, setCurrentTime) {
            context.commit('setCurrentTime', setCurrentTime)
        },
        setSongIdActions(context, setSongId) {
            context.commit('setSongId', setSongId)
        },
        setSongUrlActions(context, setSongUrl) {
            context.commit('setSongUrl', setSongUrl)
        },
        setSongImgActions(context, setSongImg) {
            context.commit('setSongImg', setSongImg)
        },
        setSongArtistActions(context, songArtist) {
            context.commit('setSongArtist', songArtist)
        },
        setPlayingActions(context, setPlaying) {
            context.commit('setPlaying', setPlaying)
        },
        setShowAplayerActions(context, setShowAplayer) {
            context.commit('setShowAplayer', setShowAplayer)
        },
        setPlayListActions(context, list) {
            context.commit('setPlayList', list)
        },
        setUserInfoActions(context, list) {
            context.commit('setUserInfo', list)
        },
		setCurrentIndexActions(context,index){
			context.commit('setCurrentIndex',index)
		},
		setIsFullPlayerActions(context,set){
			context.commit("setIsFullPlayer",set)
		}

    }
})

export default store 
