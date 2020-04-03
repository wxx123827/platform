$(document).ready(function() {
	$('.head').load("personal_head.html");
	$('.nav_area').load("personal_nav.html", function(response, status, xhr) {
		$(document).find(".center_middle").html('<span>发布产品</span>')
	});
	$('.foot').load("foot.html");
})
layui.config({
	base: './'
}).extend({
	selectN: 'static/selectN',
}).use(['form', 'layedit', 'laydate', 'upload', 'selectN', 'element'], function() {
	var $ = layui.jquery,
		upload = layui.upload,
		form = layui.form,
		layer = layui.layer,
		layedit = layui.layedit,
		selectN = layui.selectN,
		element = layui.element,
		laydate = layui.laydate;
	var synopsis = layedit.build('synopsis'); //建立编辑器
	var technicaldata = layedit.build('technicaldata');
	var range = layedit.build('range');
	function getClassifyOne(){
		switch($(document).find(".published_content>h2").text().split("发布")[1]){
			case "仪器":
			return '8167216583358402560'
			break;
			case "耗材":
			return '8169747779825025024'
			break;
			case "知识 技术资料":
			case "知识 个人技能":
			return '8169747805716463616'
			break;
			case "实验室":
			return '8169747746274787328'
			break;
		}
		
	}
	var catIns1 = selectN({
		//元素容器【必填】
		elem: '#classify',
		search: [false, true]
			//候选数据【必填】
			,
		selected: [getClassifyOne()],
		data: baseUrl + "main/getClassify"
	});
	getFields();
	pca.init('select[name=province]', 'select[name=city]', 'select[name=area]');
	//创建监听函数
	var xhrOnProgress = function(fun) {
		xhrOnProgress.onprogress = fun; //绑定监听
		//使用闭包实现监听绑
		return function() {
			//通过$.ajaxSettings.xhr();获得XMLHttpRequest对象
			var xhr = $.ajaxSettings.xhr();
			//判断监听函数是否为函数
			if (typeof xhrOnProgress.onprogress !== 'function')
				return xhr;
			//如果有监听函数并且xhr对象支持绑定时就把监听函数绑定上去
			if (xhrOnProgress.onprogress && xhr.upload) {
				xhr.upload.onprogress = xhrOnProgress.onprogress;
			}
			return xhr;
		}
	}
	var filess = new Array();
	var count = 0;
	var demoListView = $('#demoList'),
		uploadListIns = upload.render({
			elem: '#testList',
			url: baseUrl + "file/upload",
			accept: 'file',
			exts: "doc|docx|pdf",
			acceptMime: '.doc,.docx,.pdf',
			size: 51200,
			data: {
				uid: userUid
			},
			multiple: true,
			auto: false,
			xhr: xhrOnProgress,
			bindAction: '#testListAction',
			progress: function(value, obj) {
				$("#demoList").find('.layui-progress ').each(function() {
					if ($(this).attr("file") == obj.name) {
						var progressBarName = $(this).attr("lay-filter");
						element.progress(progressBarName, value + '%') //设置页面进度条
					}
				})
			},
			choose: function(obj) {
				var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
				//读取本地文件
				obj.preview(function(index, file, result) {
					count++
					var tr = $(['<tr id="upload-' + index + '">', '<td>' + file.name + '</td>', '<td>' + (file.size / 1014).toFixed(
							1) + 'kb</td>', '<td>等待上传</td>',
						'<td><div  file="' + file.name +
						'" class="layui-progress layui-progress-big" lay-showpercent="true"   lay-filter="progressBar' + count +
						'"><div class="layui-progress-bar" lay-percent="0%"></div></div></td>',
						'<td>', '<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>',
						'<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'
					].join(''));

					//单个重传
					tr.find('.demo-reload').on('click', function() {
						obj.upload(index, file);
						return false;
					});

					//删除
					tr.find('.demo-delete').on('click', function() {
						delete files[index]; //删除对应的文件
						tr.remove();
						uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
					});

					demoListView.append(tr);
					element.render('progress');
				});
			},
			done: function(res, index, upload) {
				if (res.code === SUCCESS) { //上传成功
					filess.push(res.msg)
					var tr = demoListView.find('tr#upload-' + index),
						tds = tr.children();
					tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
					tds.eq(4).html(''); //清空操作
					return delete this.files[index]; //删除文件队列已经上传成功的文件
				}
				this.error(index, upload);
			},
			error: function(index, upload) {
				var tr = demoListView.find('tr#upload-' + index),
					tds = tr.children();
				tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
				tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
			}
		});
	var publishedimg1 = upload.render({
		elem: '#publishedImgdiv1',
		url: baseUploadUrl,
		data: {
			uid: userUid
		},
		before: function(obj) {
			//预读本地文件示例，不支持ie8
			obj.preview(function(index, file, result) {
				$('#publishedImgimg1').attr('src', result); //图片链接（base64）
			});
		},
		done: function(res) {
			//如果上传失败
			if (res.code > 0) {
				return layer.msg('上传失败');
			}
			form.val("thirdform", {
				"publishedImgimg1": res.src
			})
			$("[name=publishedImgimg1]").attr("src", res.src)
			//上传成功
		},
		error: function() {
			//演示失败状态，并实现重传
			var demoText = $('#publishedImg1errorText');
			demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
			demoText.find('.demo-reload').on('click', function() {
				publishedimg1.upload();
			});
		}
	});
	var publishedimg2 = upload.render({
		elem: '#publishedImgdiv2',
		url: baseUploadUrl,
		data: {
			uid: userUid
		},
		before: function(obj) {
			//预读本地文件示例，不支持ie8
			obj.preview(function(index, file, result) {
				$('#publishedImgimg2').attr('src', result); //图片链接（base64）
			});
		},
		done: function(res) {
			//如果上传失败
			if (res.code > 0) {
				return layer.msg('上传失败');
			}
			form.val("thirdform", {
				"publishedImgimg2": res.src
			})
			$("[name=publishedImgimg2]").attr("src", res.src)
			//上传成功
		},
		error: function() {
			//演示失败状态，并实现重传
			var demoText = $('#publishedImg2errorText');
			demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
			demoText.find('.demo-reload').on('click', function() {
				publishedimg2.upload();
			});
		}
	});
	var publishedimg3 = upload.render({
		elem: '#publishedImgdiv3',
		url: baseUploadUrl,
		data: {
			uid: userUid
		},
		before: function(obj) {
			//预读本地文件示例，不支持ie8
			obj.preview(function(index, file, result) {
				$('#publishedImgimg3').attr('src', result); //图片链接（base64）
			});
		},
		done: function(res) {
			//如果上传失败
			if (res.code > 0) {
				return layer.msg('上传失败');
			}
			form.val("thirdform", {
				"publishedImgimg3": res.src
			})
			$("[name=publishedImgimg3]").attr("src", res.src)
			//上传成功
		},
		error: function() {
			//演示失败状态，并实现重传
			var demoText = $('#publishedImg3errorText');
			demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
			demoText.find('.demo-reload').on('click', function() {
				publishedimg3.upload();
			});
		}
	});
	//自定义验证规则
	form.verify({
		name: function(value) {
			if (value.length == 0) {
				return '请输入名称';
			}
		},
		model: function(value) {
			if (value.length == 0) {
				return '请输入型号';
			}
		},
		brand: function(value) {
			if (value.length == 0) {
				return '请输入品牌';
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
		expectedrevenue: function(value) {
			if (value.length == 0) {
				return '请输入期望金额';
			}
		},
		company: function(value) {
			if (value.length == 0) {
				return '请输入单位';
			}
		},
		stock: function(value) {
			if (value.length == 0) {
				return '请输入数量';
			} else if(!(/^\+?[1-9][0-9]*$/.test(value))){
				return "数量只能是正整数，且不需带单位"
			}
		},
		technicaldata: function(value) {
			if (value.length == 0) {
				return '请输入技术指标';
			}
		},
		synopsis: function(value) {
			if (value.length == 0) {
				return '请输入必填项';
			}
		},
		reportqualification: function(value) {
			if (value.length == 0) {
				return '请输入报告资质';
			}
		},
		range: function(value) {
			if (value.length == 0) {
				return '请输入应用范围';
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
		saveOrimmediate(data, 0)
		return false;
	});
	form.on('submit(immediate)', function(data) {
		saveOrimmediate(data, 1)
		return false;
	});

	function saveOrimmediate(data, type) {
		if ($($(document).find(".demo-delete")).length > 0) {
			layer.msg('请完成多文件上传操作,无用文件请删除')
			return false;
		}
		var result = data.field
		result.word = filess
		var file = new Array()
		result.technicaldata = layedit.getContent(technicaldata)
		result.range = layedit.getContent(range)
		result.synopsis = layedit.getContent(synopsis)
		var count = 0;
		$(".publishedImgSrc").each(function(i) {
			var src = $(this).attr("src")
			if (typeof(src) === "undefined") {
				count++
				// layer.msg("请上传三张图片", {
				// 	icon: 2
				// })
				// $(this).prev().attr("tabindex", 0).addClass("layui-form-danger");
				// return false;
			}
			file.push($(this).attr("src"))
		})
		if (count == 3) {
			layer.msg("请至少上传一张图片", {
				icon: 2
			})
			return false;
		}
		result.file = file;
		var classify = result.classify.split(",");
		if (classify[classify.length - 1] === "") {
			result.classify = classify[classify.length - 2]
		} else {
			result.classify = classify[classify.length - 1]
		}
		var checkfields = $(document).find("[name=fields]");
		if (checkfields.length != 0) {
			var filedsArray = new Array();
			$.each(checkfields, function(i, n) {
				var next = $(this).next(".layui-form-checkbox");
				if ($(next).hasClass("layui-form-checked")) {
					filedsArray.push($(n).attr("value"));
				}
			})
			if (result.fieldsstr != "") {
				$.each(result.fieldsstr.split(","), function(i, n) {
					filedsArray.push(n);
				});
			}
			result.fields = filedsArray;
		}
		console.log(data.field)
		if (result.type == 3) {
			checkHasGoods(JSON.stringify(result), result.type, type)
			return false;
		} else if (result.type == 1) {
			checkHasGoods(JSON.stringify(result), result.type, type)
			return false;
		}
		save(JSON.stringify(result), result.type, type);
	}

	function checkHasGoods(data, type, status) {
		$.ajax({
			url: baseUrl + "goods/checkHasGoods",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			type: "post",
			async: false,
			data: {
				data: data,
				type: type
			},
			success: function(res) {
				if (res.code === SUCCESS) {
					console.log(res)
					layer.confirm('检测到您店铺内已有该商品,当前库存[' + res.msg.stock + ']', {
						btn: ['增加库存', '继续添加'] //按钮
					}, function(index) {
						addStock(res.msg.uid, JSON.parse(data).stock)
						return;
					}, function(index) {
						save(data, type, status)
						return;
					});
					console.log(res)
					return;
				}
				save(data, type, status)
			}
		})
	}

	function save(data, type, status) {
		$.ajax({
			url: baseUrl + "goods/saveGoods",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			type: "post",
			async: false,
			data: {
				data: data,
				type: type,
				status: status
			},
			success: function(res) {
				if (res.code === SUCCESS) {
					layer.msg("添加成功")
					history.go(0)
					return;
				}
			}
		})
	}

	function addStock(uid, stock) {
		$.ajax({
			url: baseUrl + "goods/addStock",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			type: "post",
			async: false,
			data: {
				uid: uid,
				stock: stock
			},
			success: function(res) {
				if (res.code === SUCCESS) {
					layui.layer.msg("增加成功");
					history.go(0)
					layui.layer.closeAll()
					return;
				}
			}
		})
	}
})
