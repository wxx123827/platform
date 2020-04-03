$('.verify_code').on('click', function() {
	var tel = $('.click_tel').val();
	if (tel === "") {
		$('.click_tel').after(errMsg('code', '手机号不能为空', false));
		return;
	}
	if (!this.b) {
		errMsg('code', '', true)
		getSmsCode(tel);
	}
})
//倒计时
function setTimer() {
	var time = 60;
	var timers = setInterval(function() {
		time--;
		if (time <= 0) {
			time = 0;
			console.log(time);
			$('.verify_code').eq(0)[0].b = false;
			$('.verify_code').val('获取验证码');
			clearInterval(timers);
			return false;

		}
		$('.verify_code').val(time + '秒后重新获取');
		if (time == 1) {
			$(".verify_code").css("backgroundColor", "#62b0ed");
		} else {
			$(".verify_code").css("backgroundColor", "#ccc");
		}
	}, 1000)
}

function getSmsCode(tel) {
	$.ajax({
		url: baseUrl + 'user/sendSms',
		type: 'post',
		data: {
			tel: tel,
		},
		success: function(e) {
			if (200 === e.code) {
				setTimer();
				errMsg('code', "", true)
				this.b = true;
			} else {
				$('.yanzheng').append(errMsg('code', e.msg, false));
			}
		}
	})
}
