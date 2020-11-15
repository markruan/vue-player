<template>
	<van-swipe class="my-swipe myswipe" indicator-color="red" v-show="songImg">
		<van-swipe-item>
			<div class="v-image">
				<div class="border">
					<van-image :src="songImg+'?param=200y200'" round :class="{'Rotation':playing}" style="width:100%"></van-image>
				</div>
				<div class="title">{{songName+'-'+songArtist}}</div>
			</div>
		</van-swipe-item>

		<van-swipe-item v-if="playing" class="v-lyric">
			<LyricScroll :lyric="lyric" lyricLineheight="1.2rem" :current-time="currentTime" :lyricActiveClass="active" />
		</van-swipe-item>
	</van-swipe>
</template>

<script>
	import {
		mapState,
		mapActions
	} from "vuex";
	export default {
		name: "imglyric",
		data() {
			return {

				active: "lyric-active",
			}
		},
		props: {
			lyric: Object, 
			lyricShow: blur
         },
		computed: {
			...mapState([
				"songImg",
				"songName",
				"songArtist",
				"playing",
				"showAplayer",
				"playList",
				"isFullPlayer",
				"duration",
				"currentTime"
			])
		},
	}
</script>

<style>
	.myswipe {
		height: 25rem;
	}
	.v-image {
		position: absolute;
		left: 15%;
		top: 15%;
		width: 70%;
		box-sizing: border-box;
	}
	.lyric-active {
		color: red;
		font-size: 18px;
	}
	.v-lyric {
		text-align: center !important;
	}
	.lyric-view[data-v-47b84102] {
		padding-top: 30px;
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
	.title{
		text-align: center;
		}
</style>
