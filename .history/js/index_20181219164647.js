(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
$(function () {
    


    //选择男女   0:男  1: 女
    $('.card-box').on('click','div',function(){
        var $this = $(this);
        $this.addClass('act').siblings().removeClass('act');
        if($('.card-1').hasClass('act')){
            sessionStorage.setItem('sex',0);
        }else if($('.card-2').hasClass('act')){
            sessionStorage.setItem('sex',1);
        }
    });
    //开始占卜
    $('#start').on('click',function(){
        if($('.card-1').hasClass('act') || $('.card-2').hasClass('act')){
            window.location.href = './fp.html';
        }
    });
    
    //翻牌
    $('#flip-box').once('click','li',function(){
        var $this = $(this);
        $this.addClass('act').siblings().removeClass('act');
        var sex = sessionStorage.getItem('sex');
        var random = Math.round(Math.random()*(4-1)+1);
        if(sex === '0'){
            $this.addClass('b'+ random);
        }else if(sex === '1'){
            $this.addClass('g'+ random);
        }
    });

    //移动手机号码验证
    function istel(tel) {
        var rtn = false;
        //移动号段验证
        var regtel = /^((13[4-9])|(15([0-2]|[7-9]))|(18[2|3|4|7|8])|(178)|(147))[\d]{8}$/;
        if (regtel.test(tel)) {
            rtn = true;
        }
        return rtn;
    }
    function test() {
        var phone = $("#tel").val();
        if (istel(phone)) {
            $('#message').hide();
        }
        else {
            $('#message').show();
        }
    }
    //手机号输入框
    $('#tel').on('input',function(){
        $('#message').hide();
    });
    //领奖按钮
    $('#get-btn').on('click',function(){
        test();
    });

    //显示遮罩层
    function showMask(){
        $("#mask").css("height",$(document).height());
        $("#mask").css("width",$(document).width());
        $("#mask").show();
    }
    //隐藏遮罩层
    function hideMask(){
        $("#mask").hide();
    }
});