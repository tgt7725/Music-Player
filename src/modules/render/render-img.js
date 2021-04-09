import gaussBlur from '../until/gaussBlur'

/**
 * 处理高斯模糊
 * @param {String} src 高斯模糊图片路径
 * @param {*} ele 背景DOM
 */
function blurImg(src, ele) {
	var canvas = document.createElement('canvas');
	ele = ele || document.body;

	// 这两个值越小，图片就会越模糊
	canvas.width = 150;
	canvas.height = 150;

	var context = canvas.getContext('2d');

	// 把img对象放到了这里
	var img = new Image();
	img.src = src;
	img.onload = function () {
		context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
		var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
		var gaussData = gaussBlur(imgData);
		context.putImageData(gaussData, 0, 0);
		var imgSrc = canvas.toDataURL();

		ele.style.backgroundImage = 'url(' + imgSrc + ')';
		ele.style.backgroundSize = 'cover';
	}
}

/**
 * 
 * @param {String} src 图片路径
 * @param {Function} callback 图片路径加载完成后的回调函数
 */
export function renderImg(src, callback = () => {}) {
    $('.imgBox img').attr('src', src).on('load', callback);  // 更改专辑唱片
    blurImg(src, $('.container')[0]);
}
