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
    //查看更多
    var flag = true,
        $list = $('#list');
    $('#more').on('click', function () {
        if(flag){
            $list.css('height','auto');
            $list.find('li:not(:nth-child(1))').css('height','auto').find('div:nth-child(3) p').css('height','auto');
            $list.find('li:not(:nth-child(1))').children('div:not(:nth-child(3))').height($list.find('li:not(:nth-child(1))').height());
            $(this).find('p').text('收起');
            $(this).find('span').addClass('act');
            flag = false;
        }else if(!flag){
            $list.css('height','136px');
            $list.find('li:not(:nth-child(1))').css('height','85px').find('div:nth-child(3) p').css('height','100%');
            $list.find('li:not(:nth-child(1))').children('div:not(:nth-child(3))').height($list.find('li:not(:nth-child(1))').height());
            $(this).find('p').text('更多');
            $(this).find('span').removeClass('act');
            flag = true;
        }
    });
    //必填项为空显示提示文字
    $('#userInfo').on('blur','input',function () {
        if($(this).val() === ''){
            $(this).parent().next('p').show();
        }else{
            $(this).parent().next('p').hide();
        }
    });
    $('#checkInfo').on('blur',function () {
        if($(this).val() === ''){
            $(this).parent().next().next('p').show();
        }else{
            $(this).parent().next().next('p').hide();
        }
    });
    //下拉提示文字颜色
    var unSelected = "#777";
    var selected = "#333";
    $(function () {
        $("select").css("color", unSelected);
        $("option").css("color", selected);
        $("select").change(function () {
            var selItem = $(this).val();
            if (selItem === $(this).find('option:first').val()) {
                $(this).css("color", unSelected);
            } else {
                $(this).css("color", selected);
            }
        });
    });
    //协议弹窗
    $('#agreementBtn').on('click', function () {
        $('#agreement').show();
        showMask();
    });
    $('#close').on('click', function () {
        $(this).parent().hide();
        hideMask();
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