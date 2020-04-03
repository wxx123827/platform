var baseUrls = "http://192.168.31.107:9100/";
// var checkUserJoinAjax;
layui.use(['rate', 'element', 'carousel'], function() {
	var carousel = layui.carousel;
	var $ = layui.jquery;
	var rate = layui.rate;
	var element = layui.element;
	//页面加载时运行的方法
	$(document).ready(function() {
		$('.head').load("head.html");
		$('.search').load("search.html");
		$('.foot').load("foot.html");
		getBanner();
		var html = '';
		if (userUid === "null" || userUid === null) {
			html += '<img src="imgs/admin_icon.png">';
			html += '<a href="#">Hi,请登录</a>';
			$('.banner_right_img').html(html);
			html = '';
			html += '<a href="login.html">登录</a>';
			html += '<a href="register.html">注册</a>';
			$('.banner_right_middle').html(html);
		} else {
			if (userSrc === "" || userSrc === null) {
				html += '<img src="imgs/admin_icon.png">';
			} else {
				html += '<img src="' + baseImgUrl + userSrc + '">';
			}
			html += '<a href="#">Hi,' + userTel + '</a>';
			$('.banner_right_img').html(html);
			html = '';
			html += '<a href="#" class="logout">退出</a>';
			checkUserJoinAjax()
			if (!userJoinStatus) {
				html += '<a href="settle_select.html">入驻</a>';
			} else {
				html += '<a href="essential_information.html">个人中心</a>';
			}
			$('.banner_right_middle').html(html);
		}
		getNewsByTime();
		getClassify();
		getAdvertising();
		getRecommend();  //精品推荐
		getHotstyle(); //热销爆品
		getHotShop(); //优质店铺
		getReList();  //获取推荐列表
	})
	//点击右侧更多按钮
	$(".news_more").on("click", function() {
		window.location.href = "./news_list.html";
	})
   //切换公告
   $(".announcement").on("click",function(){
	   $(".news_page").css("color","#666666")
	   $(".announcement").css("color","#247dd0")
		var html = "";
		$.ajax({
			url: baseUrls + "news/getAnnouncement",
			data: {
				limit: 4
			},
			success: function(res) {
				if (res.code === SUCCESS) {
					console.log(res);
					$.each(res.msg, function(i, n) {
						html += '<p class="new" onClick=getAnnouncementDetail(\'' + n.uid + '\')>' + n.announcementsite + '</p>';
					})
				}
				$(".new_list").html(html);
			}
		})

   })
   //切换新闻
   $(".news_page").on("click",function(){
	$(".news_page").css("color","#247dd0")
	$(".announcement").css("color","#666666")
	var html = "";
	$.ajax({
		url: baseUrls + "news/getNewsByTime",
		data: {
			limit: 4
		},
		success: function(res) {
			if (res.code === SUCCESS) {
				console.log(res);
				$.each(res.msg, function(i, n) {
					html += '<p class="new" onClick=getNewsDetail(\'' + n.uid + '\')>' + n.newstitle + '</p>';
				})
			}
			$(".new_list").html(html);
		}
	})

})
	//获取所有banner图
	function getBanner() {
		var html = "";
		$.ajax({
			url: baseUrl + "main/getBanner",
			// async: false,
			success: function(res) {
				if (res.code === SUCCESS) {
					$.each(res.msg, function(i, n) {
						switch (n.sorts) {
							case "1":
								html += '<div><img src="' + baseImgUrl + n.pictureaddress +
									'" style="width:100%;height:100%;object-fit:fill"></div>';
								break;
							case "2":
								html += '<div><img src="' + baseImgUrl + n.pictureaddress +
									'" style="width:100%;height:100%;object-fit:fill"></div>';
								break;
							case "3":
								html += '<div><img src="' + baseImgUrl + n.pictureaddress +
									'" style="width:100%;height:100%;object-fit:fill"></div>';
								break;
							case "4":
								html += '<div><img src="' + baseImgUrl + n.pictureaddress +
									'" style="width:100%;height:100%;object-fit:fill"></div>';
								break;
							case "5":
								html += '<div><img src="' + baseImgUrl + n.pictureaddress +
									'" style="width:100%;height:100%;object-fit:fill"></div>';
								break;
							case "6":
								html += '<div><img src="' + baseImgUrl + n.pictureaddress +
									'" style="width:100%;height:100%;object-fit:fill"></div>';
								break;
						}
					})
					// $('.banner_list').html(html);
				} else {
					html = defaultBanner;
				}
				$('.banner_list').html(html);
				carousel.render({
					elem: '#myCarousel',
					width: '100%', //设置容器宽度
					arrow: 'always' //始终显示箭头
				});
			},
			error: function(res) {
				html = defaultBanner;
				$('.banner_list').html(html);
				carousel.render({
					elem: '#myCarousel',
					width: '100%', //设置容器宽度
					arrow: 'always' //始终显示箭头
				});
			},

		});

	}

	//获取所有新闻
	function getNewsByTime() {
		var html = "";
		$.ajax({
			url: baseUrls + "news/getNewsByTime",
			data: {
				limit: 4
			},
			success: function(res) {
				if (res.code === SUCCESS) {
					// console.log(res);
					$.each(res.msg, function(i, n) {
						html += '<p class="new" onClick=getNewsDetail(\'' + n.uid + '\')>' + n.newstitle + '</p>';
					})
				}
				$(".new_list").html(html);
			}
		})
	}

	//获取首页广告位广告
	function getAdvertising() {
		var html = "";
		var htmls ="";
		$.ajax({
			url: baseUrls + "index/v2/getAdvertising",
			success: function(res) {
				if (res.code === SUCCESS) {
					html += '<img src="'+ baseImgUrl + res.msg[0].img +'">'
					htmls += '<img src="'+ baseImgUrl + res.msg[1].img +'">'
				}
				$(".one_shop").html(html);
				$(".free_enter").html(htmls)
			}
		})
	}

	//获取精品推荐
	function getRecommend() {
		var html = "";
		var htmls= "";
        $.ajax({
			url: baseUrls + "index/v2/getRecommend",
			success: function(res) {
				if (res.code === SUCCESS) {
					$.each(res.msg, function(i, n) {
						if(n.isbanner === "1"){
							htmls+='<img src="'+ baseImgUrl + n.banner +'">'
						}
						html+= '<div class="recommendation_goods">'
						html+= '<img src="'+ baseImgUrl + n.img + '">'
						html+= '<ul>'
						html+= '<li>' + n.name + '</li>'
						html+= '<li>' +n.model+ '</li>'
						html+= '</ul></div>'				
					})
				}
				$(".goods_left").html(htmls)
				$(".goods_right").html(html)
			}
		})
	}

	//获取首页爆款
	function getHotstyle() {
		var html = "";
		var htmls= "";
        $.ajax({
			url: baseUrls + "index/v2/getHotstyle",
			success: function(res) {
				if (res.code === SUCCESS) {
					$.each(res.msg, function(i, n) {
						if(n.isbanner === "1"){
							htmls+='<img src="'+ baseImgUrl + n.banner +'">'
						}
						html+= '<div class="hots_goods">'
						html+= '<img src="'+ baseImgUrl + n.img + '">'
						html+= '<ul>'
						html+= '<li>' + n.name + '</li>'
						html+= '<li>' +n.model+ '</li>'
						html+= '</ul></div>'				
					})
				}
				$(".good_left").html(htmls)
				$(".good_right").html(html)
			}
		})
	}

	//获取优质店铺
	function getHotShop(){
		var html = "";
		$.ajax({
			url: baseUrls + "index/v2/getHotShop",
			async: false,
			success: function(res) {
				if (res.code === SUCCESS) {
					$(".shops_lists").html('');
					console.log(res)
					$.each(res.msg.slice(0,4), function(i,n) {
						html = "";
						html+= '<div class="shops_info">'
						html+= '<img src="'+ baseImgUrl + n.logo +'">'
						html+= '<div class="shop_detail">'
						html+= '<p id="shop_score' + i + '">' + n.start + '</p>'
						html+= '<p>' + n.name + '</p>'
						html+= '</div></div>'
						$(".shops_lists").append(html)
						rate.render({
							elem: '#shop_score' + i,
							value: n.start,
							readonly: true,
							half: true,
							theme: '#e31f1f',
						});					
					})
				}
				
			}
		})
	}

	//获取底部推荐
	function getReList(){
		var html = "";
		$.ajax({
			url: baseUrls + 'index/v2/getReList',
			success: function(res){
				if(res.code === SUCCESS){
					$.each(res.msg, function(i,n){
						html+='<div class="efficient">'
						html+='<div class="efficient_title">'
						html+='<p>'+n.reName+'</p>'
						html+='</div>'
						html+='<div class="efficient_more">'
						html+='<a href="javascript:;">MORE<span style="font-size: 17px;">>></span></a>'
						html+='</div>'
						html+='<div class="efficient_content">'
						$.each(n.data.slice(0,4), function(i,o){
						if(o.uid === "1"){
							html+='<div class="efficient_img">'
							html+='<img src="'+ baseImgUrl + o.img +'">'
							html+='</div>'
						}	
						html+='<div class="efficient_detail">'
						html+='<img src="'+ baseImgUrl + o.img + '">'
						html+='<ul>'
						html+='<li>'+o.name+'</li>'
						html+='<li>'+o.model+'</li>'
						html+='</ul>'
						html+='</div>'			
					})
					html+='</div>'
					html+='</div>'
					})
				}
				$(".other_recommend").html(html)
			}
		})
	}
	
	//退出
	$(document).on('click', '.logout', function() {
		$.ajax({
			url: baseUrl + "user/logout",
			success: function(res) {
				if (res.code === SUCCESS) {
					sessionStorage.setItem("userUid", null);
					sessionStorage.setItem("userTel", null);
					sessionStorage.clear();
					window.location.href = "./login.html";
					return false;
				}
			}
		})
	})
	
});

