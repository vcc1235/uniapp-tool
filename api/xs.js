const config = Symbol('config')
const isCompleteURL = Symbol('isCompleteURL')
const requestBefore = Symbol('requestBefore')
const requestBeforeError = Symbol('requestBeforeError')
const requestAfter = Symbol('requestAfter')
const requestAfterError = Symbol('requestAfterError')

function parseParams(params) {
	const list = Object.keys(params);
	const result = list.map(k => k + '=' + params[k]);
	return result.join('&');
}
class XService {
	[config] = {
		baseURL: '',
		method: 'GET',
		header: {
			'content-type': 'application/json'
		},
		dataType: 'json'
	}
	// 判断url是否完整
	static[isCompleteURL](url) {
		return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
	}
	interceptors = {
		request: (func, error) => {
			if (func) {
				XService[requestBefore] = func
			} else {
				XService[requestBefore] = (request) => request
			}
			if (error) {
				XService[requestBeforeError] = error
			} else {
				XService[requestBeforeError] = (error) => Promise.reject(error)
			}
		},
		response: (func, error) => {
			if (func) {
				XService[requestAfter] = func
			} else {
				XService[requestAfter] = (response) => response
			}
			if (error) {
				XService[requestAfterError] = error
			} else {
				XService[requestAfterError] = (error) => Promise.reject(error)
			}
		}
	}
	static[requestBefore](config) {
		return config
	}

	static[requestAfter](response) {
		return response
	}
	// 设置配置
	setConfig(func) {
		this[config] = func(this[config])
	}

	request(options = {}) {
		try {
			options.url = XService[isCompleteURL](options.url) ? options.url :
				`${this[config].baseURL}${options.url}`
			options.method = options.method || this[config].method
			options.header = {
				...this[config].header,
				...options.header
			}
			options.dataType = options.dataType || this[config].dataType
			options = {
				...options,
				...XService[requestBefore](options)
			}
			if (options.params && Object.keys(options.params).length > 0) {
				const query = parseParams(options.params)
				if (options.url.indexOf('?') === -1) {
					options.url = options.url + '?' + query;
				} else {
					options.url = options.url + '&' + query;
				}
			}
			return new Promise((resolve, reject) => {
				options.success = async res => {
					if (res.statusCode === 200) {
						resolve(XService[requestAfter](res.data))
					} else {
						try {
							const e = await XService[requestAfterError](new Error(res.errMsg));
							reject(e);
						} catch (e) {
							//TODO handle the exception
							reject(e);
						}
					}
				};
				options.fail = async error => {
					try {
						console.log(error);
						const e = await XService[requestAfterError](error);
						reject(e);
					} catch (e) {
						//TODO handle the exception
						reject(e);
					}
				}
				if (options.isFile) {
					uni.uploadFile(options)
				} else {
					uni.request(options);
				}
			})
		} catch (e) {
			console.log(e)
		}
	}
	post(url, data, params, headers = {}, flag = false) {
		return this.request({
			url,
			method: 'POST',
			data,
			params,
			header: headers,
		})
	}
	get(url, headers = {}) {
		return this.request({
			url,
			header: headers
		});
	}
	async uploadFile(url, data, files, headers = {}) {
	   return this.request({
			url,
			method: 'POST',
			data,
			files,
			isFile: true,
			header: headers,
		})
	}
}

export default new XService();
