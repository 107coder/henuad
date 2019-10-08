var JudgesTypeList = [], JudgesList = [], JudgesPeriodList = [];
var PeriodGuid = '', JudgeTypeGuid = '';
var currentPage = 0, limitNum = 30, totalNum = 0;
var JudgeGuid = '';
var locationSearch = formatQuery(location.search);
if (locationSearch) {
    JudgeGuid = locationSearch.guid;
}
// 初始获取届数信息
getPeriodListForJudges();
// 获取评委类型
getPeriodType();
// 初始头部带guid则是从首页过来，直接显示详情
$(function() {
    if (JudgeGuid) { readDetail(JudgeGuid); }
})

// 加载评委类型列表
function getPeriodType() {
    Request_.ajax({
        // key: '/api/WebPage/GetJudgeTypeList',
        // type: 'GET',
        key: '',
        type: '',
        data: {},
        success: function(info) {
            if (info && info.Stata === 10000) {
                JudgesTypeList = info.Data;
                updataView('t:_JudgesTypeList', 'JudgesTypeList', { list: JudgesTypeList });
            } else {
                layer.msg(info.Message);  
            }
        }
    }).fail(function(err) {
        layer.msg('服务器异常，请联系管理员');    
    });
}

// 获取届数列表
function getPeriodListForJudges() {
    Request_.ajax({
        // key: '/api/WebPage/GetPeriodList',
        // type: 'GET',
        key: '',
        type: '',
        data: {},
        success: function(info) {
            if (info && info.Stata === 10000) {
                JudgesPeriodList = info.Data;
                updataView('t:_JudgesPeriod', 'JudgesPeriod', { list: JudgesPeriodList });
                // 初始页面时加载实习就业列表
                if (!locationSearch || !locationSearch.guid) {
                    getJudgesListByGuid();
                }
            } else {
                layer.msg(info.Message);  
            }
        }
    }).fail(function(err) {
        layer.msg('服务器异常，请联系管理员');    
    });
}

// 根据评委类型加载评委列表
function getJudgesListByGuid(params) {
    if (params && params.Period) {
        PeriodGuid = params.Period;
    }
    if (params && params.TypeGuid) {
        JudgeTypeGuid = params.TypeGuid;
    }
    if ((params && params.page) || (params && params.page === 0)) {
        currentPage = params.page;
    }
    if(params && params.num) {
        limitNum = params.num;
    }
    isListOrDetail('list');
    Request_.ajax({
        // key: '/api/WebPage/LPJudgeList',
        // type: 'GET',
        key: '',
        type: '',
        data: {
            PeriodGuid: PeriodGuid,
            JudgeTypeGuid: JudgeTypeGuid,
            offset: currentPage,
            limit: limitNum
        },
        success: function(info) {
            if (info && info.Stata === 10000) {
                JudgesList = info.Data.rows;
                currentPage = info.Data.index;
                totalNum = info.Data.total;
                if (JudgesList && JudgesList.length && (JudgesList.length) % 4 > 0) {
                    var repairLength = 4 - (JudgesList.length) % 4;
                    for (var i = 0; i < repairLength; i++) {
                        JudgesList.push({
                            isEmpty: true
                        })
                    }
                }
                updataView('t:_JudgesList', 'JudgesList', { list: JudgesList });
                updataView('t:_navigationList', 'navigationList', {
                    total: totalNum,
                    page: currentPage,
                    num: limitNum,
                    Period: PeriodGuid,
                    TypeGuid: JudgeTypeGuid
                });
                
            } else {
                layer.msg(info.Message);  
            }
        }
    }).fail(function(err) {
        layer.msg('服务器异常，请联系管理员');    
    });
}

// 切换评委类型
function changeJudgesType(index, guid) {
    $('#JudgesTypeList .btn').removeClass('active_btn');
    $('#JudgesTypeList .btn:eq('+ index +')').addClass('active_btn');
    JudgeTypeGuid = guid;
    var params = {
        Period: PeriodGuid,
        TypeGuid: JudgeTypeGuid,
        page: 0,
        num: limitNum
    }
    getJudgesListByGuid(params);
}

// 切换届数
function changeSideMenu(index, guid) {
    PeriodGuid = guid;
    $('#JudgesPeriod .employmentSideMenu').removeClass('active');
    $('#JudgesPeriod .employmentSideMenu:eq('+ index +')').addClass('active');
    var params = {
        Period: PeriodGuid,
        TypeGuid: JudgeTypeGuid,
        page: 0,
        num: limitNum
    }
    getJudgesListByGuid(params);
}

// 根据guid获取评委详情
function getJudgeDetailByGuid(guid) {
    document.body.scrollTop = 0;
    Request_.ajax({
        // key: '/api/WebPage/GetJudgeDetail',
        // type: 'GET',
        key: '',
        type: '',
        data: {
            JudgeGuid: guid,
            Index: 8
        },
        success: function(info) {
            if (info && info.Stata === 10000) {
                var JudgeDetail = info.Data.JudgeDetail;
                var OtherJudgeList = info.Data.OtherJudgeList;
                updataView('t:_Judges-detail', 'Judges-detail', {
                    JudgeDetail: JudgeDetail,
                    OtherJudgeList: OtherJudgeList
                });
            } else {
                layer.msg(info.Message);  
            }
        }
    }).fail(function(err) {
        layer.msg('服务器异常，请联系管理员');    
    });
}

function readDetail(guid) {
    getJudgeDetailByGuid(guid);
    isListOrDetail('detail');
}

function isListOrDetail(type) {
    console.log(type, $('#Judges-list'), $('#Judges-detail'))
    if (type === 'list') {
        $('#Judges-list').show();
        $('#Judges-detail').hide();
    } else {
        $('#Judges-list').hide();
        $('#Judges-detail').show();
    }
}

function nextPage(params) {
    var totalPage = Math.ceil(totalNum / limitNum);
    if (params.page >= totalPage) {
        return
    }
    getJudgesListByGuid(params);
}

function lastPage(params) {
    var totalPage = Math.ceil(totalNum / limitNum);
    if (params.page < 0) {
        return
    }
    getJudgesListByGuid(params);
}

function showCoverCeng(el) {
    $(el).find('.cover-ceng').removeClass('top100');
    $(el).find('.cover-ceng').addClass('top0');
    $(el).find('.go').css({
        opacity: 1
    });
}

function hideCoverCeng(el) {
    $(el).find('.cover-ceng').removeClass('top0');
    $(el).find('.cover-ceng').addClass('top100');
    $(el).find('.go').css({
        opacity: 0
    });
}