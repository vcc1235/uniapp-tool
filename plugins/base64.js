// ArrayBuffer转为字符串，参数为ArrayBuffer对象
function ab2str(buf) {
	return String.fromCharCode.apply(null, new Uint16Array(buf));
}
// 字符串转为ArrayBuffer对象，参数为字符串
function str2ab(str) {
	try {
		if (typeof str !== 'string') {
			str = '' + str;
		}
		var buf = new ArrayBuffer(str.length * 2); // 每个字符占用2个字节
		var bufView = new Uint16Array(buf);
		for (var i = 0, strLen = str.length; i < strLen; i++) {
			bufView[i] = str.charCodeAt(i);
		}
		return buf;
	} catch (e) {
		//TODO handle the exception
		console.log(str, typeof str, e);
		return e;
	}
}
export default {
	decode: function(val) {
		// #ifdef H5
		return atob(val);
		// #endif
		// #ifndef H5
		const buffer = uni.base64ToArrayBuffer(val);
		return ab2str(buffer);
		// #endif
	},
	encode: function(val) {
		// #ifdef H5
		return btoa(val);
		// #endif
		// #ifndef H5
		const buffer = str2ab(val);
		return uni.arrayBufferToBase64(buffer);
		// #endif
	}
}
