var v_guid = '';
// image作品list
var workListsArr = [];
// 作品是否获奖（1：是，0：否）
var productio_borepalm = 1;
// 作品是否发布（1：是，0：否）
var production_published = 1;
var productio_publishedplace = '';
// 作品是否参加投票
var production_voting = 1;
// 封面url
var production_cover_guid = '';
// 抖音链接
var type_file_url = '';
// 是否勾选版权
var isCopyrightBtnChecked = false;
// schoolListData学校列表信息
var schoolListData = [];
// 品牌命题list
var TopicList = [];
// 命题guid
var production_topicid = '';
var production_topicname = '';
// 作品列表
var ProductionFileList = [];
// 作品格式
var ProductionFormatList = [];
var scnLastGetTime = Date.now();
var successTimer = null;
// 获取作品guid
var productionGuid = '';
// 上传图片最大宽度
var maxImageWidth = 5000;
// 上传图片最大高度
var maxImageHeight = 10000;
var locationSearch = formatQuery(location.search);
var progressTimer = null;
if (locationSearch) {
    productionGuid = locationSearch.guid;
}
if (productionGuid) {
    getProductionEditData();
} else {
    getInitData();
}
// 链接带guid的说明是编辑，反之是新增

// 是否允许添加作品
IsInsertProduct();
function IsInsertProduct() {
    Request_.ajax({
        // key: '/api/UserCenter/IsInsertProduct',
        // type: 'POST',
        key: '',
         type: '',
        data: {},
        dataType: "json",
        success: function(info) {
            if (info && info.Stata === 10000) {
                if(!info.Data.IsOk) {
                    // 跳回个人信息
                    layer.alert('请完善名字或学校信息', function(){
                        navTo('user-info');
                    });
                }
            } else {
                layer.msg('查询用户名字学校信息失败！')
            }
        }
    }).fail(function(){
        layer.msg('服务器异常，请联系管理员')
    });
}

// 上传文件change方法
function initUploadFn() {
    $('input[name=uploadInputs]').change(function() {
        var el = $(this);
        // 获取当前类型
        var active_type = el.data('types').toLowerCase();
        var max_num = el.data('num');
        var index = el.data('index');
        var size = el.data('size') * 1 + 5;
        var fr = new FileReader();
        var fileObj = this.files[0];
        if (!fileObj) { return; }
        // 获取上传文件大小
        var fileSize = (fileObj.size/1024/1024).toFixed(1);
        fr.readAsDataURL(fileObj);
        // 获取上传文件类型
        var file_type = getFileTypeOrNumber(fileObj, 'type');
        var types = getFileTypeOrNumber(fileObj, 'number');
        // 控制文件格式
        if (active_type.indexOf(file_type) < 0) {
            layer.msg('仅支持' + active_type + '格式');
            el.val('');
            return;
        }
        // 控制作品数量
        if (ProductionFileList[index].files && ProductionFileList[index].files.length >= max_num) {
            layer.msg('作品数量不能超过' + max_num);
            el.val('');
            return;
        }
        // 控制文件大小
        if (fileSize > size) {
            layer.msg('作品不能超过' + size + 'M');
            el.val('');
            return;
        }
        fr.onload = function () {
            // 如果是图片格式，限制分辨率
            if (types === 1) {
                var image = new Image();
                image.src = fr.result;
                image.onload=function(){
                    var width = image.width;
                    var height = image.height;
                    if (width > maxImageWidth || height > maxImageHeight) {
                        layer.msg('图片最大分辨率仅支持'+maxImageWidth+'*'+maxImageHeight);
                    } else {
                        uploadFiles(el, fileObj, 'work', index);
                    }
                };
            } else {
                uploadFiles(el, fileObj, 'work', index);
            }
        }
    })
}
// 视频链接
function inputDouyinUrl(val, i) {
    // if (!ProductionFileList[i].files) {
    //     ProductionFileList[i].files = [];
    // }
    // ProductionFileList[i].files.push({
    //     fileResult: '',
    //     fileName: ''
    // })
    type_file_url = val;
}
// 初始化命题信息
function getInitData() {
    Request_.ajax({
        // key: '/api/UserCenter/GetProductionInitData',
        // type: 'POST',
        key: '',
        type: '',
        data: {},
        contentType: false,
        processData: false,
        success: function(info) {
            if (info && info.Stata === 10000) {
                TopicList = info.Data.TopicData.TopicList;
                NotTopicList = info.Data.TopicData.NotTopicList;
                var userInfos = info.Data.ThisCreativeStaffInfo;
                CreativeStafList = [];
                CreativeStafList.push(userInfos);
                updataView('t:_TopicList', 'TopicList', { list: TopicList });
                updataView('t:_NotTopicList', 'NotTopicList', { list: NotTopicList });
                updataView('t:_uploadProduction', 'uploadProduction', { list: ProductionFileList });
                updataView('t:_CreativeStaf', 'CreativeStaf', { list: CreativeStafList });
                var isShowSubmitBtn = info.Data.ValiUpload.isUpload;
                if (isShowSubmitBtn) {
                    $('.upload_submit_btn').show();
                    $('#already-start').show();
                    $('#no-start').hide();
                } else {
                    $('.upload_submit_btn').hide();
                    $('#already-start').hide();
                    $('#no-start').show();
                }
                // 初始化点击命题
                changeType(0, true);
            } else {
                layer.msg('初始化命题信息失败')
            }
        }
    }).fail(function(err) {
        layer.msg('服务器异常，请联系管理员')
    });
}
// 获取作品格式
function getProductionFormat(type, index, i) {
    if (type === 'TopicList') {
        ProductionFormatList = TopicList[index]['TopicDataList'][i]['TopicFormatList'];
    } else if (type === 'NotTopicList') {
        ProductionFormatList = NotTopicList[index]['TopicDataList'][i]['TopicFormatList'];
    }
    controlFormatTypeChecked(ProductionFormatList);
    updataView('t:_ProductionFormat', 'ProductionFormat', { list: ProductionFormatList });
}
// 控制作品格式必选可选
function controlFormatTypeChecked(list) {
    $.each(list, function(k, v) {
        if (v.CheckData && v.CheckData.length > 0) {
            $.each(v.CheckData, function(key, val) {
                if (val.isCheck === 1) {
                    v.isChecked = 1;
                    return false;
                } else {
                    v.isChecked = 0;
                }
            })
        } else {
            v.isChecked = 0;
        }
    });
}
/**
 * 点击切换类型
 * @params {type} [string] 切换类型
*/
function changeType(type, isFirst) {
    var types = $('#changeType .btn');
    $.each(types, function(k, v) { $(v).removeClass('active_btn'); });
    $(types[type]).addClass('active_btn');
    if(type === 0) {
        $('#NotTopicList').hide();
        $('#TopicList').show();
    } else {
        $('#NotTopicList')[0].style.display = 'flex';
        $('#TopicList').hide();
    }
    var dataList = type === 0 ? TopicList : NotTopicList;
    var dataType = type === 0 ? 'TopicList' : 'NotTopicList';
    // 初始化的时候命题里面有默认选中项
    var topicTypeFlag = 1;
    $.each(dataList, function(k, v) {
        var isHasActive = $($('#' + dataType)[k]).find('.check_btn').hasClass('active_btn');
        if (isHasActive) {
            topicTypeFlag = 2;
            $.each(v.TopicDataList, function(key, val) {
                var isHasActive2 = $($($('#' + dataType)[k]).find('.check_btn')[key]).hasClass('active_btn');
                if (isHasActive2) {
                    ProductionFormatList = val.TopicFormatList;
                    // 处理ProductionFormatList， 控制可选必选
                    controlFormatTypeChecked(ProductionFormatList);
                    // 渲染作品格式
                    updataView('t:_ProductionFormat', 'ProductionFormat', { list: ProductionFormatList });
                    // 渲染作品上传部分
                    updateUploadProduction(ProductionFormatList);
                    return false;
                }
            })
            return false;
        }
    });
    if (topicTypeFlag === 1) {
        updataView('t:_ProductionFormat', 'ProductionFormat', { list: [] });
        updateUploadProduction([]);

    }
}
/**
 * 点击切换命题/非命题中的选项或者切换作品格式
 * @params {type} [string] 切换类型 命题类：'TopicList'，非命题：'NotTopicList'
 * @params {index} [string]
 * @params {i} [string]
*/
var MTSelect = $('#TopicList');
var FMTSelect = $('#NotTopicList');
var FormatSelect = $('#ProductionFormat');
function changeSelect(type , index, i) {
    if (type === 'TopicList') {
        $.each(MTSelect.find('.check_btn'), function(k, v) {
            $(v).removeClass('active_btn');
        });
        MTSelect.find('#TopicList' + index).find('.check_btn').eq(i).addClass('active_btn');
        // 重新渲染作品格式
        getProductionFormat(type , index, i);
    } else if (type === 'NotTopicList') {
        $.each(FMTSelect.find('#NotTopicList' + index).find('.check_btn'), function(k, v) {
            $(v).removeClass('active_btn');
        });
        FMTSelect.find('#NotTopicList' + index).find('.check_btn').eq(i).addClass('active_btn');
        // 重新渲染作品格式
        getProductionFormat(type , index, i);
    } else {
        $.each(FormatSelect.find('.check_btn'), function(k, v) {
            $(v).removeClass('active_btn');
        });
        FormatSelect.find('.check_btn').eq(index).addClass('active_btn');
    }
    // 重新渲染上传作品部分
    updateUploadProduction(ProductionFormatList);
    return type;
}
// 更新上传作品部分
function updateUploadProduction(info) {
    ProductionFileList = [];
    var list = [];
    // 获取需要显示的上传作品部分
    var $el = $('#ProductionFormat').find('.check_btn');
    $.each($el, function(k, v) {
        if ($(v).hasClass('active_btn')) {
            list.push(info[k]);
        }
    });
    $.each(list, function(k, v) {
        $.each(v.CheckData, function(key, val) {
            ProductionFileList.push({
                Guid: v.Guid,
                Name: v.Name,
                Remark: v.Remark,
                ShortName: v.ShortName,
                formatMaxNumber: val.num,
                formatSize: val.size,
                formatName: v.Name,
                formatRemark: val.remark,
                formatShortName: val.type.toLowerCase(),
                isCheck: val.isCheck
            })
        });
    });
    updataView('t:_uploadProduction', 'uploadProduction', { list: ProductionFileList });
    initUploadFn();
}

/*
* 作品是否发布
* @params {isPublished}
*/
var isPublishedItems = $('#isPublishedItem .radios');
function isWorkPublic(isPublished) {
    production_published = Math.abs(isPublished - 1);
    $.each(isPublishedItems, function(k, v) {
        $(v).removeClass('active_btn');
    })
    $(isPublishedItems[isPublished]).addClass('active_btn');
    isPublished === 0 ? $('#publishInput').show(100) : $('#publishInput').hide(100);
    return isPublished;
}
/*
* 作品是否获奖
* @params {isWonAward}
*/
var isWonAwardItems = $('#isWonAwardItem .radios');
function isWordWonAward(isWonAward) {
    productio_borepalm = Math.abs(isWonAward - 1);
    $.each(isWonAwardItems, function(k, v) {
        $(v).removeClass('active_btn');
    })
    $(isWonAwardItems[isWonAward]).addClass('active_btn');
    isWonAward === 0 ? $('#awardInput').show(100) : $('#awardInput').hide(100);
    return isWonAward;
}
/*
* 作品是否参加投票
* @params {isVoteType}
*/
var isVotingItems = $('#isVoting .radios');
function isVoting(isVoteType) {
    production_voting = Math.abs(isVoteType - 1);
    $.each(isVotingItems, function(k, v) {
        $(v).removeClass('active_btn');
    })
    $(isVotingItems[isVoteType]).addClass('active_btn');
    return isVoteType;
}
// 勾选版权按钮
function selectCopyRight(isVoteType) {
    isCopyrightBtnChecked = $('#copyRightBtn').hasClass('active_btn');
    isCopyrightBtnChecked ? $('#copyRightBtn').removeClass('active_btn') : $('#copyRightBtn').addClass('active_btn');
    isCopyrightBtnChecked = !isCopyrightBtnChecked;
}



/**
* 请求上传文件接口
* @params {el} 调用此方法的当前元素
* @params {fileObj} 被上传的文件对象
* @params {type} 上传的作品还是封面'work'/'cover'
* @params {idx} 如果上传的是作品，idx代表作品类的下标
*/
function uploadFiles(el, fileObj, type, idx) {
    // FormData对象
    var _FormData = new FormData();
    // 获取文件类型
    var fileType = getFileTypeOrNumber(fileObj, 'number');
    _FormData.append("file", fileObj);
    _FormData.append("FileType", fileType);
    showLoading('文件上传中，请耐心等候...');
    Request_.ajax({
        // key: '/api/UserCenter/UploadUserProductionFile',
        // type: 'POST',
        key: '',
        type: '',
        data: _FormData,
        contentType: false,
        processData: false,
        success: function(info) {
            el.val('');
            hideLoading();
            if (info && info.Stata === 10000) {
                if (type === 'cover') {
                    production_cover_guid = info.Data.VRGuid;
                    layer.msg('封面上传成功');
                }
                if (type === 'work') {
                    layer.msg('作品上传成功');
                    if (!ProductionFileList[idx].files) {
                        ProductionFileList[idx].files = [];
                    }
                    ProductionFileList[idx].files.push({
                        fileResult: info.Data.Url,
                        fileName: fileType !== 1 ? info.Data.OriginFileName : ''
                    });
                    var num = ProductionFileList[idx].files.length - 1;
                    ProductionFileList[idx].files[num].resourceGuid = info.Data.VRGuid;
                    updataView('t:_workLists' + idx, 'workLists' + idx, {
                        workListsArr: ProductionFileList[idx].files,
                        types: fileType
                    });
                }
            } else {
                layer.msg('作品上传失败');
            }
        },
        xhr: function() {
            var xhr = $.ajaxSettings.xhr();
            if(onprogress && xhr.upload) {
                xhr.upload.addEventListener('progress', onprogress, false);
                return xhr;
            }
        }
    }).fail(function(){
        hideLoading();
        el.val('');
        layer.msg('作品上传失败');
    })
}

function onprogress(evt) {
    var progressBar = $('#progressBar');
    if(evt.lengthComputable) {
        var completePercent = Math.ceil(evt.loaded/evt.total*100);
        completePercent = completePercent - 10 < 0 ? 0 : completePercent - 10
        if (completePercent >= 90) {
            if (progressTimer) { clearInterval(progressTimer); }
            progressTimer = setInterval(function() {
                if (completePercent >= 99) {
                    completePercent = 99;
                    clearInterval(progressTimer);
                } else {
                    completePercent = completePercent + 1;
                }
                progressBar.width(completePercent + '%');
                $('#loadText').text('文件上传中，请耐心等候' + completePercent + '%...');
            }, 5000);
        } else {
            progressBar.width(completePercent + '%');
            $('#loadText').text('文件上传中，请耐心等候' + completePercent + '%...');
        }
    }
}

// 点击上传封面
$('#uploadHomePage').change(function() {
    var el = $(this);
    var fr = new FileReader();
    var fileObj = this.files[0]; // 获取文件对象
    fr.readAsDataURL(fileObj);
    var file_type = getFileTypeOrNumber(fileObj, 'type');
    var fileSize = (fileObj.size/1024/1024).toFixed(1);
    if (file_type !== 'jpg' && file_type !== 'png') {
        layer.msg('仅支持jpg、png格式');
        el.val('');
        return;
    }
    if (fileSize > 2) {
        layer.msg('作品不能超过2M');
        el.val('');
        return;
    }
    fr.onload = function () {
        var image = new Image();
        image.src = fr.result;
        image.onload = function(){
            var width = image.width;
            var height = image.height;
            if (width !== 220 || height !== 160) {
                layer.msg('封面图宽高不符合要求');
            } else {
                uploadFiles(el, fileObj, 'cover');
                $('#homePagePic').attr('src', fr.result).show();
                $('#homePagePicCover').show();
                $('#upload_homepage .upload_txt').html('修改封面');
            }
        };
        
    }
})

// 鼠标放在上传的图片上
function enterMyWorks(i, j) {
    $('#uploadProduction').find('#workLists' + j).find('.closeWorks')[i].style.opacity = 1;
}
// 鼠标离开上传图片上
function leaveMyWorks(i, j) {
    $('#uploadProduction').find('#workLists' + j).find('.closeWorks')[i].style.opacity = 0;
}
// 删除当前图片
function closeActivePic(i, j, name) {
    var type = ProductionFileList[j].formatShortName.toLowerCase();
    var types = getFileTypes(type);
    ProductionFileList[j].files.splice(i, 1);
    updataView('t:_workLists' + j, 'workLists' + j, {
        workListsArr: ProductionFileList[j].files,
        types: types
    });
}

function limitLength(val, len, e) {
    var $el = $(e.target);
    if (val.length > len) {
        val = val.slice(0, len);
        $el.val(val);
    }
}

var CreativeStafList = [{ name: '', tel: '', school: '', major: '', grade: '' }];
var GuidanceTeacherList = [{ name: '', tel: '', school: '', duty: '' }];
var hasSelectStafIndex = null;
var hasSelectTeacherIndex = null;
$(document).ready(function(){
    updataView('t:_GuidanceTeacher', 'GuidanceTeacher', {
        list: GuidanceTeacherList
    });
    updataView('t:_CreativeStaf', 'CreativeStaf', {
        list: CreativeStafList
    });
    // 选择开始时间
    $('#startDatePicker').datepicker({
        format: 'yyyy/mm/dd',
        container: "#startDateContainer",
        autoclose: true,
        language: 'zh-CN'
    });
    // 选择结束时间
    $('#endDatePicker').datepicker({
        format: 'yyyy/mm/dd',
        container: "#endDateContainer",
        autoclose: true,
        language: 'zh-CN'
    });
})
// 更新主创人员信息
function updateStafInfo() {
    // 同步表格中数据
    var CreativeStaf_row = $('#CreativeStaf .person_info');
    CreativeStafList = [];
    $.each(CreativeStaf_row, function(k, v){
        var stafname = $(v).find('input[name=stafname]').val().trim();
        var stafphone = $(v).find('input[name=stafphone]').val().trim();
        var stafschool = $(v).find('input[name=stafschool]').val().trim();
        var stafmajor = $(v).find('input[name=stafmajor]').val().trim();
        var stafgrade = $(v).find('input[name=stafgrade]').val().trim();
        var schoolid = $(v).find('.school_item_name').data('schoolid');
        var params = {
            name: stafname,
            tel: stafphone,
            school: stafschool,
            major: stafmajor,
            grade: stafgrade,
            schoolID: schoolid
        };
        CreativeStafList.push(params);
    });
}
// 获取学校list
function getSchoolListByName(name, idx, type) {
    Request_.ajax({
        // key: '/api/WebPage/GetSchoolListByName',
        // type: 'GET',
        key: '',
         type: '',
        data: { schoolName: name, index: 10 },
        success: function(info) {
            if (info && info.Stata === 10000) {
                if (info.Data.Name !== name && !info.Data.Name !== !name) { return; }
                schoolListData = info.Data.Data;
                if (type === 'staf') {
                    updataView('t:_schoolbox' + idx, 'schoolbox' + idx, {
                        list: schoolListData
                    });
                    $('#CreativeStaf .person_info').eq(idx).find('#schoolbox' + idx).show();
                } else {
                    updataView('t:_teacherSchoolbox' + idx, 'teacherSchoolbox' + idx, {
                        list: schoolListData
                    });
                    $('#GuidanceTeacher .person_info').eq(idx).find('#teacherSchoolbox' + idx).show();
                }
            }
        }
    }).fail(function(err) {
       layer.msg('服务器异常，请联系管理员');    
    });
    return schoolListData;
}

// 输入主创人员学校
function inputSchool(value, index, type, e) {
    e = window.event || e;
    var scnNowGetTime = Date.now();
    var timeDiff = scnNowGetTime - scnLastGetTime;
    if(timeDiff < 500 && e.keyCode !== 32){ return }
    scnLastGetTime = scnNowGetTime;
    getSchoolListByName(value, index, type);
}

function pasteSearchSchoolInfo(index, type, e) {
    e = window.event || e;
    console.log('+++++++', index, type, e)
    if (successTimer) {
        clearTimeout(successTimer)
    }
    successTimer = setTimeout(function(){
        inputSchool(e.target.value, index, type, e);
    }, 100)
}
/**
 * 点击选中当前学校
 * @params {type} [string] 表示区分主创人员和导师部分
 * @params {index} [string] 表示第几行
 * @params {i} [string] 表示选择学校的下标
 */
function selectActiveSchoolData(type, index, i) {
    if (type === 'staf') {
        var el = $('#CreativeStaf .person_info').eq(index);
        // 输入框赋值
        el.find('input[name=stafschool]').val(schoolListData[i]['Name']);
        el.find('.school_item_name').data('schoolid', schoolListData[i].Guid);

        // 筛选框消失
        $('#CreativeStaf .person_info').eq(index)
        .find('#schoolbox' + index).hide();
    } else {
        var el = $('#GuidanceTeacher .person_info').eq(index);
        // 输入框赋值
        el.find('input[name=teacherschool]').val(schoolListData[i]['Name']);
        el.find('.school_item_name').data('schoolid', schoolListData[i].Guid);
        // 筛选框消失
        $('#GuidanceTeacher .person_info').eq(index)
        .find('#teacherSchoolbox' + index).hide();
    }
}
// 点击添加主创人员
function addCreativeStaf() {
    // 同步表格中数据
    updateStafInfo();
    updataView('t:_CreativeStaf', 'CreativeStaf', {
        list: CreativeStafList
    });
    if(CreativeStafList.length >= 5) {
        layer.msg('最多可添加5个');
        return;
    }
    CreativeStafList.push({ name: '', tel: '', school: '', major: '', grade: '' });
    updataView('t:_CreativeStaf', 'CreativeStaf', { list: CreativeStafList });
}
// 选中所在这行主创人员
function selectActiveStaf(index) {
    hasSelectStafIndex = index;
}
// 删除主创人员
function deleteCreativeStaf() {
    updateStafInfo();
    updataView('t:_CreativeStaf', 'CreativeStaf', { list: CreativeStafList });
    if (!hasSelectStafIndex && hasSelectStafIndex !== 0) {
        layer.msg('请选择需要删除的主创人员');
        return;
    } else if (CreativeStafList.length <= 1) {
        layer.msg('至少保留一条数据');
        return;
    }
    CreativeStafList.splice(hasSelectStafIndex, 1);
    updataView('t:_CreativeStaf', 'CreativeStaf', { list: CreativeStafList });
}
// 选中所在这行指导老师
function selectActiveTeacher(index) {
    hasSelectTeacherIndex = index;
}

// 同步表格中导师数据
function updateTeacher() {
    var GuidanceTeacher_row = $('#GuidanceTeacher .person_info');
    GuidanceTeacherList = [];
    $.each(GuidanceTeacher_row, function(k, v){
        var teachername = $(v).find('input[name=teachername]').val().trim();
        var teacherphone = $(v).find('input[name=teacherphone]').val().trim();
        console.log('teacherphone', teacherphone)
        var teacherschool = $(v).find('input[name=teacherschool]').val().trim();
        var teacherjob = $(v).find('input[name=teacherjob]').val().trim();
        var schoolid = $(v).find('.school_item_name').data('schoolid');
        GuidanceTeacherList.push({
            name: teachername,
            tel: teacherphone,
            school: teacherschool,
            duty: teacherjob,
            schoolID: schoolid
        });
    });
}

// 删除指导老师
function deleteGuidanceTeacher() {
    updateTeacher();
    updataView('t:_GuidanceTeacher', 'GuidanceTeacher', { list: GuidanceTeacherList });
    if (!hasSelectTeacherIndex && hasSelectTeacherIndex !== 0) {
        layer.msg('请选择需要删除的指导老师');
        return;
    } else if (GuidanceTeacherList.length <= 1) {
        layer.msg('至少保留一条数据');
        return;
    }
    GuidanceTeacherList.splice(hasSelectTeacherIndex, 1);
    updataView('t:_GuidanceTeacher', 'GuidanceTeacher', { list: GuidanceTeacherList });
}

// 添加指导老师
function addGuidanceTeacher() {
    updateTeacher();
    updataView('t:_GuidanceTeacher', 'GuidanceTeacher', { list: GuidanceTeacherList });
    if(GuidanceTeacherList.length >= 2) {
        layer.msg('最多可添加2个');
        return;
    }
    GuidanceTeacherList.push({ name: '', tel: '', school: '', duty: '' });
    updataView('t:_GuidanceTeacher', 'GuidanceTeacher', { list: GuidanceTeacherList });
}

function testInfo(type, params) {
    if(!params.name){
        layer.msg(type + '姓名不能为空');
        return false;
    }
    if(!params.tel){
        layer.msg(type + '联系方式不能为空');
        return false;
    }
    if(!(/^1[3456789]\d{9}$/.test(params.tel))){
        layer.msg(type + '手机号码格式有误');
        return false;
    }
    if(!params.schoolID){
        layer.msg(type + '院校id不能为空');
        return false;
    }
    if (type === '主创人员') {
        if(!params.major){
            layer.msg(type + '专业不能为空');
            return false;
        }
        if(!params.grade){
            layer.msg(type + '年级不能为空');
            return false;
        }
    } else {
        if(!params.duty){
            layer.msg(type + '职务不能为空');
            return false;
        }
    }
    return true;
}

// 点击提交作品
function submitProductionInfo(type) {
    // 获取作品信息
    var productio_name = getOrSetProductionInfo('production_name');
    var production_intro = getOrSetProductionInfo('production_intro');
    var productio_purpose = getOrSetProductionInfo('productio_purpose');
    var productio_lightspot = getOrSetProductionInfo('productio_lightspot');
    var productio_start_date = getOrSetProductionInfo('startDatePicker');
    var productio_end_date = getOrSetProductionInfo('endDatePicker');
    var productioAwardContent = '';
    var isTopicListDisplay = $('#TopicList')[0].style.display;
    if (isTopicListDisplay === 'none') {
        // 非命题类
        $.each($('#NotTopicList').find('.check_btn'), function(k, v){
            if ($(v).hasClass('active_btn')) {
                production_topicid = $(v).data('guid');
                production_topicname = $(v).data('name');
            }
        });
    } else {
        // 命题类
        $.each($('#TopicList').find('.check_btn'), function(k, v){
            if ($(v).hasClass('active_btn')) {
                production_topicid = $(v).data('guid');
                production_topicname = $(v).data('name')
            }
        });
    }
    
    if ($('#productioAwardContent')) {
        productioAwardContent = $('#productioAwardContent').val().trim();
    }
    if ($('#productio_publishedplace')) {
        productio_publishedplace = $('#productio_publishedplace').val().trim();
    }
    if (!production_topicid) {
        layer.msg('命题类型不能为空');
        return;
    }
    if (!productio_name) {
        layer.msg('作品名称不能为空');
        return;
    }
    console.log(productio_name, productio_name.length)
    if (productio_name && productio_name.length > 20) {
        layer.msg('作品名称不能超过20个字');
        return;
    }
    if (!production_intro) {
        layer.msg('作品简介不能为空');
        return;
    }
    if (production_intro && production_intro.length > 300) {
        layer.msg('作品简介不能超过300个字');
        return;
    }
    if (!productio_purpose) {
        layer.msg('作品诉求不能为空');
        return;
    }
    if (productio_purpose && productio_purpose.length > 200) {
        layer.msg('作品诉求不能超过200个字');
        return;
    }
    if (!productio_lightspot) {
        layer.msg('作品亮点不能为空');
        return;
    }
    if (productio_lightspot && productio_lightspot.length > 200) {
        layer.msg('作品亮点不能超过200个字');
        return;
    }
    if (!production_cover_guid) {
        layer.msg('未上传封面或上传失败');
        return;
    }
    // 获取作品信息
    var productionInfoList = [];
    var productionInfoListFlag = true;
    $.each(ProductionFileList, function(k, v) {
        productionInfoListFlag = true;
        if (v.isCheck === 1 && !v.files) {
            if (v.formatShortName === 'url') {
                layer.msg('请输入抖音视频链接');
            } else {
                layer.msg('请上传' + v.Name + v.formatShortName);
            }
            productionInfoListFlag = false;
            return false;
        }
        $.each(v.files, function(idx, val) {
            var guid = $($('#uploadProduction #workLists' + k + ' .worksPicBox')[idx]).data('guid');
            productionInfoList.push({
                guid: guid, // 新增时可为空
                productionGuid: v_guid,
                formatGuid: v.Guid,
                resourceGuid: val.resourceGuid || ''
            })
        })
    })
    if (!productionInfoListFlag) { return; }
    // 获取主创人员信息
    CreativeStafList = [];
    var CreativeFlag = true, TeacherFlag = true;
    $.each($('#CreativeStaf .person_info'), function(k, v) {
        var names = $(v).find('input[name=stafname]').val().trim();
        var phone = $(v).find('input[name=stafphone]').val().trim();
        var schoolid = $(v).find('.school_item_name').data('schoolid');
        var major = $(v).find('input[name=stafmajor]').val().trim();
        var grade = $(v).find('input[name=stafgrade]').val().trim();
        var guid = $(v).find('input[name=stafname]').data('guid');
        var params = { guid: guid, name: names, tel: phone, schoolID: schoolid, major: major, grade: grade }
        CreativeFlag = testInfo('主创人员', params);
        if (!CreativeFlag) { return false; }
        CreativeStafList.push(params);
    });
    if (!CreativeFlag) { return }
    // 获取导师信息
    GuidanceTeacherList = [];
    $.each($('#GuidanceTeacher .person_info'), function(k, v) {
        var names = $(v).find('input[name=teachername]').val().trim();
        var phone = $(v).find('input[name=teacherphone]').val().trim();
        var schoolid = $(v).find('.school_item_name').data('schoolid');
        var duty = $(v).find('input[name=teacherjob]').val().trim();
        var guid = $(v).find('input[name=teachername]').data('guid');
        var params = { guid: guid, name: names, tel: phone, schoolID: schoolid, duty: duty }
        TeacherFlag = testInfo('指导老师', params);
        if (!TeacherFlag) { return false; }
        GuidanceTeacherList.push(params);
    });
    if (!TeacherFlag) { return }
    if (!productio_start_date) {
        layer.msg('开始时间不能为空');
        return;
    }
    if (!productio_end_date) {
        layer.msg('结束时间不能为空');
        return;
    }
    var start = new Date(productio_start_date).getTime();
    var end = new Date(productio_end_date).getTime();
    if (end < start) {
        layer.msg('创作结束日期必须大于开始日期');
        return;
    }
    if (!isCopyrightBtnChecked) {
        layer.msg('请阅读并勾选版权声明');
        return;
    }
    var dataInfo = {
        v_guid: v_guid, // 作品表guid,如果是新增就不传
        production_topicid: production_topicid, // 作品命题id
        productio_intro: production_intro, // 作品简介
        productio_name: productio_name, // 作品名称
        productio_start_date: productio_start_date, // 创作开始时间
        productio_end_date: productio_end_date, // 创作结束时间
        productio_purpose: productio_purpose, // 作品诉求
        productio_lightspot: productio_lightspot, // 作品亮点
        productio_cover: production_cover_guid, // 作品封面
        productio_networkvote: production_voting, // 是否参与网络投票
        productio_borepalm: productio_borepalm, // 作品是否曾经获奖
        productio_content: productioAwardContent, // 获奖内容
        productio_published: production_published, // 是否曾经发表过
        productio_publishedplace: productio_publishedplace, // 作品发表在哪里
        productio_status: type, // 作品状态
        CreativeStaffJson: JSON.stringify(CreativeStafList),
        CreativeTeacherJson: JSON.stringify(GuidanceTeacherList),
        ProductionFileJson: JSON.stringify(productionInfoList),
        URL: type_file_url // 抖音视频链接
    }
    Request_.ajax({
        // key: '/api/UserCenter/AddOrUpdateUserProduction',
        // type: 'POST',
        key: '',
        type: '',
        data: dataInfo, 
        dataType: "json",
        success: function(info) {
            if (info && info.Stata === 10000) {
                layer.msg('作品'+ (type === 1 ? '保存' : '上传') +'成功，可在【我的作品】页面查看');
                if (successTimer) {
                    clearTimeout(successTimer);
                }
                if(production_topicname.indexOf('中原消费金融') !== -1) {
                    $('#myModal').modal('show')
                    $('#myModal').on('hide.bs.modal', function (event) {
                        successTimer = setTimeout(function(){
                            if (productionGuid) {
                                var urlHref = window.location.href;
                                var url = urlHref.split('?')[0];
                                window.location.href = url;
                            } else {
                                window.location.reload();
                            }
                        }, 1000)
                    })
                } else {
                    successTimer = setTimeout(function(){
                        if (productionGuid) {
                            var urlHref = window.location.href;
                            var url = urlHref.split('?')[0];
                            window.location.href = url;
                        } else {
                            window.location.reload();
                        }
                    }, 1000)
                }
                
                
            } else {
                layer.msg(info.Message);
            }
        }
    }).fail(function(err) {
        layer.msg('服务器异常，请联系管理员');
    });
}

function schoolInputHide() {
    $('#CreativeStaf input[name = stafschool]').unbind('click').bind('click',function(e){
        e.stopPropagation();
    })
    $('#GuidanceTeacher input[name = teacherschool]').unbind('click').bind('click',function(e){
        e.stopPropagation();
    })
    $(document).on('click',function(e){
        $('.schoolbox').hide();
    })
}

// 编辑作品是初始化作品信息
function getProductionEditData() {
    Request_.ajax({
        // key: '/api/UserCenter/GetUserProductionDetailByGUID',
        // type: 'POST',
        key: '',
        type: '',
        data: { guid: productionGuid },
        success: function(info) {
            if (info && info.Stata === 10000) {
                TopicList = info.Data.TopicData.TopicList;
                NotTopicList = info.Data.TopicData.NotTopicList;
                var ProductionInfo = info.Data.Production;
                var CreativeStaffList = info.Data.CreativeStaffList;
                var CreativeTeacherList = info.Data.CreativeTeacherList;
                v_guid = ProductionInfo.v_guid;
                updataView('t:_TopicList', 'TopicList', { list: TopicList });
                updataView('t:_NotTopicList', 'NotTopicList', { list: NotTopicList });
                updataView('t:_uploadProduction', 'uploadProduction', { list: info.Data.ProductionFileList });
                var topicType = $('#TopicList .check_btn').hasClass('active_btn') ? 0 : 1;
                var formatIndex = 0;
                var productionLLists = [];
                $.each(info.Data.ProductionFileList, function(k, v) {
                    if(v.IsCheck) { 
                        formatIndex = k;
                        productionLLists = info.Data.ProductionFileList[k].FormatFileList;
                        return false;
                    }
                })
                changeType(topicType);
                changeSelect('ProductionFormat' , formatIndex);
                // 渲染作品列表
                $.each(ProductionFileList, function(k, v) {
                    $.each(productionLLists, function(k1, v1) {
                        var types = getFileTypes(v1.fileType);
                        if (v.formatShortName.indexOf(v1.fileType) >= 0) {
                            if (!v.files) {
                                v.files = [];
                            }
                            v.files.push({
                                guid: v1.guid,
                                fileResult: v1.resoutceUrl,
                                resourceGuid: v1.resourceGuid,
                                fileName: types !== 1 ? v1.fileName : ''
                            })
                        }
                    });
                });
                $.each(ProductionFileList, function(k, v) {
                    var types = getFileTypes(v.formatShortName);
                    if (v.formatShortName.toLowerCase() !== 'url') {
                        updataView('t:_workLists' + k, 'workLists' + k, {
                            workListsArr: ProductionFileList[k].files,
                            types: types
                        });
                    }
                })
                $('#production_name').val(ProductionInfo.productio_name);
                $('#production_intro').val(ProductionInfo.productio_intro);
                $('#productio_purpose').val(ProductionInfo.productio_purpose);
                $('#productio_lightspot').val(ProductionInfo.productio_lightspot);
                $('#startDatePicker').val(ProductionInfo.productio_start_date.split(' ')[0]);
                $('#endDatePicker').val(ProductionInfo.productio_end_date.split(' ')[0]);
                $('.myIsInputUrl').val(ProductionInfo.Url);
                isWorkPublic(Math.abs(ProductionInfo.productio_published - 1));
                $('#productio_publishedplace').val(ProductionInfo.productio_publishedplace);
                isWordWonAward(Math.abs(ProductionInfo.productio_borepalm - 1));
                $('#productioAwardContent').val(ProductionInfo.productio_content);
                isVoting(Math.abs(ProductionInfo.productio_networkvote - 1));

                // 封面
                $('#homePagePic').attr('src', ProductionInfo.productio_imgUrl).show();
                $('#homePagePicCover').show();
                $('#upload_homepage .upload_txt').html('修改封面');
                production_cover_guid = ProductionInfo.productio_cover;
                updataView('t:_GuidanceTeacher', 'GuidanceTeacher', { list: CreativeTeacherList });
                updataView('t:_CreativeStaf', 'CreativeStaf', { list: CreativeStaffList });
            }
        }
    }).fail(function(err) {
        layer.msg('服务器异常，请联系管理员！');
    });
}

$(function () {
    schoolInputHide()
})
// 通过文件类型（如jpg/png）获取文件类型标识（如1,2）
function getFileTypes(filetype) {
    var types = 3;
    if ( filetype.indexOf('jpg') >= 0 || filetype.indexOf('png') >= 0 || filetype.indexOf('jpeg') >= 0) {
        types = 1;
    }
    if (filetype.indexOf('pdf') >= 0) {
        types = 2;
    }
    return types;
}

// 根据文件对象获取文件类型
function getFileTypeOrNumber(fileObj, type) {
    var file_name = fileObj.name;
    var file_type_ = file_name.split('.');
    var file_type = file_type_[file_type_.length - 1].toLowerCase();
    if (type === 'number') {
        return getFileTypes(file_type);
    }
    if (type === 'type') {
        return file_type;
    }
}

// 获取或设置作品信息
function getOrSetProductionInfo(id, value) {
    if (!value && value !== 0 && value !== '') {
        return $('#' + id).val().trim();
    } else {
        $('#' + id).val(value);
        return value;
    }
}

// 获取作品总的信息
function getProductionInfos() {
    // 作品名称
    var productio_name = getOrSetProductionInfo('production_name');
    // 作品简介
    var production_intro = getOrSetProductionInfo('production_intro');
    // 作品诉求
    var productio_purpose = getOrSetProductionInfo('productio_purpose');
    // 作品创意亮点说明
    var productio_lightspot = getOrSetProductionInfo('productio_lightspot');
    // 创作开始时间
    var productio_start_date = getOrSetProductionInfo('startDatePicker');
    // 创作结束时间
    var productio_end_date = getOrSetProductionInfo('endDatePicker');
    // 作品是否发表过
    $('#isPublishedItem .radios')
    return {
        productio_name: productio_name,
        production_intro: production_intro,
        productio_purpose: productio_purpose,
        productio_lightspot: productio_lightspot,
        productio_start_date: productio_start_date,
        productio_end_date: productio_end_date
    }
}