/**
 * 根据数据对音乐列表进行渲染
 * @param {*} data 数据
 * @param {Number} curIndex 当前的播放索引
 */
export function renderList(data, curIndex) {
    const dl = $("<dl>");
    const div = $('<div>');
    $('<dt>').text('播放列表').prependTo(dl);
    data.forEach((item, index) => {
        const dd = $('<dd>');
        dd.attr('data-index', index).text(item.name).appendTo(div).addClass(`${curIndex === index ? 'active' : ''}`)
    });
    dl.append(div);
    $('.songsList').append(dl);
}