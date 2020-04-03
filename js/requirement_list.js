layui.use(['form', 'element'], function() {
	var form = layui.form;
	var $ = layui.$;
	var element = layui.element;
	var layer = layui.layer;
	var num = 0;
	$(document).ready(function() {
		$('.head').load("personal_head.html");
		$('.nav_area').load("personal_nav.html", function(response, status, xhr) {
			$(document).find(".center_middle").html('<span>需求清单</span>')
		});
		$('.foot').load("foot.html");
		getUserCart()
	})

	function getUserCart() {
		$.ajax({
			url: baseUrl + "cart/getUserCart",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			async: false,
			success: function(res) {
				console.log(res)
				if (res.code === SUCCESS) {
					var html = "";
					$(res.msg).each(function(index) {
						html += '<div class="layui-form-item">';
						html += '<div class="shops_name">';
						html += '<input type="checkbox" value="' + this.shopuid + '" name="title_' + index +
							'" lay-skin="primary" title="' + this.shopname + '" />'
						html += '</div>';
						$(this.goods).each(function() {
							html += '<div class="shops_content">';
							html += '<input type="checkbox" value="' + this.instrumentuid + '" name="sname_' + index +
								'" lay-skin="primary" /><img src="' + baseImgUrl + this.src + '" style="width:60px;height:60px">';
							html += '<span class="goods_name">' + this.name + '</span>';
							html += chooseTypes(this.types);
							html += '<span>' + this.model + '</span>';
							html += '<span>' + this.price + '</span>';
							html += '<span>' + this.num + '</span>';
							html += '<span class="price">' + (this.price * this.num) + '</span>';
							html += '</div>'
						})
					})
					$(".list").html(html);
					form.render()
					return false;
				}
			}
		})
	}
	form.on('checkbox()', function(data) {
		var dom = data.elem;
		console.log(dom) //得到checkbox()原始dom对象
		if (data.elem.checked) {
			var name = dom.name.split("_")
			// 店铺名选中，该店铺里的所有商品选中
			if (name[0] === "title") {
				var other = $(document).find('[name=sname_' + name[1] + ']');
				$(other).each(function() {
					$(this)[0].checked = true
				})
				var allcheck = $(document).find(':checkbox').length;
				var allchecked = $(document).find(':checked').length
				if (allcheck - 1 == allchecked) {
					$("[name=all]")[0].checked = true
				}
				form.render("checkbox")
			} else {
				if (dom.name === "all") {
					//如果全选按钮选中，所有的checkbox都被选中
					$($(document).find(':checkbox')).each(function() {
						$(this)[0].checked = true
					})
				} else {
					var this_ = $(document).find('[name=sname_' + name[1] + ']').length;
					var other_ = $(document).find('[name=sname_' + name[1] + ']:checked').length
					//checkbox与checked长度一致，全选中
					if (this_ === other_) {
						$(document).find('[name=title_' + name[1] + ']')[0].checked = true
					}
					var allcheck = $(document).find(':checkbox').length;
					var allchecked = $(document).find(':checked').length
					if (allcheck - 1 == allchecked) {
						$("[name=all]")[0].checked = true
					}
				}
				form.render("checkbox")
			}
			getTotal()
		} else {
			var name = dom.name.split("_")
			if (name[0] === "title") {
				var other = $(document).find('[name=sname_' + name[1] + ']');
				$(other).each(function() {
					$(this)[0].checked = false
				})
				var allcheck = $(document).find(':checkbox').length;
				var allchecked = $(document).find(':checked').length
				if (allcheck - 1 != allchecked) {
					$("[name=all]")[0].checked = false
				}
				form.render("checkbox")
			} else {
				if (dom.name === "all") {
					$($(document).find(':checkbox')).each(function() {
						$(this)[0].checked = false
					})
				} else {
					var this_ = $(document).find('[name=sname_' + name[1] + ']').length;
					var other_ = $(document).find('[name=sname_' + name[1] + ']:checked').length
					if (this_ != other_) {
						$(document).find('[name=title_' + name[1] + ']')[0].checked = false
					}
					var allcheck = $(document).find(':checkbox').length;
					var allchecked = $(document).find(':checked').length
					if (allcheck - 1 != allchecked) {
						$("[name=all]")[0].checked = false
					}
				}
				form.render("checkbox")
			}
			getTotal()
		}
	});

	function initcheckbox() {
		$($(document).find(':checkbox')).each(function() {
			$(this)[0].checked = false
		})
		form.render();
	}
	$(document).on("click", ".complete", function() {
		initcheckbox()
		var html = '<div class="manage">管理</div>';
		html += '<div class="favorite">';
		html += '<div id="count">合计:';
		html += '<div class="allprice">'
		html += 0
		html += '</div>'
		html += '</div>';
		html += '<div id="addOrder">提交订单</div>';
		html += '</div>'
		$(".shops_bottom").html(html);
	})
	$(document).on("click", ".manage", function() {
		initcheckbox()
		var html = '<div class="complete">完成</div>';
		html += '<div class="favorite">';
		html += '<div id="favorite">移入收藏夹</div>';
		html += '<div id="delete">删除</div>';
		html += '</div>'
		$(".shops_bottom").html(html);
	})
	$(document).on("click", "#addOrder", function() {
		if ($(document).find('[name^=sname_]:checked').length == 0) {
			layer.msg("请勾选商品")
			return false;
		} else {
			var array=new Array();
			$($(document).find('[name^=sname_]:checked')).each(function() {
				array.push($(this)[0].value)
			})
			sessionStorage.setItem("checkedID",JSON.stringify(array))
			window.location.href="./submit_order.html";
			return false;
		}
	})
	
	function getTotal() {
		var num = 0;
		$($(document).find('[name^=sname_]:checked')).each(function() {
			num += parseFloat($($(this)[0]).nextAll(".price").text())
		})
		$(document).find(".allprice").text(num)
	}
	$(document).on("click", "#favorite", function() {
		if ($(document).find('[name^=sname_]:checked').length == 0) {
			layer.msg("请勾选商品")
			return false;
		}
		layer.load(2);
		$($(document).find('[name^=sname_]:checked')).each(function(index) {
			asyncAddCollect(this.value, index);
		})
		layer.closeAll("loading")
	})
	$(document).on("click", "#delete", function() {
		if ($(document).find('[name^=sname_]:checked').length == 0) {
			layer.msg("请勾选商品")
			return false;
		}
		layer.load(2);
		$($(document).find('[name^=sname_]:checked')).each(function(index) {
			asyncRemoveCart(this.value);
		})

		layer.closeAll("loading")
		history.go(0)
	})

	function asyncRemoveCart(uid) {
		$.ajax({
			url: baseUrl + "cart/removeGoodsToCart",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			data: {
				goodsuid: uid
			},
			success: function(res) {
				if (res.code === success) {
					layer.msg('删除成功')
				}
			}
		})
	}

	function asyncAddCollect(uid, index) {
		$.ajax({
			url: baseUrl + "personal/addCollect",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			data: {
				goodsuid: uid,
			},
			async: false,
			success: function(res) {
				if (res.code === SUCCESS) {
					layer.msg('添加成功')
				}
			}
		})
	}

	function chooseTypes(type) {
		switch (type) {
			case "1":
				return '<span>仪器</span>'
				break;
			case "2":
				return '<span>实验室</span>'
				break;
			case "3":
				return '<span>耗材</span>'
				break;
			case "4":
				return '<span>知识</span>'
				break;
			case "5":
				return '<span>技能</span>'
				break;
		}
	}
})
