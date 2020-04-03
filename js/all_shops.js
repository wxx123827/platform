var baseUrls = "http://192.168.31.107:9100/";
layui.use('rate', function () {
    var $ = layui.jquery;
    var rate = layui.rate;
    var element = layui.element;
    $(document).ready(function () {
        $('.head').load("head.html");
        $('.search').load("search.html");
        $('.foot').load("foot.html");
        getAllShop()
    })

    function getAllShop() {
        var html = "";
        $.ajax({
            url: baseUrls + "index/v2/getAllShop",
            success: function (res) {
                if (res.code === SUCCESS) {
                    console.log(res);
                    $.each(res.msg, function (i, n) {
                        if (n.ban === "0") {
                            html += '<div class="search_detail">'
                            html += '<img src="' + baseImgUrl + n.logo + '">'
                            html += '<div class="content">'
                            html += '<p id="shop_scores' + i + '">' + n.panking + '</li>'
                            html += '<p class="shop_name">' + n.name + '</p>'
                            html += '</div>'
                            html += '</div>'
                        }
                        // 店铺评价评分
                        // rate.render({
                        //     elem: '#shop_scores' + i,
                        //     value: n.panking,
                        //     readonly: true,
                        //     half: true,
                        //     theme: '#e31f1f'
                        // });
                    })
                    $(".search_list").html(html)
                }
            }
        })
    }

})