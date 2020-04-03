layui.config({
	base: './static/cropper/'
}).use(['laypage', 'upload', 'croppers'], function () {
	var laypage = layui.laypage;
	var upload = layui.upload;
	var form = layui.form;
	var croppers = layui.croppers;
	croppers.render({
		elem: '#updateSrc',
		saveW: 150,
		saveH: 150,
		mark: 1 / 1,
		area: '900px',
		url: baseUploadUrl,
		done: function (url) { //上传完毕回调
			updateSrc(url);
		}
	});

	function updateSrc(src) {
		$.ajax({
			url: baseUrl + "personal/updateUserSrc",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			data: {
				src: src
			},
			success: function (res) {
				if (res.code === SUCCESS) {
					sessionStorage.setItem("src", src);
					$(document).find('#userpic').attr('src', baseImgUrl + src);
					layer.msg("上传成功", {
						icon: 1
					});
					layer.closeAll('page');
				}
			}
		})
	}
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
		var types = sessionStorage.getItem("types");
		if (types != null) {
			$('.invoice_title > button').each(function (i) {
				if (String(i) === types) {
					$('.invoice_title > button').removeClass('active');
					$(this).addClass("active")
				}
			})
		}
		if (types === null || types == '0') {
			getCollect(1, 10);
		} else {
			getCollectByType(1, 10, types)
		}
		var data = JSON.parse(sessionStorage.getItem("collect"))
		$(document).ready(function () {
			$('.head').load("personal_head.html");
			$('.nav').load("personal_nav.html", function (response, status, xhr) {
				$(document).find(".center_middle").html('<span>个人中心</span>')
			});
			$('.foot').load("foot.html");
		})

	})


	function getCollect(num, size) {
		$.ajax({
			url: baseUrl + "personal/getAllCollect",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			data: {
				num: num,
				size: size
			},
			async: false,
			success: function (res) {
				if (res.code === SUCCESS) {
					var result = res.msg;
					laypage.render({
						elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
						count: result.totalRow, //数据总数，从服务端得到
						limit: result.pageSize,
						curr: result.pageNumber,
						jump: function (obj, first) {
							if (!first) {
								getCollect(obj.curr, obj.limit);
							}
						}
					});
					inithtml(result)
				}
			}
		})
	}

	function getCollectByType(num, size, type) {
		$.ajax({
			url: baseUrl + "personal/getCollectByTypes",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			data: {
				num: num,
				size: size,
				types: type
			},
			async: false,
			success: function (res) {
				console.log(res)
				if (res.code === SUCCESS) {
					var result = res.msg;
					laypage.render({
						elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
						count: result.totalRow, //数据总数，从服务端得到
						limit: result.pageSize,
						curr: result.pageNumber,
						jump: function (obj, first) {
							if (!first) {
								getCollectByType(obj.curr, obj.limit, type)
							}
						}
					});
					inithtml(result)
				} else {
					$("#content_box").html("无数据")
				}
			}
		})
	}

	function inithtml(result) {
		$(".all>span").text(result.count.all);
		$(".equipment>span").text(result.count.in);
		$(".lab>span").text(result.count.lab);
		$(".consumable>span").text(result.count.co);
		$(".skill>span").text(result.count.kno);
		var html = "";
		$(result.list).each(function () {
			html += '<div class="favorite_detail">';
			html += '<div class="invoice_img">';
			html += '<img src="' + baseImgUrl + this.src + '">';
			html += '</div>';
			html += '<div class="invoice_left">';
			switch (this.types) {
				case "1":
					html += '<ul>';
					html += '<h3>仪器名称：' + this.name + '</h3>';
					html += '<li>仪器型号：' + this.model + '</li>';
					html += '<li>仪器类别：' + this.classifyname + '</li>';
					html += '<li>位置：' + this.address + '</li>';
					html += '</ul>';
					break;
				case "2":
					html += '<ul>';
					html += '<h3>实验室名称：' + this.name + '</h3>';
					html += '<li>实验室类别：' + this.classifyname + '</li>';
					html += '<li>位置：' + this.address + '</li>';
					html += '</ul>';
					break;
				case "3":
					html += '<ul>';
					html += '<h3>耗材名称：' + this.name + '</h3>';
					html += '<li>耗材品牌：' + this.brand + '</li>';
					html += '<li>耗材类别：' + this.classifyname + '</li>';
					html += '<li>位置：' + this.address + '</li>';
					html += '</ul>';
					break;
				case "4":
				case "5":
					html += '<ul>';
					html += '<h3>知识名称：' + this.name + '</h3>';
					html += '<li>知识类别：' + this.classifyname + '</li>';
					html += '</ul>';
					break;
			}
			html += '</div>';
			html += '<div class="invoice_right">';
			html += '<div class="default" onClick=detail(\'' + String(this.goodsuid) + '\')>查看详情</div>';
			html += '<div class="addUserCart" value=\'' + String(this.goodsuid) + '\'>加入清单</div>';
			html += '<div class="delete" onClick=removeCollect(\'' + String(this.goodsuid) + '\')>取消收藏</div>';
			html += '</div></div>'
		})
		$("#content_box").html(html)
	}

	$('.invoice_title > button').click(function (event) {
		if ($(this).index() == 0) {
			getCollect(1, 10);
		} else {
			getCollectByType(1, 10, String($(this).index()))
		}
		$('.invoice_title > button').removeClass('active');
		$(this).addClass('active');
		sessionStorage.setItem("types", $(this).index());
		return false;
	})
	$(document).on("click", ".addUserCart", function () {
		$.ajax({
			url: baseUrl + "cart/addGoodsToCart",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			data: {
				goodsuid: $(this).attr("value")
			},
			success: function (res) {
				if (res.code === SUCCESS) {
					layui.layer.msg("添加成功", {
						type: 1,
						time: 2000
					})
					return false;
				}
				layui.layer.msg("添加失败", {
					type: 1,
					time: 2000
				})
				return false;
			}
		})
	})
})