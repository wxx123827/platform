/**
 * 邮箱验证
 */
$(document).ready(function() {
	$('.head').load("head.html");
	$('.search').load("search.html");
	$('.foot').load("foot.html");
	var joinstatus=sessionStorage.getItem("joinStatusType");
	var html="";
	html+='<div style="text-align:center">';
	switch(joinstatus){
		case '0':
		html+='<p class="identidy_content" style="padding-top:160px"><img src="./imgs/success.png"></p>';
		html+='<p class="identidy_content">邮箱验证成功</p>';
		html+='<p class="identidy_content">您提交的材料将在两个工作日内审核，请耐心等待</p>';
		break;
		case '1':
		html+='<p class="identidy_content" style="padding-top:160px"><img src="./imgs/success.png"></p>';
		html+='<p class="identidy_content">已完成入驻流程，请等待审核或咨询客服</p>';
		html+='<p class="identidy_content">咨询电话：010-92138900</p>';
		break;
		case '2':
		html+='<p class="identidy_content" style="padding-top:160px"><img src="./imgs/success.png"></p>';
		html+='<p class="identidy_content">很遗憾,您的入驻被撤销</p>';
		html+='<p class="identidy_content">咨询电话：010-92138900</p>';
		break;
		case '3':
		html+='<p class="identidy_content" style="padding-top:160px"><img src="./imgs/success.png"></p>';
		html+='<p class="identidy_content">恭喜您，入驻成功</p>';
		html+='<p class="identidy_content">您的资料审核成功，现在可以去发布自己的物品了</p>';
		html+='<p class="identidy_content">立即发布</p>';
		break;
		case '4':
		html+='<p class="identidy_content" style="padding-top:160px"><img src="./imgs/success.png"></p>';
		html+='<p class="identidy_content">很遗憾，入驻失败</p>';
		html+='<p class="identidy_content">您的审核未通过审核，请检查资料后重新提交审核或咨询客服</p>';
		html+='<p class="identidy_content">咨询电话：010-92138900</p>';
		break;
	}
	html+='</div>';
	$(".identity").html(html);
})
