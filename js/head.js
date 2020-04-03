 //导航栏固定定位
 $(function() { 
    var elm = $('#search_container'); 
    var startPos = $(elm).offset().top; 
    $.event.add(window, "scroll", function() { 
        var p = $(window).scrollTop(); 
        $(elm).css('position',((p) > startPos) ? 'fixed' : 'static'); 
		$(elm).css('top',((p) > startPos) ? '0px' : ''); 
		
    }); 
}); 

$(document).ready(function () {
	// userUid = "1";
	checkUserLogin();

})

//检查用户是否登录
function checkUserLogin() {
	var headStr;
	if (userUid === "null" || userUid === null) {
		headStr = '<a href="index.html" class="home_page"><img src="imgs/homepage.png">科研屋首页</a>'
		headStr += '<a href="login.html">你好，请登录</a>';
		headStr += '<a class="register" href="register.html">免费注册</a>';
		headStr += '<a class="register" href="settle_select.html">我要入驻</a>';
		// headStr += '<a class="register" href="#">帮助中心</a>';
	} else {
		checkUserJoinAjax();
		headStr = '<a href="index.html" class="home_page"><img src="imgs/homepage.png">科研屋首页</a>'
		headStr += '<a href="#" class="usertel" style="height:50px;display:inline-block">你好，' + userTel + '</a>';
		if (userJoinStatus) {
			headStr += '<a class="register" href="my_release.html">我的发布</a>';
		} else {
			headStr += '<a class="register" href="settle_select.html">我要入驻</a>';
		}
		headStr += '<a class="register" href="requirement_list.html">需求清单</a>';
		// headStr += '<a class="register" href="#">帮助中心</a>';
	}
	$('#nologin').html(headStr);
}

$(document).on("mouseenter", ".usertel", function () {
	var str;  
	str = '<a href="essential_information.html" class="personal" style="display:inline-block;position:absolute;top:40px;left:130px;width:110px;background-color:#f5f5f5;color:#aaa">个人中心</a>'
    str += '<a href="#" class="logout" style="display:inline-block;position:absolute;top:75px;left:130px;width:110px;background-color:#f0f0f0;color:#aaa;z-index:999999">退出</a>'
	$(".usertel").prepend(str)
})
$(document).on("mouseleave", ".usertel", function () {
	$(".personal").remove();
	$(".logout").remove();
})
$(document).on('click', '.logout', function() {
	$.ajax({
		url: baseUrl + "user/logout",
		success: function(res) {
			if (res.code === SUCCESS) {
				sessionStorage.setItem("userUid", null);
				sessionStorage.setItem("userTel", null);
				sessionStorage.clear();
				window.location.href = "./login.html";
				return false;
			}
		}
	})
})