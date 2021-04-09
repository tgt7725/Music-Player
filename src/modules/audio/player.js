import {
    music
} from './music'
import {
    render
} from "../render/index";
import getDataList from '../until/getData'
import {
    renderList
} from "../render/render-list";
import {
    progress
} from "./progress";
import {
    Drag
} from "../until/drag";

class Player {
    constructor(url) {
        this.curIndex = 0;
        this.dataList = [];
        this.rotateTime = null;
        this.rotateDeg = 0;
        this.drag = new Drag($('.dot'));
        this.getDom();
        this.getData(url);
    }

    // 获取DOM元素
    getDom() {
        this.img = $('.imgBox img');
        this.controlBtns = $('.controlBtns');
    }

    /**
     * 获取数据
     * @param {String} url 请求路径
     */
    getData(url) {
        getDataList(url).then(resp => {
            this.dataList = resp;
            // console.log(this.dataList);
            this.loadMusic();
            renderList(resp, this.curIndex);
        })
    }

    /**
     * 根据歌曲索引加载歌曲（不播放）
     * @param {Number} index 歌曲索引（默认为0）
     */
    loadMusic(index = 0) {
        this.curIndex = index;
        this.imgStopRotate(); 
        render(this.dataList[index], () => {
            this.rotateDeg = 0;
        });
        music.load(this.dataList[index].audioSrc);
        progress.setTotalTime(index);
        progress.setCurrentTime();
        this.changeActive();
        music.end(() => {
            this.getMusic();
        });
        // 当前是播放状态需要做的操作
        if (music.status === 'play') {
            $("li", this.controlBtns).eq(2).addClass('playing');
            this.imgRotate();
            progress.update();  // 放这里的原因：兼容了列表的点击
        }
    }

    /**
     * 播放下一首
     */
    next() {
        return this.getMusic(1)
    }

    /**
     * 播放上一首
     */
    prev() {
        return this.getMusic(-1)
    }

    /**
     * 根据val值获取上一首/下一首的歌曲
     * @param {Number} val 索引值加的值，上一首则为-1，下一首则为1（默认值）
     */
    getMusic(val = 1) {
        this.curIndex = (this.curIndex + val + this.dataList.length) % this.dataList.length
        music.status = 'play';
        this.loadMusic(this.curIndex);
        music.play();
    }

    /**
     * 专辑图片的旋转
     */
    imgRotate() {
        this.imgStopRotate();
        this.rotateTime = setInterval(() => {
            this.rotateDeg += .2;
            this.img.css('transform', `rotate(${this.rotateDeg}deg)`)
        }, 1000 / 60)
    }

    /**
     * 停止旋转专辑图片
     */
    imgStopRotate() {
        clearInterval(this.rotateTime);
        this.rotateTime = null;
    }

    /**
     * 改变播放列表中的激活歌曲
     */
    changeActive() {
        $('dd.active').removeClass('active');
        $('dd').eq(this.curIndex).addClass('active')
    }
}

const url = '../mock/data.json';
export const player = new Player(url);