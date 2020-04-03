$(document).ready(function() {
	$('.head').load("personal_head.html");
	$('.nav_area').load("personal_nav.html", function(response, status, xhr) {
		$(document).find(".center_middle").html('<span>我的发布</span>')
	});
	$('.foot').load("foot.html");
})

//我的发布数据
layui.use(['laypage', 'layer', 'table', 'laydate', 'upload', 'element'], function() {
	var laypage = layui.laypage;
	var layer = layui.layer;
	var table = layui.table;
	var upload = layui.upload;
	var element = layui.element;
	var $ = layui.$;
	var form = layui.form;
	var laydate = layui.laydate;
	var page;
	// layer.load(2)//加载
	table.render({
		elem: '#release',
		url: baseUrl + "release/getGoodsByUser",
		toolRow: true,
		cellMinWidth: 80,
		cols: [
			[ //标题栏
				{
					field: 'name',
					title: '物品名称',
					align: 'center',
					// width: 300,
					sort: true
				},
				{
					field: 'classifyname',
					title: '分类',
					align: 'center',
					// width: 300,
					sort: true
				},
				{
					field: 'expectedrevenue',
					title: '期望收益',
					align: 'center',
					width: 120,
					sort: true
				},
				// {
				// 	field: 'time',
				// 	title: '购置日期',
				// 	align: 'center',
				// 	// width: 300,
				// 	templet: function(d) {
				// 		return d.buytime != null ? crtTimeFtt(d.buytime) : '无数据'
				// 	}
				// },
				{
					field: 'status',
					title: '物品类型',
					align: 'center',
					width: 120,
					sort: true,
					templet: function(d) {
						switch (d.types) {
							case '1':
								return "仪器"
								break;
							case '2':
								return "实验室"
								break;
							case '3':
								return "耗材"
								break;
							case '4':
								return "知识"
								break;
							case '5':
								return "技能"
								break;
						}
					}
				},
				{
					field: 'status',
					title: '状态',
					align: 'center',
					// width: 300,
					sort: true,
					templet: function(d) {
						if (d.checkstatus == "0" && d.status == "0") {
							return '<p>待发布</p>'
						}
						if (d.checkstatus == "0" && d.status == "1") {
							return '<p>待审核</p>'
						}
						if (d.checkstatus == "1" && d.status == "1") {
							return '<p>审核通过</p>'
						}
						if (d.checkstatus == "2" && d.status == "1") {
							return '<p>审核失败</p>'
						}
					}
				},
				{
					fixed: 'right',
					title: '操作',
					width: 250,
					align: 'center',
					toolbar: "#release-bar"
				}
			]
		],
		//分页
		page: {
			layout: ['first', 'prev', 'page', 'next', 'last', 'count', 'skip'] //自定义分页布局
				,
			limit: 9,
			prev: '上一页',
			next: "下一页",
			theme: '#1E9FFF',
		},
		id: 'releaseList',
		response: {
			statusCode: 200 //重新规定成功的状态码为 200，table 组件默认为 0
		},
		parseData: function(res) { //将原始数据解析成 table 组件所规定的数据
			return {
				"code": res.code, //解析接口状态
				"msg": res.msg, //解析提示文本
				"count": res.msg.totalRow, //解析数据长度
				"data": res.msg.list, //解析数据列表
				"page": res.msg.totalPage

			};
		}
	});
	Array.prototype.indexOf = function(val) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == val) {
				return i;
			};
		}
		return -1;
	};

	//根据数组的下标，删除该下标的元素
	Array.prototype.remove = function(val) {
		var index = this.indexOf(val);
		if (index > -1) {
			this.splice(index, 1);
		}
	};

	function crtTimeFtt(value, row, index) {
		return dateFtt("yyyy-MM-dd hh:mm:ss", value); //直接调用公共JS里面的时间类处理的办法     
	}
	var openindex;
	//行内工具栏事件
	table.on('tool(release)', function(obj) {
		var data = obj.data;
		var types = data.types;
		if (obj.event === 'del') {
			layer.confirm('确定删除吗?', function(index) {
				layer.load(2);
				$.ajax({
					url: baseUrl + "goods/deleteGoods",
					xhrFields: {
						withCredentials: true
					},
					crossDomain: true,
					data: {
						uid: data.uid
					},
					success: function(res) {
						if (res.code === SUCCESS) {
							layer.closeAll();
							table.reload('releaseList', {
								url: baseUrl + 'release/getGoodsByUser'
							});
						}
					}
				})
			});
		} else if (obj.event === 'detail') { 
			layer.open({
				type: 2,
				title: '查看' + getTitle(types),
				maxmin: true, //开启最大化最小化按钮
				area: ['1250px', '700px'],
				content: getIframe(types),
				success: function(layero, index) {
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
					console.log(data)
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
					$(data.src.split(",")).each(function(i) {
						$(body).find(".layui-upload-img:eq(" + i + ")").attr("src", baseImgUrl + String(this))
					})
					if (data.types === "1") {
						iframeWin.layui.laydate.render({
							elem: "#times",
							type: 'datetime',
							value: crtTimeFtt(data.buytime)
						})
						iframeWin.getFields()
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
		} else if (obj.event === 'edit') {
			layer.open({
				type: 2,
				title: '查看' + getTitle(types),
				maxmin: true, //开启最大化最小化按钮
				area: ['1250px', '700px'],
				content: getIframe(types),
				success: function(layero, index) {
					let body = layer.getChildFrame('body', index);
					var iframeWin = window[layero.find('iframe')[0]['name']];
					if (types === "4") {
						var html = "";
						var files = getGoodsFile(data.uid)
						if (files != null) {
							files = JSON.parse(files)
							$(files).each(function() {
								html += '<p><a href=\'' + baseUrl + "file/download?uid=" + this.uid + "" + '\'>' + this.src +
									'</a><p class="layui-btn layui-btn-xs layui-btn-radius deletefile" value="' + this.uid +
									'">删除</p></p>';
							})
							$(body).find(".files").before(html)
						}

					}
					$(body).find("[name=name]").val(data.name);
					console.log(data)
					iframeWin.catIns1.set(data.classifyList)
					iframeWin.pca.init('select[name=province]', 'select[name=city]', 'select[name=area]', data.province, data.city,
						data.area);
					$(body).find("[name=address]").val(data.address);
					$(body).find("[name=expectedrevenue]").val(data.expectedrevenue);
					$(body).find("[name=company]").val(data.company);
					$(body).find("[name=brand]").val(data.brand);
					$(body).find("[name=model]").val(data.model);
					$(body).find("[name=stock]").val(data.stock);
					$(body).find("[name=uid]").val(String(data.uid));
					$(body).find("[name=reportqualification]").val(data.reportqualification);
					$(body).find("[name=dataform]").val(data.dataform)
					$(data.src.split(",")).each(function(i) {
						console.log(String(this))
						$(body).find(".layui-upload-img:eq(" + i + ")").attr("src", baseImgUrl + String(this))
						$(body).find(".publishedImgSrc:eq(" + i + ")").attr("src", String(this))
					})
					if (data.types === "1") {
						iframeWin.layui.laydate.render({
							elem: "#times",
							type: 'datetime',
							value: crtTimeFtt(data.buytime)
						})
						iframeWin.getFields()
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
										fields.remove(this)
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
					iframeWin.layui.form.render('select');
					iframeWin.layui.form.render("checkbox")
					iframeWin.layui.form.on("submit(save)", function(data) {
						iframeWin.saveOrimmediate(data, 0)
						return false;
					})
					iframeWin.layui.form.on("submit(immediate)", function(data) {
						iframeWin.saveOrimmediate(data, 1)
						return false;
					})

				},
				end: function() {
					obj.update();
					table.reload('releaseList', {
						url: baseUrl + 'release/getGoodsByUser'
					});
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
	$('.closed').on('click', function() {
		layer.closeAll();
	});
	//查询按钮
	$('.refer').on('click', function() {
		table.reload('releaseList', {
			url: baseUrl + '/goods/goodsSearch',
			where: {
				name: $(".item_name").val(),
				shopuid: demo3.getValue('valueStr')[0],
				type: $('select').val(),
				page: 1,
				limit: 9,
			} //设定异步数据接口的额外参数
		});
	})

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
					table.reload('releaseList', {
						url: baseUrl + 'release/getGoodsByUser'
					});
				}
			}
		})
	}

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
				return "./publish/instrument.html"
				break;
			case "2":
				return "./publish/laboratory.html"
				break;
			case "3":
				return "./publish/consumables.html"
				break;
			case "4":
				return "./publish/knowledge.html"
				break;
			case "5":
				return "./publish/skill.html"
				break;
		}
	}
})
