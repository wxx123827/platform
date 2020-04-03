var baseUrls = "http://192.168.31.107:9100/";
layui.use(['laypage', 'carousel'],function() {
	var laypage = layui.laypage;
	var carousel = layui.carousel;
	$(document).ready(function() {
		$('.head').load("personal_head.html");
		$('.foot').load("foot.html");
		AllNewsType();
		getAnnouncement();
		getNewsByTime();
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
						if(n.uid==="1"){
							console.log(n.uid)
                            typeid=n.uid;
						}				
					})
					console.log(typeid)
					$(".news_tab").html(html)
					getNewsByType(typeid,1,6)
					getNewsTopByType(typeid)					
				}
			}
		})
	}
	$(document).on("click", ".nav_area .news_tab a:nth-child(1)", function () {
		getNewsByType(1,1,6)
		getNewsTopByType(1)	
	})
	$(document).on("click", ".nav_area .news_tab a:nth-child(2)", function () {
		getNewsByType(2,1,6)
		getNewsTopByType(2)	
	})
	$(document).on("click", ".nav_area .news_tab a:nth-child(3)", function () {
		getNewsByType(3,1,6)
		getNewsTopByType(3)	
	})
	//左侧信息
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
					console.log(res)
					var html=""
					$.each(res.msg.list, function (i, n) {
						html+=' <div class="message" onClick=getNewsDetail(\'' + n.uid + '\')>'
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
					console.log(res)
					$.each(res.msg, function (i, n) {
						htmls+='<li onClick=getAnnouncementDetail(\'' + n.uid + '\')><span>'+(i+1)+'</span><a>' + n.announcementsite + '</a></li>'
					})
				}
			$(".notice_area").html(htmls)
				
			}
		})
	}
	//获取新闻首页上的banner
	function getNewsTopByType(typeid){
		var html="";
		$.ajax({
			url:baseUrls + "news/getNewsTopByType",
			data: {
				typeid:typeid
			},
			success:function(res){
				if(res.code === SUCCESS){
					console.log(res)
					// html += '<div><img src="' + res.msg[0].newbanner +
					// '" style="width:100%;height:100%;object-fit:fill"><div>';
                    // html+= '<div class="list_title">'+ res.msg[0].newssource+'</div>'
					$.each(res.msg, function (i, n) {
					html += '<div><img src="' +  n.newbanner +
					'" style="width:100%;height:280px;object-fit:fill"><div>';
                    html+= '<div class="list_title">'+n.newssource+'</div>'
				})
				$(".list_imgs").html(html)
				carousel.render({
					elem: '#lists',
					width: '100%', //设置容器宽度
					arrow: 'always', //始终显示箭头
					autoplay: true, //自动切换
                    interval: 1000 //切换的时间间隔   
				});
			}
		}
	})
	}
	
	//分页
	// laypage.render({
	//     elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
	//     count: data.totalRow, //数据总数，从服务端得到
	//     limit: data.pageSize,
	//     curr: data.pageNumber,
	// 	jump: function(obj, first){
	// 	    //obj包含了当前分页的所有参数，比如：
	// 	    console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
	// 	    console.log(obj.limit); //得到每页显示的条数   
	// 	    //首次不执行
	// 	    if(!first){
	// 			getNewsList(obj.curr,obj.limit)
	// 	      //do something
	// 	    }
	// 	  }
	//   });
	
})
	
