class Music {
    constructor() {
        this.status = 'pause';
        this.audio = new Audio();
    }

    /**
     * 加载音乐
     * @param {*} src 音乐路径
     */
    load(src) {
        this.audio.src = src;
        this.audio.load();
    }

    /**
     * 播放音乐
     */
    play() {
        this.status = 'play';
        this.audio.play();
    }

    /**
     * 暂停乐
     */
    pause() {
        this.status = 'pause';
        this.audio.pause();
    }

    /**
     * 音乐结束时，回调函数
     * @param {Function} callback 音乐结束时的回调函数
     */
    end(callback) {
        this.audio.onended = callback;
    }

    /**
     * 跳转播放指定秒数的音乐
     * @param {Number} time 
     */
    playTo(time) {
        this.audio.currentTime = time;
    }

    /**
     * 获取当前音乐播放的秒数
     */
    getCurTime() {
        return this.audio.currentTime;
    }
}

export const music = new Music();