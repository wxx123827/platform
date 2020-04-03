$(document).ready(function() {
	layui.use(['form'], function() {
		var form = layui.form;
		var data = JSON.parse(sessionStorage.getItem("data"))
		$("[name=name]").text(data.name)
		if (data.personaljoininfo != null) {
			form.val("personalform", {
				"name": data.personaljoininfo.name,
				"tel": data.personaljoininfo.tel,
				"email": data.personaljoininfo.email,
				"skill": data.personaljoininfo.skillsinfo
			})
			$("#cardfrontimg").attr("src", baseImgUrl + data.personaljoininfo.cardfront)
			$("#cardreverseimg").attr("src", baseImgUrl + data.personaljoininfo.cardreverse)
		} else if (data.unitjoininfo != null) {
			form.val("institutionform", {
				"name": data.unitjoininfo.name,
				"field": data.unitjoininfo.fieldsuid,
				"province": data.unitjoininfo.province,
				"city": data.unitjoininfo.city,
				"country": data.unitjoininfo.county,
				"address": data.unitjoininfo.address,
				"contact": data.unitjoininfo.contactname,
				"tel": data.unitjoininfo.tel,
				"office": data.unitjoininfo.officephone,
				"email": data.unitjoininfo.email,
				"scale": data.unitjoininfo.scale
			})
			$("#logo").attr("src", baseImgUrl + data.unitjoininfo.logo)
			$("#licenseimg").attr("src", baseImgUrl + data.unitjoininfo.business)
			$("[name=otherimg]").attr("src", baseImgUrl + data.unitjoininfo.otherimg)
		} else if (data.mechanismjoininfo != null) {
			form.val("mechanismform", {
				"name": data.mechanismjoininfo.name,
				"field": data.mechanismjoininfo.fieldsuid,
				"province": data.mechanismjoininfo.province,
				"city": data.mechanismjoininfo.city,
				"country": data.mechanismjoininfo.county,
				"address": data.mechanismjoininfo.address,
				"contact": data.mechanismjoininfo.contactname,
				"tel": data.mechanismjoininfo.tel,
				"office": data.mechanismjoininfo.officephone,
				"email": data.mechanismjoininfo.email,
				"scale": data.mechanismjoininfo.scale,
				"qualification":data.mechanismjoininfo.qualificationsuid
			})
			$("#logo").attr("src", baseImgUrl + data.mechanismjoininfo.logo)
			$("#licenseimg").attr("src", baseImgUrl + data.mechanismjoininfo.business)
			$("[name=otherimg]").attr("src", baseImgUrl + data.mechanismjoininfo.otherimg)
		}
		layui.$('input').attr('disabled', true);
		layui.$("textarea").attr('disabled', true);
		layui.$("select").attr("disabled", true);
		form.render()
	})
})
