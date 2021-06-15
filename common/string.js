import common from './common.js';
/**
 *  用于更改原始方法
 *  给原生类型添加方法
 * */
Number.prototype.toFixed = function(length) {
	return common.toFixed(this, length);
}
String.prototype.toFixed = function(length) {
	return common.toFixed(this, length);
}
Number.prototype.toFloorFixed = function(length) {
	return common.toFloorFixed(this, length);
}
String.prototype.toFloorFixed = function(length) {
	return common.toFloorFixed(this, length);
}