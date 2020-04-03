var baseUrls="http://192.168.31.107:9100/"
$(document).ready(function() {
	$('.head').load("personal_head.html");
	$('.foot').load("foot.html");
	AllNewsType();
	getAnnouncement();
	getNewsByTime();
	var detail=JSON.parse(sessionStorage.getItem("announcementDetail"));
	console.log(detail)
	$(".news_title").html('<h3>'+detail.data.announcementsite+'</h3>');
	$(".news_time").html('<span>来源：新华网'+'</span><span style="margin-left:50px">日期：'+dateFtt("yyyy-MM-dd hh:mm:ss", detail.data.creattime)+'</span>');
	$(".content_detail").html(detail.data.announcementcontent);
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
				console.log(res)
				var html=""
				var typeid=''
				$.each(res.msg, function (i, n) {
					html += '<a href="#">' + n.name + '</a>';
					// if(n.sorts==="1"){
					// 	console.log(n.uid)
					// 	typeid=n.uid;
					// }				
				})
				console.log(typeid)
				$(".news_tab").html(html)			
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


