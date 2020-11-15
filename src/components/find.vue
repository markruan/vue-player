<<<<<<< HEAD
<template>
	<van-tab title="推荐" fixed>
		<Tabb :pic-list="picList" />
		<van-grid :border="false" :column-num="3" style="color:red">
			<van-grid-item icon="fire-o" text="每日推荐" to="/dayplay" />
			<van-grid-item icon="music-o" text="歌单" to="/moregedan" />
			<van-grid-item icon="bar-chart-o" text="排行榜" to="/ranks" />
		</van-grid>
		<van-panel title="热门歌单" desc status>
			<List :hot-list="hotList" />
		</van-panel>
		<van-panel title="热门视频" desc status>
			<vlist :mv-list="mvList" />
		</van-panel>
	</van-tab>
</template>
<script>
	import {
		Panel
	} from 'vant'
	import List from "../components/List.vue";
	import Tabb from "../components/Tabb.vue";
	import Vlist from "../components/Vlist.vue";
	import {
		Toast
	} from "vant";
	export default {
		name: "find",
		data() {
			return {};
		},
		components: {
			List,
			Tabb,
			Vlist,
			[Panel.name]: Panel
		},
		props: {
			picList: Array,
			hotList: Array,
			mvList: Array
		},
		methods: {
			iskaifa() {
				Toast("开发中...");
			}
		}
	};
</script>
=======
<template>
  
    <van-tab title="推荐" fixed>
    <Tabb :pic-list="picList" />
    <van-grid :border="false" :column-num="3" style="color:red">
      <van-grid-item icon="fire-o" text="每日推荐" to="/dayplay" />
      <van-grid-item icon="music-o" text="歌单" to="/moregedan" />
      <van-grid-item icon="bar-chart-o" text="排行榜" to="/ranks" />
    </van-grid>
    <van-panel title="热门歌单" desc status>
      <List :hot-list="hotList" />
    </van-panel>
    <van-panel title="热门视频" desc status>
      <vlist :mv-list="mvList" />
    </van-panel>
  </van-tab> 
</template>
<script>
import {Panel } from 'vant'
import List from "../components/List.vue";
import Tabb from "../components/Tabb.vue";
import Vlist from "../components/Vlist.vue";
import { Toast } from "vant";
export default {
  name: "find",
  data() {
    return {};
  },
  components: {
    List,
    Tabb,
    Vlist, 
    [Panel.name]:Panel
  },
  props: {
    picList: Array,
    hotList: Array,
    mvList: Array
  },
  methods: {
    iskaifa() {
      Toast("开发中...");
    }
  }
};
</script>
>>>>>>> ccd475819d87add24b33c1ff4e303ffe966121d6
