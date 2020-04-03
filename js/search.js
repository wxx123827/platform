$(document).ready(function() {
	if (userUid != 'null' && userUid != null) {
		if (userJoinStatus) {
			$(".punlish_container").html('<a href="javascript:;"><button class="publish">一键发布</button></a>');
		
		}
	}else{
		$(".punlish_container").css("display","none")
	}
	hots();
})
$(document).on("mouseenter", ".publish", function () {
	$(".tab_nav").css("display", "block")
})

$(document).on("mouseleave", "#nav_box", function () {
	$(".tab_nav").css("display", "none")
})

$('.go_search').on('click', function() {
	sessionStorage.removeItem("searchText");
	var text = $('.key_words').val()
	search(text,1);
})


//点击搜索跳转到搜索页
function search(text,num) {
	// var html="";
	sessionStorage.removeItem("search")
	$.ajax({
		url: baseUrl + "search/search",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		type: "post",
		data: {
			text: text,
			num: num,
			size: 16
		},
		success: function(res) {
			if (res.code === SUCCESS) {
				sessionStorage.setItem("searchText",text);
				sessionStorage.setItem("search",JSON.stringify(res.msg));
				sessionStorage.setItem("issort",false);
				window.location.href="searchpage.html";
			}
		}
	});
};
//获取搜索热词
function hots() {
	var str = "";
	$.ajax({
		url: baseUrl + 'main/getHotSearch',
		type: 'get',
		data: {
			limit: 4,  
		},
		success: function(res) {
			if (res.code === SUCCESS) {
				$.each(res.msg, function(i, n) {
					str += '<a href="#" value="' + n + '" class="hot">' + n + '</a>'
				})
				$("#hotWords").html(str)
			}
		}
	})
}
$(document).on("click", ".hot", function() {
	search($(this).attr("value"),1) 
})
$("#search dl").on('click', 'dd', function() {
	var key_text = $(this).text(),
		href = $(this).attr('data-href');
	$('#search').attr('action', href);
	$(this).siblings('dt').text(key_text);
	$(this).parent('dl').find('dd').css('visibility', 'hidden');
}).on('mouseenter', function() {
	$(this).find('dd').css('visibility', 'visible');

}).on('mouseleave', function() {
	$(this).find('dd').css('visibility', 'hidden');
});

//首页主导航的下拉样式
function drop_down_nav() {
	$('#drop_down_nav li.fl').each(function(i, v) {
		var offsetLeft = $(v).offset().left + $(v).width() / 2 + 16;
		if ($(v).find('.dropdown_list_container').length > 0) {
			var list_elem = $(v).find('.dropdown_list_container .dropdown_list'),
				list_width = list_elem.width(),
				list_height = list_elem.height() + 56,
				dropdown_list_item_left = $(v).find('.dropdown_list_item').offset().left;
			list_elem.css({
				'left': (offsetLeft - dropdown_list_item_left) + 'px',
				'margin-left': -list_width / 2 + 'px'
			});
			list_elem.attr('data-height', list_height).attr('data-left', offsetLeft)
		}
	});  
}
$('#drop_down_nav').on('mouseenter', ' li.fl', function() {
	drop_down_nav();
	if ($(this).find('.dropdown_list_container').length > 0) {
		var list_elem = $(this).find('.dropdown_list_container .dropdown_list'),
			list_height = list_elem.attr('data-height'),
			list_left = parseFloat(list_elem.attr('data-left')) - 16;
		$('#drop_down_nav .trangel').animate({
			'left': list_left + 'px'
		}, 300).show();
		$(this).find('.dropdown_list_container').css('height', list_height + 'px')
	}
}).on('mouseleave', ' li.fl', function() {
	$(this).find('.dropdown_list_container').css('height', '0');
	$('#drop_down_nav .trangel').hide();
});
