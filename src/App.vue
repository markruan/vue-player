 
<template>
	<div id="app">
		<div class="view" v-show="!isFullPlayer">
			<router-view />
		</div>
		<VuePlayer/>
	</div>
</template>

<script>
	import VuePlayer from "./components/Vue-player";
	import {
		mapState,
	} from "vuex";
	export default {
		name: "app",
		data: () => ({}),
		computed: {
			...mapState([
				"isFullPlayer"
			])
		},
		components: {
			VuePlayer
		}
	};
</script>
<style scoped>
	.view {
		margin-bottom: 22%;
	} 
 