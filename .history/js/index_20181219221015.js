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
    //首页活动规则
    $('.rule-btn').on('click',function(){
        $('html,body').css('background','#ffbf4f');
        $('.sy').hide();
        $('.rule').show();
    });
    //开始占卜
    $('#start').on('click',function(){
        var sex = sessionStorage.getItem('sex');
        if(sex === '0'){
            $('#sex').attr('class','boy');
        }else if(sex === '1'){
            $('#sex').attr('class','girl');
        }
        if($('.card-1').hasClass('act') || $('.card-2').hasClass('act')){
            $('html,body').css('background','#ffbf4f');
            $('.card-box').children('div').removeClass('act');
            $('.sy').hide();
            $('.fp').show();
        }
    });
    
    //翻牌
    var flag = true;
    $('#flip-box').on('click', 'li', function () {
        if (flag) {
            flag = false;
            var $this = $(this);
            $this.addClass('act').siblings().removeClass('act');
            var sex = sessionStorage.getItem('sex');
            var random = Math.round(Math.random() * (4 - 1) + 1);
            if (sex === '0') {
                $this.attr('class', 'act b' + random);
            } else if (sex === '1') {
                $this.attr('class', 'act g' + random);
            }
            showMask();
            return false;
        }
    });

    //再来一次按钮
    $('.again').on('click',function(){
        flag = true;
        $('html,body').css('background','#ffc867');
        sessionStorage.removeItem('sex');
        $(this).parent('div').parent('li').attr('class','');
        $('.sy').show().siblings().hide();
        hideMask();
        return false;
    });
    //领奖按钮
    $('.lj-btn').on('click',function(){
        $('#flip-box').children('li').attr('class','');
        $('.fp').hide();
        hideMask();
        $('.lj').show();
        return false;
    });
    //关闭翻牌弹窗
    $('.close').on('click',function(){
        flag = true;
        $(this).parent().parent().attr('class','');
        hideMask();
        return false;
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
            $('#box').addClass('act');
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

    //了解一下按钮 
    $('.wangka').on('click',function(){
        $('html,body').css('background','#ffbf4f');
        $('.wk').show().siblings().hide();
    });

    //->MUSIC
    wx.config({
        debug: false
    });
    wx.ready(function () {
        function audioAutoPlay(id){
            var audio = document.getElementById(id),
                play = function(){
                    audio.play();
                    document.removeEventListener("touchstart",play, false);
                };
            audio.play();
            document.addEventListener("WeixinJSBridgeReady", function () {
                play();
            }, false);
            document.addEventListener('YixinJSBridgeReady', function() {
                play();
            }, false);
            document.addEventListener("touchstart",play, false);
        }
        audioAutoPlay('musicAudio');
    });
    /* ~function () {
        var musicMenu = document.getElementById('musicMenu'),
            musicAudio = document.getElementById('musicAudio');

        musicMenu.addEventListener('click', function () {
            if (musicAudio.paused) {//->暂停
                musicAudio.play();
                musicMenu.className = 'music move';
                return;
            }
            musicAudio.pause();
            musicMenu.className = 'music';
        }, false);

        function controlMusic() {
            musicAudio.volume = 0.1;
            musicAudio.play();
            musicAudio.addEventListener('canplay', function () {
                musicMenu.style.display = 'block';
                musicMenu.className = 'music move';
            }, false);
        }
        window.setTimeout(controlMusic, 1000);
    }(); */




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



    //-------
    (function(){
        var can = document.getElementById('can');
		var con = can.getContext('2d');
		var pw,ph,cw,ch;
		(function(){

			var setAttr = function(){
				pw = window.innerWidth;
				ph = window.innerHeight;
				cw = pw*2;
				ch = ph *2;
				can.width = cw;
				can.height = ch;
				//can.setAttribute("style","width:"+pw+"px; height:"+ph+"px;");
			}
			//window.addEventListener('resize', setAttr, false);
			setAttr();
		})();	
			
		var us = [];

		for (var i = 0; i < cw*0.6; i++) {
			var a = new me();
			us.push(a);
		}

		go();
		function go(){
			con.clearRect(0,0,cw,ch);
			for (var i in us) {
                us[i].image.src="../images/xqb.png"
				us[i].draw();
			}
			requestAnimationFrame(go);
		}

		function me(){
			var that = this;
			function makeMe (){
				that.x = cw * Math.random();
				that.y = ch+ch* Math.random();
				that.opacity = 0.3+Math.random()*0.5;
				that.w = 10 * Math.random()+10;	
				that.s =1+4* Math.random();			
				that.c1 = Math.ceil(Math.random()*255);
				that.c2 = Math.ceil(Math.random()*255);
				that.c3 =Math.ceil( Math.random()*255);				
			}

			makeMe();



			this.draw = function(){

				if (this.opacity < 0) {
					makeMe();
				}
				this.y-=this.s;
				this.opacity-= 0.0005;
				con.beginPath();
				con.arc(this.x,this.y,this.w,0,2*Math.PI);
				con.fillStyle = "rgba("+this.c1+","+this.c2+","+this.c3+","+this.opacity+")";
				con.fill();
			}
		}
    })();
});