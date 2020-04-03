layui.use(['laypage', 'layer', 'table', 'upload', 'element'], function() {
	var laypage = layui.laypage;
	var layer = layui.layer;
	var table = layui.table;
	var upload = layui.upload;
	var element = layui.element;
	var $ = layui.$;
	var form = layui.form;

	form.on("submit(save)", function(data) {
		console.log(data.field)
		if (getUrlSearch("type") === "1") {
			console.log(data.field)
			updateLightning(JSON.stringify(data.field))
		} else {
			addLightning(JSON.stringify(data.field))
		}
		return false;
	})
	$(".cancel").on("click", function() {
		f_close()
	})

	function addLightning(data) {
		$.ajax({
			url: baseUrl + "personal/addUserLightning",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			data: {
				data: data
			},
			success: function(res) {
				if (res.code === SUCCESS) {
					layer.msg('添加成功');
					f_close()
				}else{
					layer.msg('最多添加两条发票信息')
				}
			}
		})
	}
	function updateLightning(data) {
		$.ajax({
			url: baseUrl + "personal/updateUserLightning",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			data: {
				data: data
			},
			success: function(res) {
				if (res.code === SUCCESS) {
					layer.msg('添加成功');
					f_close()
				}
			}
		})
	}

	function f_close() {
		var index = parent.layer.layer.getFrameIndex(window.name);
		parent.layer.layer.close(index);
	}

})
