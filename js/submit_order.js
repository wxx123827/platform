layui.use(['form', 'element', 'laydate'], function() {
	var form = layui.form;
	var $ = layui.$;
	var element = layui.element;
	var layer = layui.layer;
	var laydate = layui.laydate;
	var load = layer.load(2, {
		shade: [0.2, '#fff'],
		content: '正在创建订单...',
		success: function(layerContentStyle) {
			layerContentStyle.find('.layui-layer-content').css({
				'padding-top': '35px',
				'text-align': 'left',
				'width': '120px'
			});
		}
	});
	$(document).ready(function() {
		$('.head').load("personal_head.html");
		$('.nav_area').load("personal_nav.html", function(response, status, xhr) {
			$(document).find(".center_middle").html('<span>我的订单</span>')
		});
		$('.foot').load("foot.html");
	})
	var array = sessionStorage.getItem("checkedID")
	var html = '';
	$.ajax({
		url: baseUrl + "personal/getUserAddress",
		async: false,
		success: function(res) {
			if (res.code === SUCCESS) {
				if (res.msg.count == 0) {
					var html = '<div class="invoice_bottom site-demo-button add_address" id="layerDemo">'
					html +=
						'<div style="clear: both;" data-method="offset" data-type="auto" class="layui-btn layui-btn-normal contents">'
					html += '<div>'
					html += '<img src="imgs/newly.png" style="display: block;margin-top:35px;margin-left:49%">'
					html += '<p style="color: #247dd0;font-size:14px">新增地址信息</p>'
					html += '</div>'
					html += '</div>'
					html += '</div>'
					$(".submit_detail:eq(0)").html(html)
					return false;
				}
				$(res.msg.data).each(function() {
					if (this.ban === "1") {
						$(".buy_name").text(this.name);
						$(".buy_tel").text(this.tel);
						$(".buy_address").text(this.province + "," + this.address);
					}
				})
			}
		}
	})
	$.ajax({
		url: baseUrl + "personal/getUserLightning",
		async: false,
		success: function(res) {
			if (res.code === SUCCESS) {
				$(res.msg).each(function() {
					if (this.ban === "1") {
						$('.types').text(this.types === "0" ? '增值税普通发票' : '增值税专用发票')
						$('.light_name').text(this.name);
						$('.light_code').text(this.code)
					}
				})
			} else {
				var html = '<div class="invoice_bottom site-demo-button add_invoice" id="layerDemo">'
				html +=
					'<div style="clear: both;" data-method="offset" data-type="auto"	class="layui-btn layui-btn-normal contents">'
				html += '<div>'
				html += '<img src="imgs/newly.png" style="display: block;margin-top:35px;margin-left:49%">'
				html += '<p style="color: #247dd0;font-size:14px">新增发票信息</p>'
				html += '</div>'
				html += '</div>'
				html += '</div>'
				$(".submit_detail:eq(1)").html(html)
				return false;
			}
		}
	})
	$.ajax({
		url: baseUrl + "cart/getGoodsByCartIAndId",
		async: false,
		data: {
			array: array
		},
		success: function(res)
		{
			if (res.code === SUCCESS) {
				var html = '';
				var count = 0;
				var price = 0;
				$(res.msg).each(function() {
					html += '<div class="contents_area">'
					html += ' <div class="name_area">' + this.shopname + '</div>';
					$(this.goods).each(function() {
						html += '<div class="detail_area">';						
						html += ' <div><img src="' + baseImgUrl + this.src + '"></div>'
						html += '<div>';
						html += ' <p class="names">' + this.name + '</p>'
						html += '<p>' + this.model + '</p>'
						html += '</div>';
						html += '<div>' + this.price + '元</div>'
						html += '<div class="layui-form">'
						html += '<div class="layui-inline">'
						html +=
							'<div style="height: 38px; line-height: 38px; cursor: pointer; margin-top:53px; border-bottom: 1px solid #e2e2e2;width: 200px;font-size: smaller" class = "test-item" title="开始 至 结束">'

						html += '</div></div> </div>'
						html += '<div>' + this.num + '</div>'
						html += ' <div style="color: #e31f1f;">' + (this.price * this.num) + '元</div>'
						html += '</div>';
						html += '<div class="remarks">商品备注：<input type="text" class="node"><input name="uid" style="display:none" value="'+this.instrumentuid+'"></div>'
						count += (this.num * 1);
						price += (this.price * this.num);
					})
					html += '</div>'
				})
				$(".order_contents").html(html)
				$(".count").text(count);
				$(".allprice").text(price)
			}
		}
	})
	lay('.test-item').each(function() {
		laydate.render({
			elem: this,
			range: '~',
			format: 'yyyy-MM-dd',
			min: 0
		});
	})
	layer.close(load)
	$(".add_address").on("click", function() {
		layer.open({
			type: 2,
			content: './new_address.html?type=0',
			area: ['800px', '600px'],
			scrollbar: false,
			end: function() {
				history.go(0)
			}
		})
	})
	$('.add_invoice').on("click", function() {
		layer.open({
			type: 2,
			content: './individual_invoice.html',
			area: ['480px', '300px'],
			scrollbar: false,
			success: function() {
				form.render("radio")
			},
			end: function() {
				history.go(0)
			}
		})
	})
	$(".address_edit").on("click", function() {
		var html = "";
		html += '<table class="layui-table" lay-even="" lay-skin="row">'
		html += '<colgroup>'
		html += '<col width="100">'
		html += '<col width="150">'
		html += '<col width="250">'
		html += '<col>'
		html += '</colgroup>'
		html += '<thead>'
		html += '<tr>'
		html += '<th>收货人</th>'
		html += '<th>电话</th>'
		html += '<th>地址</th>'
		html += '<th>操作</th>'
		html += '</tr> '
		html += '</thead>'
		html += '<tbody>'
		$.ajax({
			url: baseUrl + "personal/getUserAddress",
			async: false,
			success: function(res) {
				if (res.code === SUCCESS) {
					$(res.msg.data).each(function() {
						html += '<tr>'
						html += '<td>' + this.name + '</td>'
						html += '<td>' + this.tel + '</td>'
						html += '<td>' + this.province + "," + this.address + '</td>'
						html += '<td><button type="button" class="layui-btn  layui-btn-xs layui-btn-radius use_address" value="'+this.uid+'">使用此地址</button></td>'
						html += '</tr>'
					})
				}
			}
		})
		html += '</tbody>'
		html += '</table>'
		layer.open({
			type: 1,
			skin: 'layui-layer-demo', //样式类名
			closeBtn: 0, //不显示关闭按钮
			anim: 2,
			shadeClose: true, //开启遮罩关闭
			content: html,
			area: "600px",
			success: function(a,b) {
				console.log($(this))
				console.log(a)
				console.log(b)
				$(a).on("click",'.use_address',function(){
					updateAddressBan($(this).attr("value"))
				})
				function updateAddressBan(uid) {
					$.ajax({
						url: baseUrl + "personal/updateAddressBan",
						xhrFields: {
							withCredentials: true
						},
						crossDomain: true,
						data: {
							uid: uid
						},
						success: function(res) {
							if (res.code === SUCCESS) {
								layer.closeAll()
							}
						}
					})
				}
			},
			end: function() {
				history.go(0)
			}
		})
	})
	function getTypes(type){
		if(type==="0"){
			return "增值税普通发票"
		} else {
			return "增值税专用发票"
		}
	}
	$(".light_edit").on("click",function(){
		var html = "";
		html += '<table class="layui-table" lay-even="" lay-skin="row">'
		html += '<colgroup>'
		html += '<col width="100">'
		html += '<col width="150">'
		html += '<col width="250">'
		html += '<col>'
		html += '</colgroup>'
		html += '<thead>'
		html += '<tr>'
		html += '<th>发票类型</th>'
		html += '<th>发票抬头</th>'
		html += '<th>纳税识别号</th>'
		html += '<th>操作</th>'
		html += '</tr>'
		html += '</thead>'
		html += '<tbody>'
		$.ajax({
			url: baseUrl+"personal/getUserLightning",
			async: false,
			success: function(res) {
				if (res.code === SUCCESS) {
					$(res.msg).each(function() {
						html += '<tr>'
						html += '<td>' + getTypes(this.types) + '</td>'
						html += '<td>' + this.name + '</td>'
						html += '<td>' + this.code + '</td>'
						html += '<td><button type="button" class="layui-btn  layui-btn-xs layui-btn-radius use_invoice" value="'+this.uid+'">使用此地址</button></td>'
						html += '</tr>'
					})
				}
			}
		})
		
		html += '</tbody>'
		html += '</table>'
		layer.open({
			type: 1,
			skin: 'layui-layer-demo', //样式类名
			closeBtn: 0, //不显示关闭按钮
			anim: 2,
			shadeClose: true, //开启遮罩关闭
			content: html,
			area: "600px",
			success: function(a,b) {
				console.log($(this))
				console.log(a)
				console.log(b)
				$(a).on("click",'.use_invoice',function(){
					updateLightningBan($(this).attr("value"))
				})
				function updateLightningBan(uid) {
					$.ajax({
						url:baseUrl+"personal/updateLightningBan",
						xhrFields: {
							withCredentials: true
						},
						crossDomain: true,
						data: {
							uid: uid
						},
						success: function(res) {
							if (res.code === SUCCESS) {
								layer.closeAll()
							}
						}
					})
				}
			},
			end: function() {
				history.go(0)
			}
		})
	})
	$(".save_order").on("click",function(){
		var load = layer.load(2, {
			shade: [0.2, '#fff'],
			content: '正在提交订单...',
			success: function(layerContentStyle) {
				layerContentStyle.find('.layui-layer-content').css({
					'padding-top': '35px',
					'text-align': 'left',
					'width': '120px'
				});
			}
		});
		var datas=new Array()
		var baseData={}
		var result={}
		baseData.ordernode=$('.order_node').val()
		$(".contents_area").each(function(){
			var data={};
			var time=$(this).find(".test-item").text()===""?"":$(this).find(".test-item").text().split("~")
			data.uid=$(this).find('[name=uid]').val()
			data.node=$(this).find('.node').val()
			data.starttime=time===""?"":time[0]
			data.endtime=time===""?"":time[1]
			datas.push(data)
		})
		result.order=baseData;
		result.goods=datas
		console.log(result)
		$.ajax({
			url:baseUrl+"order/initOrder",
			// async:false,
			data:{
				data:JSON.stringify(result)
			},
			success:function(res){
				if(res.code===SUCCESS){
						console.log(res)
						layer.close(load)
						window.location.href="./order_detail.html?uid="+res.msg
				}
			}
		})
	})
})
