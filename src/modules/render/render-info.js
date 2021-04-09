/**
 * 根据当前播放音乐的信息对象渲染中间的音乐信息
 * @param {Object} data 当前播放的音乐信息对象
 */
export function renderInfo(data) {
    $('.title').html(data.name);
    $('.singer').html(data.singer);
    $('.album').html(data.album);
}