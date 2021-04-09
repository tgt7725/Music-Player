/**
 * 将时间转换为xx:xx的形式
 * @param {String} time 秒数字符串
 */
export function formatTime(time) {
    var minute = (parseInt(time / 60) + '').padStart(2, '0')
    var second = (Math.floor(time % 60) + '').padStart(2, '0')
    return `${minute}:${second}`
}