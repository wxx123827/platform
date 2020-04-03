layui.use('laypage', function() {
	var laypage = layui.laypage;
	var cla_value=0;
	var sort_value=0;
	$(document).ready(function() {
		$('.head').load("personal_head.html");
		$(".center_middle").html('<span>'+getUrlSearch("n")+'</span>')
		$('.foot').load("foot.html");
		var sid = getUrlSearch("s");
		getGoodsBySort(sid)
		getGoodsByShop(sid, 1, 10, cla_value, sort_value);
		var result = JSON.parse(sessionStorage.getItem("provider_more"));
		
		$(document).on("click", "[name=cla]", function() {
			$("[name=cla]").css("color", "");
			$(this).css("color", "#e31f1f")
			cla_value=$(this).attr("value");
			getGoodsByShop(sid, 1, 10, cla_value, sort_value);
			
		})
		$(document).on("click", "[name=sort]", function() {
			$("[name=sort]").css("color", "");
			$(this).css("color", "#e31f1f")
			sort_value=$(this).attr("value");
			getGoodsByShop(sid, 1, 10, cla_value, sort_value);
		})
	})
	function getGoodsBySort(sid) {
		$.ajax({
			url: baseUrl + "shop/getGoodsBySort",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			data: {
				sid: sid,
			},
			success: function(res) {
				if (res.code === SUCCESS) {
					var html = "";
					$(res.msg).each(function(i) {
						html += '<a href="javascript:;" name="cla" class="cla_' + i + '" value=\'' + this.uid + '\'>' + this.name +
							'</a>';
					})
					$(".classifty").append(html);
				}
			}
		})
	}

	function getGoodsByShop(sid, num, size, cid, sort) {
		$.ajax({
			url: baseUrl + "shop/getGoodsByShop",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			data: {
				sid: sid,
				num: num,
				size: size,
				cid: cid,
				sort: sort
			},
			success: function(res) {
				if (res.code === SUCCESS) {
					var html = "";
					$(res.msg.list).each(function() {
						html += getGoodsHtml(this);
					})
					$('.provider_content').html(html);
					laypage.render({
						elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
						count: res.msg.totalRow, //数据总数，从服务端得到
						limit: res.msg.pageSize,
						curr: res.msg.pageNumber,
						jump: function(obj, first) {
							if (!first) {
								getGoodsByShop(sid, obj.curr, obj.limit, cla_value, sort_value)
								//do something
							}
						}
					});
				}

			}
		})
	}
})
