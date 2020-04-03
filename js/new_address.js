pca.init('select[name=province]', 'select[name=city]', 'select[name=area]');
layui.use(['laypage', 'layer', 'table', 'upload', 'element'], function() {
	var laypage = layui.laypage;
	var layer = layui.layer;
	var table = layui.table;
	var upload = layui.upload;
	var element = layui.element;
	var $ = layui.$;
	var form = layui.form;
	var type = getUrlSearch("type");
	if (type == 1) {
		var data = JSON.parse(sessionStorage.getItem("adddata"))
		var province = data.province.split(",");
		pca.init('select[name=province]', 'select[name=city]', 'select[name=area]', province[0], province[1], province[2]);
		form.val("informationform", {
			"name": data.name,
			"officename": data.officename,
			"address": data.address,
			"postcode": data.postcode,
			"tel": data.tel
		})
	}
	form.verify({
		name: function(value) {
			if (value.length == 0) {
				return '请输入收件人';
			}
		},
		address: function(value) {
			if (value.length == 0) {
				return '请输入详细地址';
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
		postcode: function(value) {
			if (value.length == 0) {
				return '请输入邮编';
			}
		},
		tel: function(value) {
			if (value.length == 0) {
				return "请输入联系电话";
			} else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))) {
				return "电话格式有误"
			}
		}
	})
	form.on("submit(save)", function(data) {
		var result = data.field;
		if(result.province==='全部'){
			layer.msg("请选择城市", {
				icon: 2
			});
			$(document).find("[name=province]").addClass("layui-form-danger");
			return false;
		}
		var province = result.province + "," + result.city + "," + result.area;
		result.province = province;
		if (type == 0) {
			addUserAddress(JSON.stringify(result))
		} else {
			result.uid = getUrlSearch("uid");
			updateUserAddress(JSON.stringify(result))
		}
		return false;
	})

	function addUserAddress(data) {
		$.ajax({
			url: baseUrl + "personal/addUserAddress",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			data: {
				data: data
			},
			success: function(res) {
				if (res.code === SUCCESS) {
					layer.msg('添加成功', {
						icon: 1,
					})
					f_close()
				}
			}
		})
	}

	function updateUserAddress(data) {
		$.ajax({
			url: baseUrl + "personal/updateUserAddress",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			data: {
				data: data
			},
			success: function(res) {
				if (res.code === SUCCESS) {
					layer.msg('添加成功', {
						icon: 1,
					})
					f_close()
				}
			}
		})
	}
	$(".cancel").on("click", function() {
		f_close()
	})

	function f_close() {
		var index = parent.layer.layer.getFrameIndex(window.name);
		parent.layer.layer.close(index);
	}
})
