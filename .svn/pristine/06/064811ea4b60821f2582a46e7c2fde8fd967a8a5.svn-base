$(document).ready(function() {
	$('.head').load("personal_head.html");
	$('.nav_area').load("personal_nav.html", function(response, status, xhr) {
		$(document).find(".center_middle").html('<span>我的发布</span>')
	});
	$('.foot').load("foot.html");
	var userjsonstatuss = JSON.parse(sessionStorage.getItem("userJoinStatus"));
	console.log(userjsonstatuss)
	var joinstatus = 0;
	if (userjsonstatuss.joinstatus === '1' && userjsonstatuss.auditstatus === '0') {
		joinstatus = 1;
	} else if (userjsonstatuss.joinstatus === '1' && userjsonstatuss.auditstatus === '1') {
		joinstatus = 2;
	} else if (userjsonstatuss.joinstatus === '1' && userjsonstatuss.auditstatus === '2') {
		joinstatus = 3;
	} else if (userjsonstatuss.joinstatus === '1' && userjsonstatuss.auditstatus === '3') {
		joinstatus = 4;
	}
	console.log(joinstatus)
	var html = "";
	html += '<div >';
	switch (joinstatus) {
		case 1:
			html += '<p class="identidy_content"><img src="./imgs/success.png"></p>';
			html += '<p class="identidy_content">已完成入驻流程，请等待审核或咨询客服</p>';
			html += '<p class="identidy_content">咨询电话：010-92138900</p>';
			break;
		case 2:
			html += '<p class="identidy_content"><img src="./imgs/success.png"></p>';
			html += '<p class="identidy_content">很遗憾,您的入驻被撤销</p>';
			html += '<p class="identidy_content">咨询电话：010-92138900</p>';
			break;
		case 3:
			html += '<p class="identidy_content"><img src="./imgs/success.png"></p>';
			html += '<p class="identidy_content">恭喜您，入驻成功</p>';
			html += '<p class="identidy_content">您的资料审核成功，现在可以去发布自己的物品了</p>';
			break;
		case 4:
			html += '<p class="identidy_content"><img src="./imgs/success.png"></p>';
			html += '<p class="identidy_content">很遗憾，入驻失败</p>';
			html += '<p class="identidy_content">您的审核未通过审核，请检查资料后重新提交审核或咨询客服</p>';
			html += '<p class="identidy_content">咨询电话：010-92138900</p>';
			break;
	}
	html += '</div>';
	$(".circle_bottom").html(html);
})
