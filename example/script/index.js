/**
 * Created by Liujx on 2017-06-09 10:42:06
 */
$(function() {
    var speed = 20;
    $("#lottery a").luckyDraw({
        id: 'lottery',
        prize: 3,
        speed: speed,
        cycle: 80,
        beforeSend: function() {
            console.log('开始啦！');
        },
        success: function() {
            console.log('走完啦！');
        }
    });

});
