layui.use(['rate', 'element', 'carousel'], function() {
	var carousel = layui.carousel;
	var $ = layui.jquery;
	var rate = layui.rate;
	var element = layui.element;
$(document).ready(function () {
	$('.head').load("personal_head.html");
	$('.foot').load("foot.html");
	$(".center_middle").html('<p class="firm_name">' + getUrlSearch("n") + '<span>' + '收藏' + '</span>' + '</p><p class="enter_years"><e class="settle_year">' + "入驻第3年"  + '</e>'+'<e id="score">' +"</e></p>")
	rate.render({
	    elem: '#score',
		value: 5,
		readonly: true,
		half: true,
		theme: '#e31f1f'
		});
	var sid = getUrlSearch("s");
	getGoodsByShopLimit(sid);
})

function getGoodsByShopLimit(sid) {
	$.ajax({
		url: baseUrl + "shop/getGoodsByShopLimit",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		data: {
			sid: sid,
		},
		success: function (res) {
			console.log(res)
			if (res.code === SUCCESS) {
				var result = res.msg;
				var html = "";
				html += '<div class="provider_list">';
				html += '<div class="provider_title">';
				html += '<h2 style="float:left;">仪器设备<span>' + result.count.in + '台</span></h2>';
				html += '<a href="./provider_more.html?s=' + sid + '&n=' + getUrlSearch("n") + '" class="more">MORE>></a>';
				html += '</div>';
				html += '<div class="provider_content">';
				$(result.in).each(function () {
					html += getGoodsHtml(this);
				})
				html += '</div>';
				html += '</div>'
				html += '<div class="provider_list">';
				html += '<div class="provider_title">';
				html += '<h2 style="float:left;">实验室<span>' + result.count.lab + '台</span></h2>';
				html += '<a href="./provider_more.html?s=' + sid + '&n=' + getUrlSearch("n") + '" class="more">MORE>></a>';
				html += '</div>';
				html += '<div class="provider_content">';
				$(result.lab).each(function () {
					html += getGoodsHtml(this);
				})
				html += '</div>';
				html += '</div>'
				html += '<div class="provider_list">';
				html += '<div class="provider_title">';
				html += '<h2 style="float:left;">配件耗材<span>' + result.count.co + '台</span></h2>';
				html += '<a href="./provider_more.html?s=' + sid + '&n=' + getUrlSearch("n") + '" class="more">MORE>></a>';
				html += '</div>';
				html += '<div class="provider_content">';
				$(result.co).each(function () {
					html += getGoodsHtml(this);
				})
				html += '</div>';
				html += '</div>'
				html += '<div class="provider_list">';
				html += '<div class="provider_title">';
				html += '<h2 style="float:left;">知识库<span>' + result.count.kno + '台</span></h2>';
				html += '<a href="./provider_more.html?s=' + sid + '&n=' + getUrlSearch("n") + '" class="more">MORE>></a>';
				html += '</div>';
				html += '<div class="provider_content">';
				$(result.kno).each(function () {
					html += getGoodsHtml(this);
				})
				html += '</div>';
				html += '</div>'
				html += '<div class="provider_list">';
				html += '<div class="provider_title">';
				html += '<h2 style="float:left;">技能<span>' + result.count.skl + '台</span></h2>';
				html += '<a href="./provider_more.html?s=' + sid + '&n=' + getUrlSearch("n") + '" class="more">MORE>></a>';
				html += '</div>';
				html += '<div class="provider_content">';
				$(result.skl).each(function () {
					html += getGoodsHtml(this);
				})
				html += '</div>';
				html += '</div>'
				$('#goods_list').html(html);
			}

		}
	})
}
})