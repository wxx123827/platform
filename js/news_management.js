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
})

layui.use(['laypage', 'laydate', 'layer', 'table', 'upload', 'element'], function() {
    var laypage = layui.laypage;
    var laydate = layui.laydate;
	var layer = layui.layer;
	var table = layui.table;
	var upload = layui.upload;
	var element = layui.element;
	var $ = layui.$;
	var form = layui.form;
    var page;

    //时间选择器
    laydate.render({
    elem: '#time'
    });

	// layer.load(2)
	table.render({
		elem: '#head_plate',
		url: baseUrl + "",
		// toolbar: true,
		toolRow: true,
		// height: 'full-30',
		cellMinWidth: 20,
		// width:1000,
		cols: [
			[ //标题栏
				{
					title: '序号',
                    type: 'numbers',
                    width: 50,
                    align: 'center'
				},
				{
					field: 'name',
					title: '新闻标题',
					align: 'center',
				},
				{
					field: '',
					title: '发布日期',
					align: 'center',
				},
				{
					fixed: 'right',
					title: '操作',
					width: 300,
					align: 'center',
					toolbar: "#news-bar"
				}
			]
		],
		done: function() {
			layer.closeAll("loading");
		},
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
	var openindex;
	//行内工具栏事件
	table.on('tool(head_plate)', function(obj) {
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
		} else if (layEvent === 'update') { //修改
			layer.prompt(function(val, index) {
                layer.load(2);
			});
		}else if (layEvent === 'cancel') { //取消重点
			layer.prompt(function(val, index) {
                layer.load(2);
			});
		}
	})

})
