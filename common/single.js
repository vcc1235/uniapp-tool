const single = {
	// 全局定时器
	timer: undefined,
	listenTime: 'listen_time_interval'
}
/* 开启定时器 */
single.startTimer = function() {
	if (this.timer !== undefined) {
		console.warn('timer is started');
		return;
	}
	// 获取当前时间
	let times = Math.floor(new Date().getTime() / 1000);
	const _that = this;
	this.timer = setInterval(function() {
		times++;
		uni.$emit(_that.listenTime, times);
	}, 1000);
}
/* 消息提示 */
uni.$message = {
	error(message) {
		uni.showToast({
			title: message,
			icon: 'none'
		});
	},
	success(message) {
		if (message && message.length < 7) {
			uni.showToast({
				title: message,
				icon: 'success'
			})
		} else {
			uni.showToast({
				title: message,
				icon: 'none'
			})
		}
	}
}
// #ifdef APP-PLUS
function checkVersion(localVersion, version) {
	const vlist = localVersion.split('.');
	const rList = version.split('.');
	try {
		if (parseInt(vlist[0]) < parseInt(rList[0])) { // 大版本小于
			return 1;
		} else if (parseInt(vlist[1]) < parseInt(rList[1])) { // 小版本
			return -1;
		} else if (parseInt(vlist[2] < parseInt(rList[2]))) { // 小版本
			return -1;
		} else if (parseInt(vlist[3]) < parseInt(rList[3])) {
			return -1
		}
		return 0;
	} catch (e) {
		//TODO handle the exception
		return 0;
	}
}
const startHot = async function(url) {
	try {
		await uni.showLoading({
			title: '正在更新,请勿操作...',
			mask: true
		});
		const [error, {
			statusCode,
			tempFilePath
		}] = await uni.downloadFile({
			url,
		});
		if (statusCode !== 200) {
			await uni.hideLoading();
			uni.$message.error('文件热更包下载失败')
		}
		plus.runtime.install(tempFilePath, {
			force: true
		}, function() {
			uni.hideLoading();
			plus.runtime.restart();
		}, function(e) {
			uni.hideLoading();
			uni.$message.error('更新失败');
		})
	} catch (e) {
		//TODO handle the exception
		uni.$message.error('更新失败');
	}
}
/* 热更新 */
single.startCheckVersion = async function(url, widgetInfo) {
	const {
		version: localVersion,
		versionCode
	} = widgetInfo;
	const [error, {
		data
	}] = await uni.request({
		url
	});
	if (error !== null) {
		console.log(error.message);
		return;
	}
	const {
		version,
		wgturl,
		apkurl
	} = data;
	const status = checkVersion(localVersion + '.' + versionCode, version);
	console.log(status);
	if (status === 1) {
		plus.runtime.openURL(apkurl);
	} else if (status === -1) {
		startHot(wgturl)
	}
}
// #endif
// #ifndef APP-PLUS
single.startCheckVersion = function() {

}
// #endif
if (uni !== undefined && uni.$single === undefined) {
	uni.$single = single;
}
