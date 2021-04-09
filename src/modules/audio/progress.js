import {
    music
} from "./music";
import {
    player
} from "./player";
import {
    formatTime
} from "../until/formatTime";

class Progress {
    constructor() {
        this.timer = null;
        this.currentTime = 0;
    }

    /**
     * 获取指定索引的音乐的总时长（单位是秒）
     */
    getTotalTime(index) {
        return player.dataList[index].duration;
    }

    /**
     * 根据指定索引设置总时长的格式
     */
    setTotalTime(index) {
        const time = this.getTotalTime(index);
        $('.totalTime').text(formatTime(time));
    }

    /**
     * 根据指定的时间设置当前播放时长
     * @param {*} time 指定的时间，默认为当前播放时间
     */
    setCurrentTime(time = music.getCurTime()) {
        $('.currentTime').text(formatTime(time));
        this.changeProgressBar(time); // 当前时间改变，进度条也要跟着改变
    }

    /**
     * 更新当前时间（更新左侧的当前播放时长）
     */
    update() {
        this.stop();
        this.timer = setInterval(() => {
            this.setCurrentTime();
        }, 1000 / 16);
    }

    /**
     * 停止更新当前时间
     */
    stop() {
        clearInterval(this.timer);
        this.timer = null;
    }

    /**
     * 根据当前的播放时间更新进度条
     * @param {*} currentTime 当前播放时间，默认为0
     */
    changeProgressBar(currentTime = 0) {
        const totalTime = this.getTotalTime(player.curIndex);
        const pre = currentTime / totalTime;
        // 设置白色进度条的宽度
        $('.whiteProgress').width(Math.floor(pre * 100) + '%');
        const dis = $('.dot').offsetParent().width() * pre;
        // 设置小点的位置
        $('.dot').css('transform', `translateX(${dis}px)`);
    }

    /**
     * 移动小点到指定的位置并更新当前播放时间
     * @param {*} position 最终小点的位置
     */
    moveTo(position) {
        const pre = position / $('.drag').width();
        const total = this.getTotalTime(player.curIndex);
        const time = Math.floor(pre * total);
        this.setCurrentTime(time);
        $('.dot').css('transform', `translateX(${Math.floor(position)}px)`);
        this.currentTime = time;
    }

    /**
     * 进度条的拖拽
     * @param {Number} min 拖拽的最小边界
     * @param {Number} max 拖拽的最大边界
     */
    drag(min = 0, max) {
        var that = this;
        player.drag.drag(min, max, function start() {
            that.stop();
        }, function move(newLeft) {
            that.moveTo(newLeft);
            that.stop();
        }, function end() {
            music.playTo(that.currentTime)
            that.update();
        });
    }
}

export const progress = new Progress();