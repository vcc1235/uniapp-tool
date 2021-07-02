<template>
	<image :mode="mode" :src="srcImg" :style="{
		width: width>0?`${width}rpx`:'normal',
		height: height>0?`${height}rpx`:'normal'
	}"></image>
</template>

<script>
	export default {
		name: "v-image",
		props: {
			src: {
				default: ''
			},
			mode: {
				default: 'aspectFit'
			},
			width: {
				default: 750
			},
			height: {
				default: 70
			}
		},
		data() {
			return {
				path: ''
			};
		},
		watch:{
			src: {
				handler(val){
					this.updateImage(val);
				}
			}
		},
		computed:{
			srcImg(){
				return this.path + this.src;
			}
		},
		methods:{
			updateImage(val){
				if(val === '' || val === undefined){
					this.path = '123'
				} else {
					this.path = '';
				}
			}
		}
	}
</script>

<style lang="scss">

</style>
