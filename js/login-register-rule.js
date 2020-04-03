var checkstatus = false;
$('.click_tel').on("blur", function() {
	var _this = $(this);
	_this.inputCheck({
		callback: function(result) {
			if (result.length == 0) {
				$('.click_tel').after(errMsg('tel', '手机号或邮箱不能为空！', false));
			} else if (result.nbsp) {
				$('.click_tel').after(errMsg('tel', '手机号或邮箱不能含有空格！', false));
			} else if (!result.phone && !result.email) {
				$('.click_tel').after(errMsg('tel', '手机号或邮箱格式不正确！', false));
			}  else {
				errMsg('tel', '', true);
			}
		}
	});
})
$('.click_pwd').on("blur", function() {
	var _this = $(this);
	_this.inputCheck({
		callback: function(result) {
			if (result.length == 0) {
				$('.click_pwd').after(errMsg('pwd', '密码不能为空！', false));
			} else if (result.nbsp) {
				$('.click_pwd').after(errMsg('pwd', '密码不能含有空格！', false));
			} else if (result.length < 3 || result.length > 10) {
				$('.click_pwd').after(errMsg('pwd', '密码长度不符合要求，6-20位数字和字母！', false));
			} else if (!result.password) {
				$('.click_pwd').after(errMsg('pwd', '密码不符合要求，6-20位数字和字母！', false));
			} else {
				errMsg('pwd', '', true);
			}
		}
	});
})
$('.click_code').on("blur", function() {
	var _this = $(this);
	_this.inputCheck({
		callback: function(result) {
			if (result.length == 0) {
				$('.yanzheng').append(errMsg('code', '验证码不能为空！', false));
			} else if (result.nbsp) {
				$('.yanzheng').append(errMsg('code', '验证码不能含有空格！', false));
			} else {
				errMsg('code', '', true);
			}
		}
	});
})
$('.click_sure').on("blur", function() {
	var _this = $(this);
	_this.inputCheck({
		callback: function(result) {
			if ($('.click_pwd').val() != _this.val()) {
				$('.sure_pwd').append(errMsg('sure', '两次密码不一致！', false));
			} else {
				errMsg('sure', '', true);
			}
		}
	});
})
//错误信息显示
function errMsg(index, str, type) {
	checkstatus = type;
	if (type === true) {
		$('.error' + index + '').remove();
	} else {
		$('.error' + index + '').remove();
		var html = '<p class="error' + index + '">' + str + '</p>';
		return html;
	}
}
