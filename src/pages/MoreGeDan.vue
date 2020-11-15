<template>
	<div>
		<van-nav-bar title="歌单广场" left-text="返回" @click-left="onClickLeft" left-arrow />
    <van-tabs v-model="active" sticky @change="indexChange" swipeable>
			<van-tab v-for="(item,i) in catList.slice(1,catList.length-1)" :key="item.id" :title="item.name" animated>
        <van-loading v-if="isloading" type="circular" color="#1989fa" vertical />
          <van-grid v-else :column-num="3" :border="false">
            <Pic3d :slides="geDanList" v-show="i==0" />
            <ImgList :listInfo="geDanList" />
          </van-grid>
       </van-tab>   
      <van-tab v-for="(item,i) in catList" v-if="i>0" :key="item.id" :title="item.name " animated>
					<van-loading v-if="isloading" type="circular" color="#1989fa" vertical />
					<van-grid v-else :column-num="3" :border="false">
						<Pic3d :slides="geDanList" v-if=" i==1" />
						<ImgList :listInfo="geDanList" />
					</van-grid>
				</van-tab>
		</van-tabs>
	</div>
</template>
<script>
	import Pic3d from "../components/3d";
	import ImgList from "../components/3list";
	export default {
		data() {
			return {
				catList: [],
				tabIndex: 0,
				active: "home",
				geDanList: [],
				isloading: true
			};
		},
		components: {
			components: {
				Pic3d,
				ImgList
			},
			watch: {},
			methods: {
				getCatList() {
					const list = localStorage.getItem("catlist");
					if (list != null) {
						this.catList = JSON.parse(localStorage.getItem("catlist"));
						this.getGeDanList(0);
					} else {
						console.log("http");
						this.$http
							.get("/playlist/catlist")
							.then(response => {
								this.catList = response.data.sub;
								this.getGeDanList(0);
								localStorage.setItem("catlist", JSON.stringify(this.catList));
							})
							.catch(error => {
								console.log("接口或处理逻辑出错");
							});
					}
				},
				getGeDanList(index) {
					this.$http
						.get("/top/playlist", {
							params: {
								cat: this.catList[index].name,
								limit: 21
							}
						})
						.then(response => {
							this.geDanList = response.data.playlists;

							if (this.geDanList.length > 20) {
								this.isloading = false;
							}
							if (this.geDanList.length > 20) {
								this.isloading = false;
							}
						})
						.catch(error => {
							console.log("接口或处理逻辑出错");
						});
				},
				indexChange(e) {
					this.getGeDanList(e);
					this.isloading = true;
				},
				onClickLeft() {
					this.$router.go(-1);
				},
				imgLoad(e) {
					this.isloading = false;
				}
			},
			mounted() {
				this.getCatList();
			}
		}
	}
</script>
