/**
 * 企业入驻
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
	getFields();
	pca.init('select[name=province]', 'select[name=city]', 'select[name=area]');

	function getArrDifference(arr1, arr2) {
		return arr1.concat(arr2).filter(function(v, i, arr) {
			return arr.indexOf(v) === arr.lastIndexOf(v);
		});
	}
	if (sessionStorage.getItem("data") != null) {
		var data = JSON.parse(sessionStorage.getItem("data"));
		console.log(data)
		var result = "";
		if (data.unitjoininfo != null) {
			result = data.unitjoininfo;
			var checkfields = $(document).find("[name=fields]");
			var fiestr = new Array()
			$.each(checkfields, function(i, n) {
				var next = $(this).next(".layui-form-checkbox");
				$.each((result.fieldsuid).split(","), function(i, s) {
					//i指数组的下标，s该下标所对应的值
					if ($(n).attr("value") == s) {
						$(next).prev().prop("checked", "true");
						fiestr.push(s);
					}
				})
			})

			if (result.otherimg.split(",").length > 0) {
				if (result.otherimg.split(",")[0] != "") {
					$.each(result.otherimg.split(","), function(i, n) {
						$.each($(".otherImgSrc"), function(j, s) {
							if (i == j) {
								$(this).prev().attr("src", baseImgUrl + n)
								$(this).attr("src", n)
							}
						})
					})
				}
			}
			pca.init('select[name=province]', 'select[name=city]', 'select[name=area]', result.province, result.city, result.county);
			$('#logoimg').attr('src', baseImgUrl + result.logo);
			$('#businessimg1').attr('src', baseImgUrl + result.business);
			form.val("enterpriesform", {
				"logo": result.logo,
				"business": result.business,
				"email": result.email,
				"infouid": data.joinuid,
				"name": result.name,
				"fieldsstr": getArrDifference(fiestr, (result.fieldsuid).split(",")),
				"address": result.address,
				"contactname": result.contactname,
				"tel": result.tel,
				"officephone": result.officephone,
				"scale": result.scale

			});
			layui.form.render();
		}
	}

	var logo = upload.render({
		elem: '#logodiv',
		url: baseUploadUrl,
		data: {
			uid: userUid
		},
		before: function(obj) {
			//预读本地文件示例，不支持ie8
			obj.preview(function(index, file, result) {
				$('#logoimg').attr('src', result); //图片链接（base64）
			});
		},
		done: function(res) {

			//如果上传失败
			if (res.code > 0) {
				return layer.msg('上传失败');
			}
			form.val("enterpriesform", {
				"logo": res.src
			})
			//上传成功
		},
		error: function() {
			//演示失败状态，并实现重传
			var demoText = $('#errorText');
			demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
			demoText.find('.demo-reload').on('click', function() {
				logo.upload();
			});
		}
	});
	var business1 = upload.render({
		elem: '#businessdiv1',
		url: baseUploadUrl,
		data: {
			uid: userUid
		},
		before: function(obj) {
			//预读本地文件示例，不支持ie8
			obj.preview(function(index, file, result) {
				$('#businessimg1').attr('src', result); //图片链接（base64）
			});
		},
		done: function(res) {
			//如果上传失败
			if (res.code > 0) {
				return layer.msg('上传失败');
			}
			form.val("enterpriesform", {
				"business": res.src
			})
			//上传成功
		},
		error: function() {
			//演示失败状态，并实现重传
			var demoText = $('#business1errorText');
			demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
			demoText.find('.demo-reload').on('click', function() {
				business1.upload();
			});
		}
	});
	var otherimg1 = upload.render({
		elem: '#otherImgdiv1',
		url: baseUploadUrl,
		data: {
			uid: userUid
		},
		before: function(obj) {
			//预读本地文件示例，不支持ie8
			obj.preview(function(index, file, result) {
				$('#otherImgimg1').attr('src', result); //图片链接（base64）
			});
		},
		done: function(res) {
			//如果上传失败
			if (res.code > 0) {
				return layer.msg('上传失败');
			}
			form.val("enterpriesform", {
				"otherImgimg1": res.src
			})
			$("[name=otherImgimg1]").attr("src", res.src)
			//上传成功
		},
		error: function() {
			//演示失败状态，并实现重传
			var demoText = $('#otherImg1errorText');
			demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
			demoText.find('.demo-reload').on('click', function() {
				otherimg1.upload();
			});
		}
	});
	var otherimg2 = upload.render({
		elem: '#otherImgdiv2',
		url: baseUploadUrl,
		data: {
			uid: userUid
		},
		before: function(obj) {
			//预读本地文件示例，不支持ie8
			obj.preview(function(index, file, result) {
				$('#otherImgimg2').attr('src', result); //图片链接（base64）
			});
		},
		done: function(res) {
			//如果上传失败
			if (res.code > 0) {
				return layer.msg('上传失败');
			}
			form.val("enterpriesform", {
				"otherImgimg2": res.src
			})
			$("[name=otherImgimg2]").attr("src", res.src)
			//上传成功
		},
		error: function() {
			//演示失败状态，并实现重传
			var demoText = $('#otherImg2errorText');
			demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
			demoText.find('.demo-reload').on('click', function() {
				otherimg2.upload();
			});
		}
	});
	var otherimg3 = upload.render({
		elem: '#otherImgdiv3',
		url: baseUploadUrl,
		data: {
			uid: userUid
		},
		before: function(obj) {
			//预读本地文件示例，不支持ie8
			obj.preview(function(index, file, result) {
				$('#otherImgimg3').attr('src', result); //图片链接（base64）
			});
		},
		done: function(res) {
			//如果上传失败
			if (res.code > 0) {
				return layer.msg('上传失败');
			}
			form.val("enterpriesform", {
				"otherImgimg3": res.src
			})
			$("[name=otherImgimg3]").attr("src", res.src)
			//上传成功
		},
		error: function() {
			//演示失败状态，并实现重传
			var demoText = $('#otherImg3errorText');
			demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
			demoText.find('.demo-reload').on('click', function() {
				otherimg3.upload();
			});
		}
	});
	//自定义验证规则
	form.verify({
		name: function(value) {
			if (value.length == 0) {
				return '请输入单位名称';
			}
		},
		logo: function(value, item) {
			if (typeof($(item).attr("src")) == "undefined") {
				$("#logoimg").attr("tabindex", 0).addClass("layui-form-danger")
				return "请上传logo";
			}
		},
		business: function(value, item) {
			if (typeof($(item).attr("src")) == "undefined") {
				$("#businessimg1").attr("tabindex", 0).addClass("layui-form-danger")
				return "请上传营业执照";
			}
		},
		province: function(value) {
			if (value === "全部") {
				layer.msg("请选择城市", {
					icon: 2
				});
				$(document).find("[name=province]").addClass("layui-form-danger");
				return false;
			}
		},
		contactname: function(value) {
			if (value.length == 0) {
				return "请输入联系人";
			}
		},
		tel: function(value) {
			if (value.length == 0) {
				return "请输入联系电话";
			} else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))) {
				return "电话格式有误"
			}
		},
		officephone: function(value) {
			if (value.length == 0) {
				return "请输入办公电话";
			}
		}
	});
	form.on('submit(save)', function(data) {
		layui.layer.load(2);
		var checkfields = $.find("[name=fields]");
		var filedsArray = new Array();
		$.each(checkfields, function(i, n) {
			var next = $(this).next(".layui-form-checkbox");
			if ($(next).hasClass("layui-form-checked")) {
				filedsArray.push($(n).attr("value"));
			}
		})
		if (data.field.fieldsstr != "") {
			$.each(data.field.fieldsstr.split(","), function(i, n) {
				filedsArray.push(n);
			});
		}
		data.field.fields = filedsArray;
		var check = $.find(".otherImgSrc");
		var imgsArray = new Array();
		$.each(check, function(i, n) {
			if (typeof($(this).attr("src")) != "undefined") {
				imgsArray.push($(this).attr("src"));
			}
		})
		data.field.otherImgs = imgsArray;
		var result = data.field;
		if (result.fields.length == 0 && result.fieldsstr == "") {
			layer.msg("请至少选择或输入一个服务领域", {
				icon: 2
			})
			$(document).find("[name=fieldsstr]").focus().addClass("layui-form-danger");
			layer.closeAll()
			return false;
		}
		save(JSON.stringify(result))
		return false;
	});

	function save(data) {
		$.ajax({
			url: baseUrl + "join/saveOrUpdateJoinInfo",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			type: "post",
			async: false,
			data: {
				data: data
			},
			success: function(res) {
				console.log(res)
				if (res.code === SUCCESS) {
					layer.closeAll();
					sessionStorage.setItem("data", res.msg);
					layui.layer.closeAll()
					window.location.href = "authentication.html"
					return false;
				}
			}
		})
	}
})
