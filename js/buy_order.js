$(document).ready(function() {
	$('.head').load("personal_head.html");
	$('.nav_area').load("personal_nav.html", function(response, status, xhr) {
		$(document).find(".center_middle").html('<span>订单详情</span>')
	});
	$('.foot').load("foot.html");
})


$.ajax({
	url: baseUrl + "order/getOrderList",
	success: function(res) {
		if (res.code === SUCCESS) {
			var html = '';
			$(res.msg).each(function() {
				html += '<div class="layui-form-item">';
				html += '<div class="shops_name">';
				html += '<div style="float: left;">';
				html += '订单号：' + this.order.uid + '</div>'
				html += '<div class="view_details" uid="'+this.order.uid+'">查看详情</div>';
				html += '</div>'
				$(this.goods).each(function() {
					html += '<div class="shops_content">'
					html += '<img src="' + baseImgUrl + this.src + '" onerror="' + defaultImg +
						'" style="width:60px;height:60px">'
					html += '<span class="goods_name">' + this.goodsname + ''
					html += '<i style="display: block;font-style: normal;color: #999;">'+this.model+'</i></span>'
					html += '<span style="width:100px">' + goodsTypes(this.types) + '</span>'
					html += '<span style="width:150px">' + this.shopname + '</span>';
					html += '<div class="use_time">'
					html += '<p>' + DateMinus(this.starttime, this.endtime) + '天</p>'
					html += '<p>' + (this.starttime == null ? "" : crtTimeFttnothh(this.starttime)) + '</p>'
					html += '<p>' + (this.endtime == null ? "" : crtTimeFttnothh(this.endtime)) + '</p>',
						html += '</div>'
					html += '<span>' + getGoodsType(this.state) + '</span>'
					html += '<span>' + (this.goodsnum + this.goodsprice) + '</span>',
						html += '<span style="color: #247dd0;">归还物品</span>'
					html += '</div>'
				})
				html += '</div>'
			})
			$(".list").html(html)
		}
	}
})
$(document).on("click",'.view_details',function(){
	window.location.href="./order_detail.html?uid="+$(this).attr("uid")
})
function crtTimeFttnothh(value, id) {
	return dateFtts("yyyy-MM-dd", value); //直接调用公共JS里面的时间类处理的办法     
}

function dateFtts(fmt, date) { //author: meizz
	var o = {
		"M+": date.month + 1, //月份   
		"d+": date.date, //日   
		"h+": date.hours, //小时   
	};
	var datas = new Date();
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (datas.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

function DateMinus(date1, date2) { //date1:小日期   date2:大日期
	var days = date2.time - date1.time
	var day = parseInt(days / (1000 * 60 * 60 * 24));
	return day;
}

function getGoodsType(type) {
	switch (type) {
		case "0":
			return '已关闭';
			break;
		case "1":
			return '待付款';
			break;
		case "2":
			return '已付款';
			break;
		case "3":
			return '待发货';
			break;
		case "4":
			return '待收货';
			break;
		case "5":
			return '使用中';
			break;
		case "6":
			return '归还中';
			break;
		case "7":
			return '逾期';
			break;
		case "8":
			return '正常';
			break;
	}
}

function goodsTypes(type) {
	switch (type) {
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
