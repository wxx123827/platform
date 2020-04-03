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
    $(".check_middle button").on("click", function () {
        $(".check_middle button").css({"background": "#f9f9f9"})
        $(".check_middle button").css("color", "#666666");
        $(this).css({"background": "#247dd0"});
        $(this).css("color", "#ffffff");
    })
})

layui.use(['laypage', 'layer', 'table', 'upload', 'element'], function() {
	var laypage = layui.laypage;
	var layer = layui.layer;
	var table = layui.table;
	var upload = layui.upload;
	var element = layui.element;
	var $ = layui.$;
	var form = layui.form;
	var page;
	// layer.load(2)
	table.render({
		elem: '#center_publish',
		url: baseUrl + "",
		// toolbar: true,
		toolRow: true,
		// height: 'full-30',
		cellMinWidth: 20,
		// width:1000,
		cols: [
			[ //标题栏
				{
					type: 'checkbox',
					fixed: 'left'
				},
				{
					field: '序号',
					type: 'numbers',
					sort: true
				},
				{
					field: 'name',
					title: '物品名称',
					align: 'center',
					// width: 300,
					sort: true
				},
				{
					field: '',
					title: '分类',
					align: 'center',
					sort: true
				},
				{
					field: '',
					title: '购置日期',
					align: 'center',
					// width: 50,
					sort: true
				},
				{
					field: '',
					title: '物品类型',
					align: 'center',
					sort: true
				},
				{
					field: '',
					title: '申请时间时间',
					align: 'center',
					templet: function(d) {
						return crtTimeFtt(d.creattime)
					}
				},

				{
					fixed: 'right',
					title: '操作',
					width: 300,
					align: 'center',
					toolbar: "#publish-bar"
				}
			]
		],
		done: function() {
			layer.closeAll("loading");
		},

		page: {
			layout: ['first', 'prev', 'page', 'next', 'last', 'count', 'skip'] //自定义分页布局
				,
			limit: 9,
			prev: '上一页',
			next: "下一页",
			theme: '#1E9FFF',
			first: true,
			last: true
		},
		id: 'publishList',
		response: {
			statusCode: 200 //重新规定成功的状态码为 200，table 组件默认为 0
		},
		parseData: function(res) { //将原始数据解析成 table 组件所规定的数据
			console.log(res);
			return {
				"code": res.code, //解析接口状态
				"msg": res.msg, //解析提示文本
				"count": res.msg.totalRow, //解析数据长度
				"data": res.msg.list, //解析数据列表
				"page": res.msg.totalPage

			};
		}
	});
	//日期转换
	function crtTimeFtt(value, row, index) {
		return dateFtt("yyyy-MM-dd hh:mm:ss", value); //直接调用公共JS里面的时间类处理的办法     
	}
	Array.prototype.remove = function(val) {
		var index = this.indexOf(val);
		if (index > -1) {
			this.splice(index, 1);
		}
	};

	function getTitle(types) {
		switch (types) {
			case "1":
				return "仪器"
				break;
			case "2":
				return "实验室"
				break;
			case "3":
				return "耗材"
				break;
			case "4":
				return "知识"
				break;
			case "5":
				return "技能"
				break;
		}
	}

	function getIframe(types) {
		switch (types) {
			case "1":
				return "./published_instrument.html"
				break;
			case "2":
				return "./published_lab.html"
				break;
			case "3":
				return "./published_material.html"
				break;
			case "4":
				return "./knowledge_share.html"
				break;
			case "5":
				return "./technical_data.html"
				break;
		}
	}
	var openindex;
	//行内工具栏事件
	table.on('tool(center_publish)', function(obj) {
		var data = obj.data;
		var types = data.types;
		if (obj.event === 'del') {
			layer.confirm('确定删除吗?', function(index) {
				layer.load(2);
				$.ajax({
					url: baseUrl + "",
					type: "post",
					xhrFields: {
						withCredentials: true
					},
					crossDomain: true,
					data: {
						uid: data.uid
					},
					success: function(res) {
						console.log(res);
						if (res.code === 200) {
							obj.del();
							layer.closeAll('loading');
							layer.close(index);
						}
					}
				});
			});
		} else if (obj.event === 'detail') {
			layer.open({
				type: 2,
				title: '查看' + getTitle(types),
				maxmin: true, //开启最大化最小化按钮
				area: ['1250px', '700px'],
				content: getIframe(types),
				success: function(layero, index) {
					console.log(data)
					let body = layer.getChildFrame('body', index);
					var iframeWin = window[layero.find('iframe')[0]['name']];
					if (types === "4") {
						$(body).find(".files").html("");
						var html = "";
						var files = getGoodsFile(data.uid)
						if (files != null) {
							files = JSON.parse(files)
							$(files).each(function() {
								html += '<p><a href=\'' + baseUrl + "file/download?uid=" + this.uid + "" + '\'>' + this.src +
									'</a></p>';
							})
							$(body).find(".files").html(html)
						}
					
					}
					$(body).find("[name=name]").val(data.name);
					iframeWin.catIns1.set(data.classifyList)
					iframeWin.pca.init('select[name=province]', 'select[name=city]', 'select[name=area]', data.province, data.city,
						data.area);
					$(body).find("[name=address]").val(data.address);
					$(body).find("[name=expectedrevenue]").val(data.expectedrevenue);
					$(body).find("[name=company]").val(data.company);
					$(body).find("[name=brand]").val(data.brand);
					$(body).find("[name=model]").val(data.model);
					$(body).find("[name=stock]").val(data.stock);
					$(body).find("[name=reportqualification]").val(data.reportqualification);
					$(body).find("[name=dataform]").val(data.dataform)
					$(body).find('[name=select]').val(data.shopuid)
					$(data.src.split(",")).each(function(i) {
						$(body).find(".layui-upload-img:eq(" + i + ")").attr("src", baseImgUrl + String(this))
					})
					if (data.types === "1") {
						iframeWin.layui.laydate.render({
							elem: "#times",
							type: 'datetime',
							value: crtTimeFtt(data.buytime)
						})
						var checkfields = $(body).find("[name=fields]");
						var fields = data.fieldsuid.split(",");
						if (checkfields.length != 0) {
							var filedsArray = new Array();
							$.each(checkfields, function(i, n) {
								var _this = this;
								$(fields).each(function(i) {
									if ($(n).attr("value") === String(this)) {
										$(_this).prop("checked", true)
										$(_this).next(".layui-form-checkbox").addClass("layui-form-checked");
										fields.remove(this);
									}
								})
							})
							if (fields.length > 0) {
								$(body).find("[name=fieldsstr]").val(fields)
							}
						}
					}
					iframeWin.layui.layedit.setContent(iframeWin.synopsis, data.synopsis, false);
					iframeWin.layui.layedit.setContent(iframeWin.technicaldata, data.technicaldata, false);
					iframeWin.layui.layedit.setContent(iframeWin.range, data.ranges, false);
					$(body).find(".published_submit").remove()
					$(body).find("input").attr("disabled", true).addClass("layui-disabled")
					$(body).find(".layui-upload-img").addClass("layui-disabled")
					$(body).find("select").attr("disabled", true)
					$(body).find("textarea").attr("disabled", true)
					$(body).find("checkbox").attr("disabled", true)
					$(body).find("iframe[textarea='synopsis']").contents().find('body').attr("contenteditable", false);
					$(body).find("iframe[textarea='synopsis']").parents(".layui-layedit").find(".layui-layedit-tool i").addClass(
						"layui-disabled");
					$(body).find("iframe[textarea='technicaldata']").contents().find('body').attr("contenteditable", false);
					$(body).find("iframe[textarea='technicaldata']").parents(".layui-layedit").find(".layui-layedit-tool i").addClass(
						"layui-disabled");
					$(body).find("iframe[textarea='range']").contents().find('body').attr("contenteditable", false);
					$(body).find("iframe[textarea='range']").parents(".layui-layedit").find(".layui-layedit-tool i").addClass(
						"layui-disabled");
					iframeWin.layui.form.render('select');
					iframeWin.layui.form.render("checkbox");

				}
			});
		} else if (obj.event === "up_shelf") {
			layer.confirm('确定上架吗?', function(index) {
				layer.load(2);
				updateGoodsShelfstate(data.uid, 1)
			})
		} else if (obj.event === "down_shelf") {
			layer.confirm('确定下架吗?', function(index) {
				layer.load(2);
				updateGoodsShelfstate(data.uid, 0)
			})
		}
	})
	function updateGoodsShelfstate(uid, type) {
		$.ajax({
			url: baseUrl + "goods/updateGoodsShelfstate",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			data: {
				uid: uid,
				type: type
			},
			success: function(res) {
				if (res.code === SUCCESS) {
					layer.closeAll();
					table.reload('publishList', {
						url: baseUrl + "goods/getAllGoods"
					});
				}
			}
		})
	}
	function getGoodsFile(uid) {
		var result = "";
		$.ajax({
			url: baseUrl + "goods/getGoodsFiles",
			data: {
				uid: uid
			},
			async: false,
			success: function(res) {
				if (res.code === SUCCESS) {
					result = JSON.stringify(res.msg);
				} else {
					result = null
				}
			}
		})
		return result;
	}
	form.on('submit(releaseFormSave)', function(formdata) {
		formdata = formdata.field;
		if (formdata.id === "") {
			$.ajax({
				url: baseurl + "/sys/saveNews",
				type: "post",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				data: {
					title: formdata.title,
					content: $('.wysiwyg-editor').html()
				},
				success: function(res) {
					console.log(res);
					if (res.code === 200) {
						layer.close(openindex);
						table.reload('releaseList', {
							url: baseurl + '/goods/getGoods'
						});
						form.render();
						return true;
					}
				}
			});
			return false;
		} else {
			$.ajax({
				url: baseurl + "/goods/updateGoods",
				type: "post",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				data: {
					title: formdata.title,
					content: $('.wysiwyg-editor').html(),
					uid: formdata.id,
				},
				success: function(res) {
					console.log(res);
					if (res.code === 200) {
						layer.close(openindex);
						table.reload('releaseList', {
							url: baseurl + '/goods/getGoods'
						});
						$("#releaseForm")[0].reset();
						layui.form.render();
						// form.render();
						return true;
					}
				}
			});
			return false;
		}
	});
	
})
