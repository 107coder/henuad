var provinceList = [];
var urlRoot = "http://ad.cuisf.top:8088/henuad/index.php";
function initPageEvent() {
    var scnLastGetTime = Date.now();
    // 点击提交按钮
    $('#saveUserInfo').on('click', function () {
        var parameter = {
            name: $('#name').val(),
            email: $('#email').val(),
            SchoolID: $('#schoolName').attr('data-guid'),
            schoolName: $('#schoolName').val(),
            professional: $('#major').val(),
            grade: $('#grade').val(),
            personalProfil: $('#remark').val(),
        };
        if (!parameter.name) {
            layer.msg('请输入您的姓名');
            return;
        }
        if (/^\d{1,}$/.test(parameter.name)) {
            layer.msg('请输入正确的姓名');
            return;
        }
        if (!parameter.email) {
            layer.msg('请输入您的邮箱');
            return;
        }
        if (!REGEXP.email.test(parameter.email)) {
            layer.msg('请输入正确的邮箱格式');
            return;
        }
        if (!parameter.schoolName) {
            layer.msg('请输入您的学校名称');
            return;
        }
        // if (!parameter.SchoolID) {
        //     layer.msg('学校id不能为空');
        //     return;
        // }
        if (!parameter.professional) {
            layer.msg('请输入您的所在专业');
            return;
        }
        if (!parameter.grade) {
            layer.msg('请输入您的所在年级');
            return;
        }
        if (!parameter.personalProfil) {
            layer.msg('请输入您的个人简介');
            return;
        }
        updateUserInfo(parameter)
    });
    // 模糊搜索学校
    $('#schoolName').on('keyup', function (e) {
        e = window.event || e;
        var name = $(this).val();
        var scnNowGetTime = Date.now();
        if (scnNowGetTime - scnLastGetTime < 500 && e.keyCode !== 32) { return; }
        scnLastGetTime = scnNowGetTime;
        getSchoolListByName(name, function (backData) {
            var schoolListHtml = '';
            if (backData.Data.length > 0) {
                toggleSchoolList(true);
                var data = backData.Data;
                for (var i = 0; i < data.length; i++) {
                    schoolListHtml += "<div onClick=\"selectedSchool('" + data[i].Name + "','" + data[i].Guid + "',event)\">" + data[i].Name + "<\/div>";
                }
                $('.school-list').html(schoolListHtml);
            } else {
                $('.school-list').html("<div>未找到学校</div>");
                $('#schoolName').attr('data-guid', "");
            }
            toggleSchoolList(true);
        })
    })

    $('#schoolName').on('paste', function (e) {
        e = window.event || e;
        var name = '';
        setTimeout(function() {
            name = e.target.value;
            var scnNowGetTime = Date.now();
            if (scnNowGetTime - scnLastGetTime < 500 && e.keyCode !== 32) { return; }
            scnLastGetTime = scnNowGetTime;
            getSchoolListByName(name, function (backData) {
                var schoolListHtml = '';
                if (backData.Data.length > 0) {
                    toggleSchoolList(true);
                    var data = backData.Data;
                    for (var i = 0; i < data.length; i++) {
                        schoolListHtml += "<div onClick=\"selectedSchool('" + data[i].Name + "','" + data[i].Guid + "',event)\">" + data[i].Name + "<\/div>";
                    }
                    $('.school-list').html(schoolListHtml);
                } else {
                    console.log('11111', $('.school-list'))
                    $('.school-list').html("<div>未找到学校</div>");
                    $('#schoolName').attr('data-guid', "");
                }
                toggleSchoolList(true);
            })
        }, 100)
        
    })

    $('#schoolName').on('blur', function () {
        // toggleSchoolList(false);
    })

    getUserInfo(function (data) {
        $('.user-no').text(data.personalNumber || '---');
        $('#name').val(data.name);
        $('#email').val(data.email);
        $('#phoneNumber').html(data.Tel);
        $('#schoolName').attr('data-guid', data.schoolID);
        $('#schoolName').val(data.schoolName);
        $('#major').val(data.professional);
        $('#grade').val(data.grade);
        $('#remark').val(data.personalProfil);
        // 000
    });
}

function getUserInfo(callback) {
    $.ajax({
        url: urlRoot+'/index/PrivateAction/getInfoAPI',
        type: 'post',
        data: {},
        dataType:'json',
        success: function (resp) {
            if (resp.Stata == '10000') {
                console.log(resp);
                if (resp.Data) {
                    callback(resp.Data)
                }
            } else {
                layer.msg(resp.Message);
            }
        },
        error:function (){
            console.log('error');
        }
    })
}

function updateUserInfo(parameter) {
    $.ajax({
        url:urlRoot+"/index/PrivateAction/updateUserInfo",
        type: 'POST',
        data: parameter,
        dataType:'json',
        success: function (resp) {
            if (resp.Stata == '10000') {
                layer.msg('提交成功');
            } else {
                layer.msg(resp.Message);
            }
        }
    })
}

function getSchoolListByName(name, callback) {
    Request_.ajax({
        // key: '/api/WebPage/GetSchoolListByName',
        // type: 'GET',
        key: '',
        type: '',
        urlData: { schoolName: name },
        success: function (resp) {
            if (resp.Stata == '10000') {
                if (resp.Data.Name && resp.Data.Name !== name) {
                    return;
                }
                callback(resp.Data)
            } else {
                layer.msg(resp.Message);
            }
        }
    })
}

function showProvince() {
    if (!provinceList || (provinceList && provinceList.length === 0)) {
        getProvinceList();
    } else {
        toggleProvinceList(true);
    }
}

function getProvinceList() {
    Request_.ajax({
        // key: '/Api/WebPage/GetAreaList',
        // type: 'GET',
        key: '',
        type: '',
        urlData: {},
        success: function (resp) {
            if (resp.Stata == '10000') {
                provinceList = resp.Data;
                var ProvinceListHtml = '';
                toggleProvinceList(true);
                var data = resp.Data;
                for (var i = 0; i < data.length; i++) {
                    ProvinceListHtml += "<div onClick=\"selectedProvince('" + data[i].Name + "','" + data[i].AreaGuid + "',event)\">" + data[i].Name + "<\/div>";
                }
                $('.provinceList').html(ProvinceListHtml);
            } else {
                layer.msg(resp.Message);
            }
        }
    })
}

function selectedSchool(name, guid, e) {
    $('#schoolName').val(name);
    $('#schoolName').attr('data-guid', guid);
    toggleSchoolList(false);
}
function selectedProvince(name, guid, e) {
    $('#provinceModal').val(name);
    $('#provinceModal').attr('data-guid', guid);
    toggleProvinceList(false);
}

function toggleSchoolList(isShow) {
    isShow = isShow ? $('.school-list').show() : $('.school-list').hide();
}
function toggleProvinceList(isShow) {
    isShow = isShow ? $('.provinceList').show() : $('.provinceList').hide();
}

function submitSchoolInfo() {
    var AreaName = $('#provinceModal').val().trim();
    var AreaGuid = $('#provinceModal').data('guid');
    var SchoolName = $('#inputSchoolName').val().trim();

    if (!AreaName) {
        layer.msg('请选择省份信息');
        return;
    }
    if (!SchoolName) {
        layer.msg('学校名字不能为空');
        return;
    }
    var params = {
        SchoolName: SchoolName,
        AreaGuid: AreaGuid
    }
    addSchoolInfo(params);
}

function addSchoolInfo(params) {
    Request_.ajax({
        // key: '/api/UserCenter/AddSchool',
        // type: 'POST',
        key: '',
        type: '',
        data: params,
        success: function (resp) {
            if (resp.Stata == '10000') {
                layer.msg('学校添加成功，请等待管理员审核');
                $('#clickHere').modal('hide');
                // 清空弹出框信息
                $('#provinceModal').val('').data('guid', '');
                $('#inputSchoolName').val('');
            } else {
                layer.msg(resp.Message);
                $('#clickHere').modal('hide');
            }
        }
    })
}

// 处理学校搜索框点击别处隐藏的问题
$('.mySchoolBox').on('click', function (e) {
    e.stopPropagation();
})
$('#provinceModal').on('click', function (e) {
    e.stopPropagation();
})
// $('#provinceList').on('blur',function(){
//     toggleProvinceList(false);
// })

$(document).on('click', function () {
    $('.school-list').hide();
    toggleProvinceList(false);
})
