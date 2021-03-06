$(document).ready(function() {
	$('.head').load("personal_head.html");
	$('.nav_area').load("personal_nav.html", function(response, status, xhr) {
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
	pca.init('select[name=province]', 'select[name=city]');
})
layui.config({
	base: './static/cropper/' //layui自定义layui组件目录
}).use(['form', 'layedit', 'laydate', 'upload', 'croppers','element'], function() {
	var $ = layui.jquery,
		upload = layui.upload,
		form = layui.form,
		layer = layui.layer,
		layedit = layui.layedit,
		croppers = layui.croppers,
		element=layui.element,
		laydate = layui.laydate;
	croppers.render({
		elem: '#updateSrc',
		saveW: 150,
		saveH: 150,
		mark: 1 / 1,
		area: '900px',
		url: baseUploadUrl,
		done: function(url) { //上传完毕回调
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
			success: function(res) {
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
	$(function() {
		$.ajax({
			url: baseUrl + "personal/getUserInfo",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			
			success: function(res) {
				if (res.code === SUCCESS) {
					var data=res.msg;
					form.val("informationform", {
						"nickname":data.nickname,
						"department":data.department,
						"email":data.email,
						"jobs":data.jobs,
						"name":data.name,
						"officetel":data.officetel,
						"sex":data.sex,
						"unitname":data.unitname,
						"tel":data.tel
					})
					form.render(); 
					pca.init('select[name=province]', 'select[name=city]',data.province,data.city);
					// $(".usertel").html('<span>'+data.tel+'</span>') 
				}
			}
		})
	})   
	form.on('submit(save)', function(data) {
		$.ajax({
			url: baseUrl + "personal/updateUserInfo",
			xhrFields: {
				withCredentials: true
			},
			data:{
				data:JSON.stringify(data.field)
			},
			
			crossDomain: true,
			success: function(res) {
				if (res.code === SUCCESS) {
					layer.msg("保存成功")
				}else{
					layer.msg(res.msg,{
						icon:2
					})
				}
			}
		})
		return false;	
		})
});
