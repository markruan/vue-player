 <template>
	<keep-alive>
		<div>
			<van-popup v-model="show" closeable position="left" :style="{ width: '40%' ,height:'100%'}" />
			<van-nav-bar fixed title="酷选音乐">
				<template #left>
  <van-icon name="bars" :size="30" @click="showPopup" />
</template>
			</van-nav-bar>
			<van-tabs v-model="active" animated style="margin-top:46px" swipeable sticky>
				<keep-alive>
					<Find :picList="picList" :hotList="hotList" :mvList="mvList" />
					</keep-alive>
					<van-tab title="歌手">
						<Singer :singer-list="singerList" />
					</van-tab>
					<van-tab title="我的">
						<My />
					</van-tab>
				
			</van-tabs>
		</div>
	</keep-alive>
</template>

<script>
	import Singer from "../components/Singer.vue";
	import Find from "../components/find";
	import My from "../components/my";
	import {
		mapState,
		mapActions
	} from "vuex";
	export default {
		name: "HelloWorld",
		data() {
			return {
				show: false,
				active: "home",
				picList: [],
				hotList: [],
				singerList: [],
				mvList: []
			};
		},
		components: {
			Find,
			Singer,
			My,
		},
		props: {
			msg: String
		},
		created() {
			this.init();
			this.getHotList();
			this.getSingerList();
			this.getVideoList();
		},
		computed: {
			...mapState(["playHistory"])
		},
		methods: {
			...mapActions(["getGeListActions"]),
			async init() {
				const this_ = this;
				this.$http
					.get("/banner?type=2", {
						param: {}
					})
					.then(function(response) {
						this_.picList = response.data.banners.map(item => item.pic);
					})
					.catch(error => {
						console.log("接口或处理逻辑出错");
					});
			},
			async getHotList() {
				const this_ = this;
				this.$http
					.get("/personalized", {
						params: {
							limit: 6
						}
					})
					.then(function(response) {
						this_.hotList = response.data.result;
					})
					.catch(error => {
						console.log("接口或处理逻辑出错");
					});
			},
			async getSingerList() {
				const this_ = this;
				this.$http
					.get("/artist/list", {
						params: {
							limit: 100,
							type: -1
						}
					})
					.then(function(response) {
						this_.singerList = response.data.artists;
					})
					.catch(error => {
						console.log("接口或处理逻辑出错");
					});
			},
			async getVideoList() {
				const this_ = this;
				this.$http
					.get("/mv/first", {
						params: {
							limit: 10,
							type: -1
						}
					})
					.then(function(response) {
						this_.mvList = response.data.data;
					})
					.catch(error => {
						console.log("接口或处理逻辑出错");
					});
			},
			showPopup() {
				this.show = true;
			}
		}
	}; 
 
</script>  