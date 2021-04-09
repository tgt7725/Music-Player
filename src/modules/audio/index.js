import {player} from "./player";
import {music} from "./music";
import {progress} from "./progress";

function bindEvent() {
    $('li', player.controlBtns).eq(0).on('touchend', function() {
        $(this).toggleClass('liking');
        // 修改数据等操作，这里无法实现
    });

    // 上一首
    $('li', player.controlBtns).eq(1).on('touchend', () => {
        player.prev();
    });

    // 下一首
    $('li', player.controlBtns).eq(3).on('touchend', () => {
        player.next();
    });

    // 暂停/播放控制按钮
    $('li', player.controlBtns).eq(2).on('touchend', function () {
        if (music.status === 'play') {
            $(this).removeClass('playing');
            music.pause();
            progress.stop();
            player.imgStopRotate();
        } else {
            $(this).addClass('playing');
            music.play();
            progress.update();
            player.imgRotate();
        }
    });

    // 列表滑入
    $('li', player.controlBtns).eq(4).on('touchend', function () {
        $('.songsList').slideDown()
    });

    // 列表切换歌曲
    $('.songsList').on('touchend', 'dd', function () {
        var index = $(this).data('index');
        if (index === player.curIndex) {
            return;
        }
        music.status = 'play';
        player.loadMusic(index);
        $('.songsList').slideUp();
        music.play();
    });

    // 隐藏播放列表
    $('.container').on('touchend', function (e) {
        if (e.target !== $('li', player.controlBtns).eq(4)[0]) {
            $('.songsList').slideUp();
        }
    });

    // 跳转到点击的进度条位置
    $('.drag').on('click', function(e) {
        if(e.target !== $('.dot')[0]) {
            progress.moveTo(e.offsetX);
            music.playTo(progress.currentTime)
        }
    })

    // console.log($('.drag').width());
    progress.drag(0, $('.drag').width());

}
// 页面加载完毕后才调用函数，避免DOM未加载完便获取其宽高获取不到
$(document).ready(bindEvent);