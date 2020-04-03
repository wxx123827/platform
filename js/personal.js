/**
 * 个人入驻
 */
$(document).ready(function() {
	$('.head').load("head.html");
	$('.search').load("search.html");
	$('.foot').load("foot.html");
})

layui.use(['form', 'layedit', 'laydate', 'upload'], function() {
	var $ = layui.jquery,
		upload = layui.upload,
		form = layui.form,
		layer = layui.layer,
		layedit = layui.layedit,
		laydate = layui.laydate;

	if (sessionStorage.getItem("data") != null) {
		var data = JSON.parse(sessionStorage.getItem("data"));
		var result = "";
		if (data.personaljoininfo != null) {
			result = data.personaljoininfo;
			$("#cardfrontimg").attr("src", baseImgUrl + result.cardfront);
			$("#cardreverseimg").attr("src", baseImgUrl + result.cardreverse)
			form.val("personalform", {
				"infouid": data.joinuid,
				"name": result.name,
				"tel": result.tel,
				"email": result.email,
				"skillinfo": result.skillsinfo,
				"cardfront": result.cardfront,
				"cardreverse": result.cardreverse
			});
			layui.form.render();
		}
	}
    
	var cardfront = upload.render({
		elem: '#cardfrontdiv',
		url: baseUploadUrl,
		data: {
			uid: userUid
		},
		before: function(obj) {
			//预读本地文件示例，不支持ie8
			obj.preview(function(index, file, result) {
				$('#cardfrontimg').attr('src', result); //图片链接（base64）
			});
		},
		done: function(res, index, upload) {
			//如果上传失败
			if (res.code > 0) {
				return layer.msg('上传失败');
			}
			form.val("personalform", {
				"cardfront": res.src
			})
			//上传成功
		},
		error: function() {
			//演示失败状态，并实现重传
			var demoText = $('#cardfronterrorText');
			demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
			demoText.find('.demo-reload').on('click', function() {
				cardfront.upload();
			});
		}
	});
	var cardreverse = upload.render({
		elem: '#cardreversediv',
		url: baseUploadUrl,
		data: {
			uid: userUid
		},
		before: function(obj) {
			//预读本地文件示例，不支持ie8
			obj.preview(function(index, file, result) {
				$('#cardreverseimg').attr('src', result); //图片链接（base64）
			});
		},
		done: function(res, index, upload) {
			//如果上传失败
			if (res.code > 0) {
				return layer.msg('上传失败');
			}

			form.val("personalform", {
				"cardreverse": res.src
			})
			//上传成功
		},
		error: function() {
			//演示失败状态，并实现重传
			var demoText = $('#cardreverseerrorText');
			demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
			demoText.find('.demo-reload').on('click', function() {
				cardreverse.upload();
			});
		}
	});
	//自定义验证规则
	form.verify({
		name: function(value) {
			if (value.length == 0) {
				return '请输入姓名';
			}
		},
		tel: function(value) {
			if (value.length == 0) {
				return "请输入联系电话";
			} else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))) {
				return "电话格式有误"
			}
		},
		skillinfo: function(value) {
			if (value.length == 0) {
				return '请输入个人描述';
			}
		},
		cardfront: function(value, item) {
			if (value == "") {
				$("#cardfrontimg").attr("tabindex", 0).addClass("layui-form-danger")
				return "请上传身份证正面";
			}
		},
		cardreverse: function(value, item) {
			if (value == "") {
				$("#cardreverseimg").attr("tabindex", 0).addClass("layui-form-danger")
				return "请上传身份证反面";
			}
		},
	});
	form.on('submit(save)', function(data) {
		layui.layer.load(2)
		var result = data.field;
		save(JSON.stringify(result))
		return false;
	});

	function save(data, status) {
		console.log(data)
		console.log(status)
		$.ajax({
			url: baseUrl + "join/saveOrUpdateJoinInfo",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			type: "post",
			async: false,
			data: {
				data: data,
				status: status
			},
			success: function(res) {
				if (res.code === SUCCESS) {
					layui.layer.closeAll();
					sessionStorage.setItem("data", res.msg);
					window.location.href = "authentication.html"
					return;
				} else {
					layui.layer.closeAll();
					layer.msg('提交失败，请重试')
					return;
				}
			}
		})
	}
})
