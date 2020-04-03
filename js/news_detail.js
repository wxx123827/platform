var baseUrls="http://192.168.31.107:9100/"
$(document).ready(function() {
	$('.head').load("personal_head.html");
	$('.foot').load("foot.html");
	AllNewsType();
	getAnnouncement();
	getNewsByTime();
	var detail=JSON.parse(sessionStorage.getItem("newDetail"));
	console.log(detail)
	$(".news_title").html('<h3>'+detail.data.newstitle+'</h3>');
	$(".news_time").html('<span>来源：新华网'+'</span><span style="margin-left:50px">日期：'+dateFtt("yyyy-MM-dd hh:mm:ss", detail.data.creattime)+'</span>');
	$(".content_detail").html(detail.data.newscontent);
})
$(document).on("mouseover", ".nav_area .news_tab a", function () {
	$(this).addClass("active").siblings().removeClass("active");
})
$(document).on("mouseleave", ".nav_area .news_tab a", function () {
	$(".nav_area .news_tab a").removeClass("active")
})
function AllNewsType() {
	$.ajax({
		url: baseUrls + "news/getAllNewsType",
		type: "get",
		success: function (res) {
			if (res.code === SUCCESS) {
				// console.log(res)
				var html=""
				var typeid=''
				$.each(res.msg, function (i, n) {
					html += '<a href="#">' + n.name + '</a>';
					if(n.sorts==="1"){
						console.log(n.uid)
						typeid=n.uid;
					}				
				})
				// console.log(typeid)
				$(".news_tab").html(html)
				getNewsByType(typeid,1,6)					
			}
		}
	})
}

//列表详情
function getNewsByType(typeid,num,size) {
	$.ajax({
		url: baseUrls + "news/getNewsByType",
		type: "get",
		data: {
			typeid:typeid,
			num: num,
			size: size,
		},
		success: function (res) {
			if (res.code === SUCCESS) {
				// console.log(res)
				var html=""
				$.each(res.msg.list, function (i, n) {
					html+=' <div class="message">'
					html+='<div class="message_left"><img src="'+n.newbanner+'"></div>'
					html+='<div class="message_right">'
					html+='<h3>'+n.newstitle+'</h3>'
					html+='<div class="article" style="font-size: 14px;color: #666666;line-height: 1.8;height: 60px;overflow:hidden">'+n.newscontent+''
					html+= '</div>'
					html+= '<ul class="message_info">'
					html+= '<li class="source">来源：'+n.newssource+'</li>'
					html+= '<li class="times">日期：' + dateFtt("yyyy-MM-dd", n.creattime)+'</li>'
					html+= '<li class="praise">'
					html+= '<i class="layui-icon layui-icon-praise praise_img" style="font-size: 14px;color: #999999;"></i>'
					html+= '<span style="padding-left: 2px;font-size: 12px;color: #999999;" class="collect_text">'+n.star+'</span></li>'
					html+= '</ul>'
					html+= '</div></div>'
				})
				$(".list_detail").html(html)
			
			}
		}
	})
}
//获取右侧新闻
function getNewsByTime() {
	var htmls = "";
	$.ajax({
		url: baseUrls + "news/getNewsByTime",
		data: {
			limit: 10
		},
		success: function(res) {
			if (res.code === SUCCESS) {
				// console.log(res);
				$.each(res.msg, function(i, n) {
					htmls+='<li onClick=getNewsDetail(\'' + n.uid + '\')><a>' + n.newstitle + '</a></li>'
				})
			}
			$(".message_area").html(htmls);
		}
	})
}

//获取右侧公告
function getAnnouncement(){
	var htmls="";
	$.ajax({
		url:baseUrls + "news/getAnnouncement",
		data: {
			limit:10
		},
		success: function(res){
			if (res.code === SUCCESS) {
				// console.log(res)
				
				$.each(res.msg, function (i, n) {
					htmls+='<li onClick=getAnnouncementDetail(\'' + n.uid + '\')><span>'+n.uid+'</span><a>' + n.announcementsite + '</a></li>'
				})
			}
		$(".notice_area").html(htmls)
			
		}
	})
}
 $(".previous_posts").click(function(){
	var detail=JSON.parse(sessionStorage.getItem("newDetail"));
	console.log(detail)
	$(".news_title").html('<h3>'+detail.prev.newstitle+'</h3>');
	$(".news_time").html('<span>来源：新华网'+'</span><span style="margin-left:50px">日期：</span>');
	$(".content_detail").html(detail.prev.newscontent);
})
$(".next_chapter").click(function(){
	var detail=JSON.parse(sessionStorage.getItem("newDetail"));
	console.log(detail)
	$(".news_title").html('<h3>'+detail.next.newstitle+'</h3>');
	$(".news_time").html('<span>来源：新华网'+'</span><span style="margin-left:50px">日期：</span>');
	$(".content_detail").html(detail.next.newscontent);
})

