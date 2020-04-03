$(document).ready(function() {
	$('.head').load("head.html");
	$('.search').load("search.html");
	$('.class_nav').load("class_nav.html");
	$('.foot').load("foot.html");
	var data = JSON.parse(sessionStorage.getItem("classifysearch"))
	console.log(data)
	if (data.totalRow != 0) {
		var html = "";
		$(".search_text").html('<span class=\"all_typetext\">全部分类></span><span class=\"shiboqi\">' + sessionStorage.getItem("classifysearchText") + '</span>')
		$.each(data.list, function(i, n) {
			html+=getGoodsHtml(n)
		})
		$('.search_list').html(html)
		layui.use('laypage', function() {
			var laypage = layui.laypage;
			laypage.render({
				elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
				count: data.totalRow, //数据总数，从服务端得到
				limit: data.pageSize,
				curr: data.pageNumber, 
				jump: function(obj, first) {
					if (!first) {
						if (sessionStorage.getItem("issort")=="true") {
							Get_AJAXS(obj.curr,sessionStorage.getItem("classifysortdata"));
						} else {
							classifySearch(sessionStorage.getItem("classifysearchText"), obj.curr);
						}
					}
				}
			});
		});
		$("#search_cla").commonSearch(data.sort, function(param) {});
	} else {
		var html = "";
		html += ' <div class=\"remind_noresult\"><img src = \"imgs/noresult.png\"><p class = \"sorry\" > 对不起, 暂未找到与 ' +
			sessionStorage.getItem("classifysearchText") + '分类下相匹配的仪器 </p></div>'
		// html += '<p class = \"issue\" > 您可以 <a href = \"#\" style = \"color: #247dd0\" > 一键发布 </a>该仪器</p ></div> ';
		html += '<div class = \"related_recommend\" > <p> 相关推荐 </p> </div> <div class = \"related_list\" >';
		$.each(data.data, function(i, n) {
			html+=getGoodsHtml(n)
		})
		html += "</div>";
		$('.nav_middle').html(html);
		//查询无结果页面
	}
})
