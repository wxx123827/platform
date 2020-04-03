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
		getClassify();
    })
	$(".classify").on('mouseover',function(){
		$("#classify").css("display","block");
	})
	
	$(".classify").on('mouseleave',function(){
		$("#classify").css("display","none");
		console.log(111)
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
});
