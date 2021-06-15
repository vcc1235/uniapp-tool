const single = {
	// 全局定时器
	timer: undefined,
	listenTime: 'listen_time_interval'
}
/* 开启定时器 */
single.startTimer = function(){
	if(this.timer !== undefined){
		console.warn('timer is started');
		return ;
	}
	// 获取当前时间
	let times = Math.floor(new Date().getTime()/1000);
	const _that = this;
	this.timer = setInterval(function(){
		times++;
		uni.$emit(_that.listenTime, times);
	},1000);
}
if(uni !== undefined && uni.$single === undefined){
	uni.$single = single;
}

