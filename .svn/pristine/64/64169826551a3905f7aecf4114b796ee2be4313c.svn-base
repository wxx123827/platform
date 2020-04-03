$(document).ready(function () {
    $('.head').load("personal_head.html");
    $('.nav').load("personal_nav.html", function (response, status, xhr) {
        $(document).find(".center_middle").html('<span>发布产品</span>')
    });
    $('.foot').load("foot.html");
})

//技能类别下拉菜单
var skill_type;
layui.config({
    base: './xmSelect/'
}).extend({
    xmSelect: 'xm-select'
}).use(['xmSelect'], function () {
    skill_type = xmSelect.render({
        el: '#skill_type',
        radio: true,
        clickClose: true,
        // height:'30px',
        style: {
            height: 34,
            width: '55%'
        },
        model: {
            label: {
                type: 'text',
                text: {
                    //左边拼接的字符
                    left: '',
                    //右边拼接的字符
                    right: '',
                    //中间的分隔符
                    separator: ',',
                },
            }
        },
        data: [],
    });
    $.ajax({
        url: baseurl + "/goods/getAllShop",
        type: "post",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (res) {
            var data = new Array();
            $.each(res, function (index, item) {
                data.push({
                    name: item.name,
                    value: item.uid
                });
            })
            skill_type.update({
                data: data,
                autoRow: true,
            })
        }
    })
})

layui.use(['form', 'layedit', 'laydate', 'upload'], function () {
    var $ = layui.jquery,
        upload = layui.upload,
        form = layui.form,
        layer = layui.layer,
        layedit = layui.layedit,
        laydate = layui.laydate;
    // getFields();
    pca.init('select[name=province]', 'select[name=city]', 'select[name=area]');
    function getArrDifference(arr1, arr2) {
        return arr1.concat(arr2).filter(function (v, i, arr) {
            return arr.indexOf(v) === arr.lastIndexOf(v);
        });
    }
    if (sessionStorage.getItem("data") != null) {
        var data = JSON.parse(sessionStorage.getItem("data"));
        var result = "";
        if (data.mechanismjoininfo != null) {
            result = data.mechanismjoininfo;
            pca.init('select[name=province]', 'select[name=city]', 'select[name=area]', result.province, result.city, result.county);
            $('#logoimg').attr('src', baseImgUrl + result.logo);
            $('#businessimg1').attr('src', baseImgUrl + result.business);
            form.val("thirdform", {
                "logo": result.logo,
                "business": result.business,
                "email": result.email,
                "infouid": data.joinuid,
                "name": result.name,
                "address": result.address,
            });
            layui.form.render();
        }
    }
    var materialimg1 = upload.render({
        elem: '#materialImgdiv1',
        url: baseUploadUrl,
        data: {
            uid: userUid
        },
        before: function (obj) {
            //预读本地文件示例，不支持ie8
            obj.preview(function (index, file, result) {
                $('#materialImgimg1').attr('src', result); //图片链接（base64）
            });
        },
        done: function (res) {
            //如果上传失败
            if (res.code > 0) {
                return layer.msg('上传失败');
            }
            form.val("thirdform", {
                "materialImgimg1": res.src
            })
            $("[name=materialImgimg1]").attr("src", res.src)
            //上传成功
        },
        error: function () {
            //演示失败状态，并实现重传
            var demoText = $('#materialImg1errorText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function () {
                materialimg1.upload();
            });
        }
    });
    var materialimg2 = upload.render({
        elem: '#materialImgdiv2',
        url: baseUploadUrl,
        data: {
            uid: userUid
        },
        before: function (obj) {
            //预读本地文件示例，不支持ie8
            obj.preview(function (index, file, result) {
                $('#materialImgimg2').attr('src', result); //图片链接（base64）
            });
        },
        done: function (res) {
            //如果上传失败
            if (res.code > 0) {
                return layer.msg('上传失败');
            }
            form.val("thirdform", {
                "materialImgimg2": res.src
            })
            $("[name=materialImgimg2]").attr("src", res.src)
            //上传成功
        },
        error: function () {
            //演示失败状态，并实现重传
            var demoText = $('#materialImg2errorText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function () {
                materialimg2.upload();
            });
        }
    });
    var materialimg3 = upload.render({
        elem: '#materialImgdiv3',
        url: baseUploadUrl,
        data: {
            uid: userUid
        },
        before: function (obj) {
            //预读本地文件示例，不支持ie8
            obj.preview(function (index, file, result) {
                $('#materialImgimg3').attr('src', result); //图片链接（base64）
            });
        },
        done: function (res) {
            //如果上传失败
            if (res.code > 0) {
                return layer.msg('上传失败');
            }
            form.val("thirdform", {
                "materialImgimg3": res.src
            })
            $("[name=materialImgimg3]").attr("src", res.src)
            //上传成功
        },
        error: function () {
            //演示失败状态，并实现重传
            var demoText = $('#materialImg3errorText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function () {
                materialimg3.upload();
            });
        }
    });
    //自定义验证规则
    form.verify({
        name: function (value) {
            if (value.length == 0) {
                return '请输入单位名称';
            }
        },
        logo: function (value, item) {
            if (typeof ($(item).attr("src")) == "undefined") {
                $("#logoimg").attr("tabindex", 0).addClass("layui-form-danger")
                return "请上传logo";
            }
        },
        business: function (value, item) {
            if (typeof ($(item).attr("src")) == "undefined") {
                $("#businessimg1").attr("tabindex", 0).addClass("layui-form-danger")
                return "请上传营业执照";
            }
        },
        province: function (value) {
            if (value === "全部") {
                layer.msg("请选择城市", {
                    icon: 2
                });
                $(document).find("[name=province]").addClass("layui-form-danger");
                return false;
            }
        },
        contactname: function (value) {
            if (value.length == 0) {
                return "请输入联系人";
            }
        },
        tel: function (value) {
            if (value.length == 0) {
                return "请输入联系电话";
            } else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))) {
                return "电话格式有误"
            }
        },
        officephone: function (value) {
            if (value.length == 0) {
                return "请输入办公电话";
            }
        }

    });
    form.on('submit(save)', function (data) {
        layer.load(2);
        var checkfields = $.find("[name=fields]");
        var filedsArray = new Array();
        $.each(checkfields, function (i, n) {
            var next = $(this).next(".layui-form-checkbox");
            if ($(next).hasClass("layui-form-checked")) {
                filedsArray.push($(n).attr("value"));
            }
        })
        if (data.field.fieldsstr != "") {
            $.each(data.field.fieldsstr.split(","), function (i, n) {
                filedsArray.push(n);
            });
        }
        data.field.fields = filedsArray;
        var checkqualification = $.find("[name=qualification]");
        var qualificationArray = new Array();
        $.each(checkqualification, function (i, n) {
            var next = $(this).next(".layui-form-checkbox");
            if ($(next).hasClass("layui-form-checked")) {
                qualificationArray.push($(n).attr("value"));
            }
        })
        if (data.field.qualificationstr != "") {
            $.each(data.field.qualificationstr.split(","), function (i, n) {
                qualificationArray.push(n);
            });
        }
        data.field.qualification = qualificationArray;
        var check = $.find(".materialImgSrc");
        var imgsArray = new Array();
        $.each(check, function (i, n) {
            if (typeof ($(this).attr("src")) != "undefined") {
                imgsArray.push($(this).attr("src"));
            }
        })
        data.field.materialImgs = imgsArray;
        var result = data.field;
        if (result.fields.length == 0 && result.fieldsstr == "") {
            layer.msg("请至少选择或输入一个服务领域", {
                icon: 2
            })
            $(document).find("[name=fieldsstr]").focus().addClass("layui-form-danger");
            layer.closeAll()
            return false;
        }
        if (result.qualification.length == 0 && result.qualificationstr == "") {
            layer.msg("请至少选择或输入一个具备资质", {
                icon: 2
            })
            $(document).find("[name=qualificationstr]").focus().addClass("layui-form-danger");
            layer.closeAll()
            return false;
        }
        save(JSON.stringify(result))
        return false;
    });

    function save(data) {
        $.ajax({
            url: baseUrl + "",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            type: "post",
            async: false,
            data: {
                data: data
            },

            success: function (res) {
                if (res.code === SUCCESS) {
                    layer.closeAll();
                    sessionStorage.setItem("data", result.email);
                    window.location.href = "authentication.html"
                    return;
                }
            }
        })
    }
})