<template>
	<view class="content" style="background-color: #FFFFFF;height: 400rpx;">
		<v-slider v-model="number"></v-slider>
		<view>
			<text>{{timeText}}</text>
		</view>
	</view>
</template>

<script>
	import common from '@/common/common.js'
	export default {
		data() {
			return {
				title: 'Hello',
				number: 20,
				timeText: ''
			}
		},
		onLoad() {
			
		},
		watch:{
			number(va){
				console.log(va);
			}
		},
		mounted() {
			const lastTime = 1623728329
			const _that = this;
			uni.$on(uni.$single.listenTime, function(time){
				const map = common.lastTime(lastTime-time);
				console.log(map);
				_that.timeText = common.toMatterDate(map)
			})
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
