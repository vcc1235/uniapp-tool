<template>
	<view>
		<movable-area :animation="true" style="position: relative;" class="display-flex-center" :style="{
			width: (width+30)+'rpx',
			height: '39rpx'
		}">
			<movable-view style="z-index: 100;" @change="changeAction" :x="xm" :friction="20" direction="horizontal">
			</movable-view>
			<view class="display-flex-center" style="left: 20rpx; overflow: hidden;position: absolute;z-index: 99;" :style="{
				width: xm+'px',
				height: '39rpx'
			}">
				<image src="./ui_huadon02.png" style="position: absolute;" mode="widthFix" :style="{
					width: width+'rpx',
					height: '39rpx'
				}"></image>
			</view>
			<image style="position: absolute;left: 20rpx;" src="./ui_huadon01.png" mode="widthFix" :style="{
					width: width+'rpx'
				}"></image>
		</movable-area>
	</view>
</template>

<script>
	/**
	 * @description 滑块
	 * @property {Number} value = [0] 滑块值
	 * @property {Number} width = [600] 滑块可滑动长度
	 * @property {Number} min = [0] 最小值
	 * @property {Number} max = [100] 最大值   
	 * 
	 * */
	export default {
		name: "v-slider",
		props: {
			value: {
				default: 0
			},
			width: {
				default: 600
			},
			min: {
				default: 0
			},
			max: {
				default: 100
			}
		},
		data() {
			return {
				xm: 0
			};
		},
		methods: {
			changeAction({
				detail: {
					x
				}
			}) {
				this.xm = x ;
				const long = uni.upx2px(this.width);
				const l = this.min + (x/long)*(this.max-this.min);
				this.$emit('input', l);
			}
		}
	}
</script>

<style lang="scss">
	.display-flex-center{
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}
	movable-area {
		// background-color: #F0AD4E;
		

		movable-view {
			width: 30upx;
			height: 39upx;
			background-color: #F0AD4E;
			background-image: url(./ui_huadon03.png);
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-position: center;
			position: relative;
			z-index: 100;
		}
	}
</style>
