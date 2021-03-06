$(document).ready(function() {
	checkUserLogin();

})

//检查用户是否登录
function checkUserLogin() {
	var headStr;
	headStr='<a href="index.html"><img src="imgs/home_page.png">科研屋首页</a>';
	if (userUid === "null" || userUid === null) {
		headStr += '<a href="login.html">你好，请登录</a>';
		headStr += '<a class="register" href="register.html">免费注册</a>';
		headStr += '<a class="register" href="settle_select.html">我要入驻</a>';
		// headStr += '<a class="register" href="#">帮助中心</a>';
	} else {
		checkUserJoinAjax();
		headStr += '<a href="#" class="usertel">你好，' + userTel + '</a>';
		if (userJoinStatus) {
			headStr += '<a class="register" href="my_release.html">我的发布</a>';
		} else {
			headStr += '<a class="register" href="settle_select.html">我要入驻</a>';
		}
		headStr += '<a class="register" href="#">需求清单</a>';
		// headStr += '<a class="register" href="#">帮助中心</a>';
	}
	$('#nologin').html(headStr);
}

$(document).on("mouseenter", ".usertel", function () {
	var str;
	str = '<a href="essential_information.html" class="personal">个人中心</a>'
	str += '<a href="#" class="logout">退出</a>'
	$(".usertel").prepend(str)
})
$(document).on("mouseleave", ".usertel", function () {
	$(".personal").remove();
	$(".logout").remove()
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

