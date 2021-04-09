import {renderImg} from "./render-img";
import {renderInfo} from "./render-info";

/**
 * 
 * @param {Object} data 当前播放音乐的信息对象
 * @param {Function} callback 渲染结束后的回调函数
 */
export function render(data, callback = () => {}) {
    renderImg(data.image, () => {
        renderInfo(data)
        data.isLike && $('.controlBtns li').eq(0).addClass('liking'); // 判断是否是喜欢的音乐
        callback();
    });
}


