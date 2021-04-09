var startLeft = 0,
    currentLeft = 0,
    dis = 0;
/**
 * 拖拽类
 */
export class Drag {
    constructor(ele) {
        this.ele = ele;
        this.dragOver = true;
    }

    /**
     * 开始拖拽（按下那一瞬间）
     * @param {*} callback 回调函数
     */
    start(callback) {
        this.dragOver = false;
        this.ele.on('touchstart', function (e) {
            e = e.targetTouches[0];
            startLeft = e.clientX;
            currentLeft = $(this)[0].style.transform.replace('translateX(', '').replace('px)', '') || 0;
            callback && callback();
        });
    }

    /**
     * 拖拽过程
     * @param {*} min 拖拽的最小边界
     * @param {*} max 拖拽的最大边界
     * @param {*} callback 回调函数
     */
    move(min, max, callback) {
        this.ele.on('touchmove', function (e) {
            e = e.targetTouches[0];
            dis = e.clientX - startLeft;
            let newLeft = +(currentLeft) + dis;
            if (newLeft < min) {
                newLeft = min;
            } else if (newLeft > max) {
                newLeft = max;
            }
            callback && callback(newLeft);
        })
    }

    /**
     * 拖拽结束
     * @param {*} callback 回调函数
     */
    end(callback) {
        this.ele.on('touchend', function (e) {
            this.dragOver = true;
            callback && callback();
        })
    }

    /**
     * 拖拽API
     * @param {Number} min 拖拽的最小边界
     * @param {Number} max 拖拽的最大边界
     * @param {Function} cb1 拖拽开始时回调函数
     * @param {Function} cb2 拖拽过程中回调函数
     * @param {Function} cb3 拖拽结束后回调函数
     */
    drag(min = 0, max, cb1, cb2, cb3) {
        this.start(cb1);
        this.move(min, max, cb2);
        this.end(cb3);
    }
}