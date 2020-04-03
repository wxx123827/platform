$(document).ready(function() {
	$('.head').load("head.html");
	$('.search').load("search.html");
	$('.class_nav').load("class_nav.html");
	$('.foot').load("foot.html");
})

//仪器详情
$.ajax({
	url: baseUrl + 'goods/getDetail',
	xhrFields: {
		withCredentials: true
	},
	crossDomain: true,
	data: {
		uid: GetQueryString("uid"),
	},
	success: function(res) {
		console.log(res)
		if (res.code === SUCCESS) {
			var result = res.msg;
			$(".title").html("<a href=\"index.html\" style=\"font-size:14px;color:#999\">" + "首页>" + "</a>" + result.classifypath);
			$(".content").html("<img src='" + baseImgUrl + result.goodsimages[0].src + "'>");
			for (i in result.goodsimages) {
				$(".imgs_box").append('<a href=\"javascript:;\"><img src=\'' + baseImgUrl + result.goodsimages[i].src +
					'\'></a>')
			}
			var str = "";
			var str1 = "";
			switch (result.types) {
				case "1":
					str += "<div style=\"min-height: 235px;height:auto\">" + "<p class=\"product_introduce\">"+"仪器简介" + "</p><p>" + result.instrumentinfo.synopsis +
						"</p></div>"
					str += "<div style=\"min-height: 235px;height:auto\">" + "<p class=\"product_introduce\">"+"技术参数" + "</p><p>" + result.instrumentinfo.technicaldata +
						"</p></div>"
					str += "<div style=\"min-height: 235px;height:auto\">" + "<p class=\"product_introduce\">"+"应用范围" + "</p><p>" + result.instrumentinfo.ranges +
						"</p></div>"
					str1 += "<h2>" + result.name + "</h2>"
					str1 += "<div class=\"content_area\">"
					str1 += "<p>" + "仪器型号：" + "<span>" + result.model + "</span></p>"
					str1 += "<p>" + "仪器品牌：" + "<span>" + result.brand + "</span></p>"
					str1 += "<p>" + "应用领域：" + "<span>" + result.fieldsuid + "</span></p>"
					str1 += "<p>" + "购置日期：" + "<span>" + crtTimeFtt(result.buytime) + "</span></p>"
					str1 += "<p>" + "位置：" + "<span>" + result.province + result.city + result.area + "</span></p>"
					str1 += "</div>"
					// str1 += "<input type=\"button\" value=\"立即咨询\">"
					// str1 += "<input type=\"button\" value=\"一键下单\" style=\"margin-left:20px\">"
					str1 += "<input type=\"button\" class=\"addcart\" value=\"加入清单\" style=\"margin-left:20px\">"
					break;
				case "2":
					str += "<div style=\"min-height: 320px;height:auto\">" + "<p class=\"product_introduce\">"+"能力介绍" + "</p><p>" + result.instrumentinfo.synopsis +
						"</p></div>"
					str += "<div style=\"min-height: 320px;height:auto\">" + "<p class=\"product_introduce\">"+"技术指标" + "</p><p>" + result.instrumentinfo.technicaldata +
						"</p></div>"
					
					str1 += "<h2>" + result.name + "</h2>"
					str1 += "<div class=\"content_area\">"
					str1 += "<p>" + "业务类型：" + "<span>" + result.classifyname + "</span></p>"
					str1 += "<p>" + "报告资质：" + "<span>" + result.reportqualification + "</span></p>"
					str1 += "<p>" + "实验室所在地：" + "<span>" + result.province + result.city + result.area + "</span></p>"
					str1 += "</div>"
					// str1 += "<input type=\"button\" value=\"立即咨询\">"
					// str1 += "<input type=\"button\" value=\"一键下单\" style=\"margin-left:20px\">"
					str1 += "<input type=\"button\" class=\"addcart\" value=\"加入清单\" style=\"margin-left:20px\">"
					break;
				case "3":
					str += "<div style=\"min-height: 350px;height:auto\">" + "<p class=\"product_introduce\">"+"技术指标" + "</p><p>" + result.instrumentinfo.synopsis +
						"</p></div>"
					str += "<div style=\"min-height: 350px;height:auto\">" + "<p class=\"product_introduce\">"+"性能参数" + "</p><p>" + result.instrumentinfo.technicaldata +
						"</p></div>"
					str1 += "<h2>" + result.name + "</h2>"
					str1 += "<div class=\"content_area\">"
					str1 += "<p>" + "耗材品牌：" + "<span>" + result.brand + "</span></p>"
					str1 += "<p>" + "耗材类别：" + "<span>" + result.classifyname + "</span></p>"
					str1 += "<p>" + "位置：" + "<span>" + result.province + result.city + result.area + "</span></p>"
					str1 += "<p>" + "数量：" + "<span>" + result.stock + "</span></p>"
					str1 += "</div>"
					// str1 += "<input type=\"button\" value=\"立即咨询\">"
					// str1 += "<input type=\"button\" value=\"一键下单\" style=\"margin-left:20px\">"
					str1 += "<input type=\"button\" class=\"addcart\" value=\"加入清单\" style=\"margin-left:20px\">"
					break;
				case "4":
					str += "<div style=\"min-height: 700px;height:auto\">" + "<p class=\"product_introduce\">"+"资料简介" + "</p><p>" + result.instrumentinfo.synopsis +
						"</p></div>"
					str1 += "<h2>" + result.name + "</h2>"
					str1 += "<div class=\"content_area\">"
					str1 += "<p>" + "资料类别：" + "<span>" + result.classifyname + "</span></p>"
					str1 += "<p>" + "资料形式：" + "<span>" + result.dataform + "</span></p>"
					str1 += "<p>" + "金额：" + "<span>" + result.expectedrevenue + "</span></p>"
					str1 += "</div>"
					str1 += "<input type=\"button\" class=\"downloadfile\" uid=\""+result.uid+"\" value=\"立即下载\">"
					// str1 += "<input type=\"button\" value=\"一键下单\" style=\"margin-left:20px\">"
					str1 += "<input type=\"button\" class=\"addcart\" value=\"加入清单\" style=\"margin-left:20px\">"

					break;
				case "5":
					str += "<div style=\"min-height: 350px;height:auto\">" + "<p class=\"product_introduce\">"+"技能说明" + "</p><p>" + result.instrumentinfo.synopsis +
						"</p></div>"
					str += "<div style=\"min-height: 350px;height:auto\">" + "<p class=\"product_introduce\">"+"个人优势" + "</p><p>" + result.instrumentinfo.technicaldata +
						"</p></div>"
					str1 += "<h2>" + result.name + "</h2>"
					str1 += "<div class=\"content_area\">"
					str1 += "<p>" + "技能类别：" + "<span>" + result.classifyname + "</span></p>"
					str1 += "<p>" + "位置：" + "<span>" + result.province + result.city + result.area + "</span></p>"
					str1 += "<p>" + "服务周期：" + "<span>" + result.expectedrevenue + "/" + result.company + "</span></p>"
					str1 += "</div>"
					// str1 += "<input type=\"button\" value=\"立即咨询\">"
					// str1 += "<input type=\"button\" value=\"一键下单\" style=\"margin-left:20px\">"
					str1 += "<input type=\"button\" class=\"addcart\" value=\"加入清单\" style=\"margin-left:20px\">"
					break;
			}
			$(".introduction").html(str)
			$(".right_text").html(str1)
		}
	}
})
//日期转换
function dateFtt(fmt, date) { //author: meizz   
	var o = {
		"M+": date.month + 1, //月份   
		"d+": date.date, //日   
		"h+": date.hours, //小时   
		"m+": date.minutes, //分   
		"s+": date.seconds, //秒   
		"q+": Math.floor((date.month + 3) / 3), //季度   
		"S": date.time //毫秒   
	};
	var datas = new Date();
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (datas.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
$(document).on("click",".downloadfile",function(){
	window.location.href=baseUrl+"file/packagedownload?uid="+$(this).attr("uid")
})
function crtTimeFtt(value, row, index) {
	return dateFtt("yyyy-MM-dd", value); //直接调用公共JS里面的时间类处理的办法     
}
//获取机构和机构热门商品
$.ajax({
	url: baseUrl + 'goods/getShop',
	xhrFields: {
		withCredentials: true
	},
	crossDomain: true,
	data: {
		uid: GetQueryString("uid"),
	},
	success: function(res) {
		// console.log(res)
		if (res.code === SUCCESS) {
			var str = "";
			// str += "<div class=\"badge\">" + res.msg.panking + "</div>"
			// str += "<img src='" + baseImgUrl + res.msg.logo +
			// 	"' style=\"\" class=\"shops_icon\" onerror=javascript:this.src=\'./imgs/default.jpg\'>";
			str += "<p id = \"name\">" + res.msg.name + "</p>"
			str += "<p id = \"test\">" + res.msg.empiricalvalue + "</p>"
			
			str += "<p id=\"enter_shop\">" + "<a href=\"service_provider.html?s=" + res.msg.uid + "&n=" + res.msg.name +
				"\">" + "进入店铺" + "</a>" +
				"</p>"
			layui.use(['rate', 'element'], function() {
				var rate = layui.rate;
				var element = layui.element;
				element.init();
				for (var num = 0; num <= 4; num++) {
					rate.render({
						elem: '#test',
						value: res.msg.empiricalvalue,
						readonly: true,
						half: true,
						theme: '#FE0000'
					});
				}
			});
			$(".shop_info").html(str);
			str = "";
			$.each(res.msg.goods, function(i, n) {
				str += " <div class=\"recommend_list\" onClick=\"detail(\'" + String(n.uid) +
					"\')\">";
				str += "<img src='" + baseImgUrl + n.src + "'>";
				str += '<ul>';
				switch (n.types) {
					case "1":
						str += '<li>' + n.name + '</li>'
						str += '<li>' + n.model + '</li>';
						break;
					case "2":
						str += '<li>' + n.name + '</li>'
						str += '<li>' + n.classifyname + '</li>';
						break;
					case "3":
						str += '<li style=\'color:red\'>¥' + n.expectedrevenue + '</li>';
						str += '<li>' + n.name + '</li>'
						break;
					case "4":
						str += '<li>' + n.name + '</li>'
						str += '<li>' + n.classifyname + '</li>';
						break;
					case "5":
						str += '<li>' + n.name + '</li>'
						str += '<li>' + n.classifyname + '</li>';
						break;
				}
				str += "</ul></div>"

			})
			$(".hot_detail").append(str)
		}
	}
})
//获取推荐商品
$.ajax({
	url: baseUrl + 'goods/getRecommendGoods',
	xhrFields: {
		withCredentials: true
	},
	crossDomain: true,
	data: {
		uid: GetQueryString("uid"),
	},
	success: function(res) {
		if (res.code === SUCCESS) {
			var str = "";
			$.each(res.msg, function(i, n) {
				str += " <div class=\"recommend_list\" onClick=\"detail(\'" + String(n.uid) +
					"\')\">";
				str += "<img src='http://img.keyanwu.com/" + n.src + "'>";
				str += '<ul>';
				switch (n.types) {
					case "1":
						str += '<li>' + n.name + '</li>'
						str += '<li>型号:' + n.model + '</li>';
						break;
					case "2":
						str += '<li>' + n.name + '</li>'
						str += '<li>' + n.classifyname + '</li>';
						break;
					case "3":
						str += '<li style=\'color:red\'>¥' + n.expectedrevenue + '</li>';
						str += '<li>' + n.name + '</li>'
						break;
					case "4":
						str += '<li>' + n.name + '</li>'
						str += '<li>' + n.classifyname + '</li>';
						break;
					case "5":
						str += '<li>' + n.name + '</li>'
						str += '<li>' + n.classifyname + '</li>';
						break;
				}
				str += "</ul></div>"

			})
			$(".content_right").append(str)
		}
	}
})

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
//1. 给图片注册点击事件

$(document).on("click", '.imgs_box img', function() {
	$(document).find(".content img").attr("src", $(this).attr("src"))
})
if (userUid != "null" && userUid != null) {
	$.ajax({
		url: baseUrl + "personal/checkUserCollect",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		data: {
			uid: GetQueryString("uid"),
		},
		success: function(res) {
			if (res.code === SUCCESS) {
				$(".collect_img").removeClass("layui-icon-rate").addClass("layui-icon-rate-solid").css("color", "red");
				$(".collect_text").text("取消收藏")
			}
		}
	})
}
$("#collect").on("click", function() {
	if (!$(".collect_img").hasClass("layui-icon-rate-solid")) {
		addCollect(GetQueryString("uid"))
	} else {
		removeCollect(GetQueryString("uid"))
	}
})
$(document).on("click", ".addcart", function() {
	layui.layer.load(2);
	addUserCart();
})

function addUserCart() {
	$.ajax({
		url: baseUrl + "cart/addGoodsToCart",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		data: {
			goodsuid: GetQueryString("uid")
		},
		success: function(res) {
			if (res.code === SUCCESS) {
				layui.layer.msg("添加成功", {
					type: 1,
					time: 2000
				})
				layui.layer.closeAll('loading');
				return false;
			}
			layui.layer.msg("添加失败", {
				type: 1,
				time: 2000
			})
			layui.layer.closeAll('loading');
			return false;
		}
	})
}
