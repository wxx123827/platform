/**
 * 用户登录
 */
//登录
$('.click_login').on('click', function() {
	if (!checkstatus) {
		layer.msg("请填写必填项")
		return;
	}
	login();

});
//注册
$('.click_register').on('click', function() {
	if (!$('.check').is(':checked')) {
		$('.agree').append(errMsg('agree', '请勾选用户协议！', false));
		// $('.agree').children(".erroragree").css('marginTop', -25);
		return;
	} else if (!checkstatus) {
		errMsg('agree', '', true);
		layer.msg("请填写必填项")
		return;
	}
	errMsg('agree', '', true);
	register();
});
//忘记密码
$('.click_forget').on('click', function() {
	if (!checkstatus) {
		layer.msg("请填写必填项")
		return;
	}
	forget();
});

function login() {
	$.ajax({
		url: baseUrl + "user/login",
		type: "post",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		data: {
			tel: $(".click_tel").val(),
			pwd: $(".click_pwd").val()
		},
		success: function(res) {
			console.log(res)
			if (res.code === SUCCESS) {
				sessionStorage.setItem("userUid", res.msg.uid);
				sessionStorage.setItem("userTel", res.msg.tel);
				sessionStorage.setItem("src", res.msg.data.src);
				if (sessionStorage.getItem("url") != "" && sessionStorage.getItem("url") != null ) {
					window.location.href = sessionStorage.getItem("url");
				}else{
					window.location.href = "index.html";
				}
				return;
			}
			layui.layer.msg(res.msg)
			return false;
		},
		error: function() {
			return false;
		}
	});
}

function register() {
	$.ajax({
		url: baseUrl + "user/register",
		type: "post",
		data: {
			tel: $(".click_tel").val(),
			pwd: $(".click_pwd").val(),
			code: $(".click_code").val()
		},
		success: function(res) {
			if (res.code === SUCCESS) {
				layui.layer.msg('注册成功,三秒后跳转到登录页', {
				  icon: 1,
				  time: 3000
				}, function(){
				 window.location.href = "./login.html";
				 return false;
				});  
			}
			layui.layer.msg(res.msg, {
				icon: 1,
				time: 3000 
			  });
			return false;
		}
	})
}

function forget() {
	$.ajax({
		url: baseUrl + "user/forgetpwd",
		type: "post",
		data: {
			tel: $(".click_tel").val(),
			pwd: $(".click_pwd").val(),
			code: $(".click_code").val()
		},
		success: function(res) {
			if (res.code === SUCCESS) {
				layui.layer.msg('修改成功,三秒后跳转到登录页', {
				  icon: 1,
				  time: 3000 
				}, function(){
				 window.location.href = "./login.html";
				 return false;
				});  
			}
			layui.layer.msg('修改成功,三秒后跳转到登录页', {
				icon: 1,
				time: 3000 
			  });
			return false;
		},
	})
}
