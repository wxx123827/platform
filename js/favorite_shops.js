layui.config({
	base: './static/cropper/'
}).use(['laypage', 'upload', 'croppers', 'rate'], function () {
	var laypage = layui.laypage;
	var upload = layui.upload;
	var form = layui.form;
	var rate = layui.rate;
	var croppers = layui.croppers;
	//获取头像
	$(function () {
		$.ajax({
			url: baseUrl + "personal/getUserInfo",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			success: function (res) {
				if (res.code === SUCCESS) {
					form.render();
				}
			}
		})
	})
	$(document).ready(function () {
		$('.head').load("personal_head.html");
		$('.nav_area').load("personal_nav.html", function (response, status, xhr) {
			$(document).find(".center_middle").html('<span>个人中心</span>')
		});
		$('.foot').load("foot.html");
		var html = "";
		if (userSrc === "" || userSrc === null) {
			html += '<img id="userpic" src="imgs/admin_icon.png" style="width:59px;height:59px;border-radius: 50%">';
		} else {
			html += '<img id="userpic" src="' + baseImgUrl + userSrc + '" style="width:59px;height:59px;border-radius: 50%">';
		}
		$(".face").before(html);
		$(".select_tab a").on("click", function () {
			$(".select_tab a").css({
				"background": "#f9f9f9"
			});
			$(".select_tab a").css("color", "#666666");
			$(this).css({
				"background": "#ffffff"
			});
			$(this).css("color", "#247dd0");
		})
		var types = sessionStorage.getItem("types");
		if (types != null) {
			$('.invoice_title > button').each(function (i) {
				if (String(i) === types) {
					$('.invoice_title > button').removeClass('active');
					$(this).addClass("active")
				}
			})
		}
		//店铺评分转换
		rate.render({
			elem: '#star_level',
			value: 5,
			readonly: true,
			half: true,
			theme: '#e31f1f'
		});
		// if (types === null || types == '0') {
		// 	getCollect(1, 10);
		// } else {
		// 	getCollectByType(1, 10, types)
		// }
		var data = JSON.parse(sessionStorage.getItem("collect"))
	})
	
	//置顶
	$(".shops_detail").on('click', '.set_top', function (event) {
		event.preventDefault;
		var parent = $(this).parent().parent().parent().parent();
		var parents = $(this).parent().parents("#content_box");
		var len = parents.children().length;
		if (parent.index() == 0) {
			alert("已经置顶！");
			return false;
		} else {
			parents.prepend(parent); //把当前元素，放在最前边
		}
	})

	$('.invoice_title > button').click(function (event) {
		// if ($(this).index() == 0) {
		// 	getCollect(1, 10);
		// } else {
		// 	getCollectByType(1, 10, String($(this).index()))
		// }
		$('.invoice_title > button').removeClass('active');
		$(this).addClass('active');
		sessionStorage.setItem("types", $(this).index());
		return false;
	})
})