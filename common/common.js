const common = {}
/* 是否为空 */
common.isEmpty = function(value) {
	if (value === undefined || value === null) {
		return true;
	}
	if (typeof value === 'string') {
		return value.length === 0 || value.trim() === '';
	}
	if (typeof value === 'number' || typeof value === 'boolean') {
		return false;
	}
	if (Array.isArray(value) && value.length > 0) {
		return false;
	}
	if (typeof value === 'object') {
		const keys = Object.keys(value);
		if (Array.isArray(keys) && keys.length > 0) {
			return false;
		}
	}
	return true;
}
/* 获取随机字符串 */
common.randomString = function(length) {
	length = length || 32;
	const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
	const maxPos = chars.length;
	let pwd = '';
	for (let i = 0; i < length; i++) {
		pwd += chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return pwd;
}
/* 四舍五入 */
common.toFixed = function(val, num) {
	let number = parseFloat(val);
	if (Number.isNaN(number)) {
		number = 0;
	}
	if (number === 0) {
		return 0;
	}
	if (num === 0) return Math.round(val);
	let p = '';
	if (number < 0) {
		p = '-';
	}
	number = Math.abs(number)
	const pow = Math.pow(10, num);
	const result = number * pow;
	const res = result.toString().match(/\.(\d)?/);
	let rn = Math.floor(result)
	if (res != null) {
		if (parseInt(res[1]) > 4) {
			rn += 1;
		}
	}

	const list = rn.toString().split('').reverse();
	while (list.length <= num) {
		list.push('0');
	}
	list.splice(num, 0, '.');
	return p + list.reverse().join('');
}
/* 截取小数位 */
common.toFloorFixed = function(val, num) {
	let number = parseFloat(val);
	if (Number.isNaN(number)) {
		number = 0;
	}
	if (number === 0) {
		return 0;
	}
	let p = '';
	if (number < 0) {
		p = '-';
	}
	number = Math.abs(number)
	const pow = Math.pow(10, num);
	const result = number * pow;
	let rn = Math.floor(result)
	const list = rn.toString().split('').reverse();
	while (list.length <= num) {
		list.push('0');
	}
	list.splice(num, 0, '.');
	return p + list.reverse().join('');
}
/* 剩余时间 */
common.lastTime = function(time) {
	// 天数
	const day = Math.floor(time / (3600 * 24));
	// mo
	let model = time % (3600 * 24);
	// 时
	const hour = Math.floor(model / 3600);
	// mo
	model = model % 3600;
	// 分
	const mutite = Math.floor(model / 60);
	model = model % 60;
	// 秒
	const seconds = model;
	return {
		day,
		hour,
		mutite,
		seconds
	}
}
/* 剩余时间格式化 */
common.toMatterDate = function(options = {
	day,
	hour,
	mutite,
	seconds
}) {
	const {
		day,
		hour,
		mutite,
		seconds
	} = options;
	let result = '';
	if (day > 0) {
		result = result + day + '天 ';
	}
	if (day > 0 || hour > 0) {
		result = result + (hour > 9 ? hour : '0' + hour) + ':';
	}
	if (day > 0 || hour > 0 || mutite > 0) {
		result = result + (mutite > 9 ? mutite : '0' + mutite) + ':';
	}
	if (day > 0 || hour > 0 || mutite > 0 || seconds > 0) {
		result = result + (seconds > 9 ? seconds : '0' + seconds);
	}
	return result;
}
common.formatterMap = function(map) {
	const list = Object.keys(map);
	list.forEach(item => {
		const value = map[item];
		if (value && !Array.isArray(value) && typeof value === 'object') {
			utils.formatterMap(value);
		}
		if (value && item.indexOf('_') !== -1) {
			const key = item.replace(/\_(\w)/g, function(_, letter) {
				return letter.toUpperCase();
			});
			delete map[item]
			map[key] = value;
		}
	})
}
export default common;
