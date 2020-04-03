layui.use(['layedit'], function() {
	var layedit = layui.layedit;
	$(document).ready(function() {
		$('.head').load("personal_head.html");
		$('.nav_area').load("personal_nav.html", function(response, status, xhr) {
			$(document).find(".center_middle").html('<span>服务商简介</span>')
		});
		$('.foot').load("foot.html");
		checkUserJoinAjax()
		if (!userJoinStatus) {
			$(".introduction").text("用户未入驻")
		}
	})
	var detail;
	getDetail();
	var html=$(".detail").html();
	$(document).on("click",".save",function(){
		updateDetail(layedit.getContent(detail));
	})
	$(document).on("click",".cancel",function(){
		$(".detail").html(html);
		$(".bottom").html('<div class="update">修改</div>');
	})
	$(document).on("click",".update",function(){
		$(".detail").html('<textarea placeholder="请输入内容" class="layui-textarea" style="width: 90%;min-height: 300px;height: auto;" id="detail" name="detail" lay-verify="detail"></textarea>');
		$(".bottom").html('<div class="save">保存</div><div class="cancel">取消</div>');
		detail=layedit.build('detail',{
			"hideTool":['face','image']
		}); 
		layedit.setContent(detail,html);
	})
	function getDetail(){
		$.ajax({
			url:baseUrl+"shop/getShopDetail",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			async:false,
			success:function(res){
				if(res.code===SUCCESS){
					$(".detail").html(res.msg.detail);
				}
			}
		})
	}
	
	function updateDetail(detail){
		$.ajax({
			url:baseUrl+"shop/updateShopDetail",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			data:{
				detail:detail
			},
			success:function(res){
				if(res.code===SUCCESS){
					$(".detail").html(detail);
					html=detail
					$(".bottom").html('<div class="update">修改</div>');
				}
			}
		})
	}
})
