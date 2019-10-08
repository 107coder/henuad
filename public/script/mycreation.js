var producNuber = 0;
$('#commonHeader').load('./components/newHeader.html', null, function() {
    selectHeaderActiveClass('mycreation');
    // 登录按钮和登陆头像的显示隐藏逻辑
    loginBtnAndUserImg();
})
$('.control_left').load('./components/UserCenterSideMenu.html', null, function() {
    userCenterSiderActiveClass('mycreation');
});
$('#commonFooter').load('./components/footer.html')
function initCheckBox(){
    $('.check_box').on('click',function(){
      $(this).parent('.select_main').find('.check_btn').removeClass('active_btn');
      $(this).find('.check_btn').addClass('active_btn');
      console.log($(this).find('.check_btn').attr('data-val'));
    });
}

$('#submitType .btn').on('click',function(){
    var status = $(this).attr('data-val');
    $('#submitType .btn').removeClass('active_btn');
    $(this).addClass('active_btn');
    getUserProducationList({
        status: $(this).attr('data-val')
      },function(data) { 
        if(data.rows.PeriodName){
          producNuber = data.rows.PeriodName;
        }
        $('.right_part').html('共提交'+producNuber+'件作品');
        updataView('t:_creationList', 'creationList', {
            list: data.rows,
            status: status
        });
        // 渲染作品总条数
        $('#workNum').html('共提交'+ data.total +'件作品');
      }
    );
})



function initData(){
    getUserProducationList({
        status: 2
      },function(data) {
        updataView('t:_creationList', 'creationList', {
            list: data.rows,
            status: 2
        });
        // 渲染作品总条数
        $('#workNum').html('共提交'+ data.total +'件作品');
      }
    );
}

function getUserProducationList(data,sucCallback){
    Request_.ajax({
        // key: '/api/UserCenter/GetUserProducationList',
        // type: 'POST',
        key: '',
        type: '',
        data: {
            ProductionStatus: data.status,
            limit:data.limit?data.limit:16
        }, 
        dataType: "json",
        success: function (resp) {
            if(resp.Stata=='10000'){
                sucCallback(resp.Data)
            }else{
                layer.msg(resp.Message);
            }
        }
    })
}

function showDetail(guid, proguid){
    console.log(guid, proguid)
    // 获取作品guid
    Request_.ajax({
        // key: '/api/UserCenter/GetProductionDetailOnLook',
        // type: 'POST',
        key: '',
        type: '',
        data: {
            guid: guid
        }, 
        dataType: "json",
        success: function (resp) {
            var apiHost = resp.Url.split('/api')[0];
            if(resp.Stata=='10000'){
                var productionFormArr = [];
                var CreativeStaffArr = [];
                var CreativeTeacherArr = [];
                // 作品格式去重
                for (var i = 0; i < resp.Data.FileList.length; i++) {
                    if(productionFormArr.indexOf(resp.Data.FileList[i].FileType) < 0) {
                        productionFormArr.push(resp.Data.FileList[i].FileType);
                    }
                }
                for (var i = 0; i < resp.Data.production_CreativeStaffList.length; i++) {
                    if(CreativeStaffArr.indexOf(resp.Data.production_CreativeStaffList[i]) < 0) {
                        CreativeStaffArr.push(resp.Data.production_CreativeStaffList[i]);
                    }
                }
                for (var i = 0; i < resp.Data.production_CreativeTeacherList.length; i++) {
                    if(CreativeTeacherArr.indexOf(resp.Data.production_CreativeTeacherList[i]) < 0) {
                        CreativeTeacherArr.push(resp.Data.production_CreativeTeacherList[i]);
                    }
                }
                // 主创人员去重
                resp.Data.productionFormArr = productionFormArr;
                resp.Data.CreativeStaffArr = CreativeStaffArr;
                resp.Data.CreativeTeacherArr = CreativeTeacherArr;
                var fileList = resp.Data.FileList;
                $.each(fileList, function(k, v) {
                    v.downloadUrl = apiHost + '/api/WebPage/DownLoadFileOnFileGuid?guid=' + v.FileGuid;
                });
                resp.Data.FileList = fileList;
                updataView('t:_productDetails', 'productDetails', { list: resp.Data, proguid: proguid });
            }else{
                layer.msg(resp.Message);
            }
        }
    })
}

function closeDetail(){
    $('#productDetails').html('');
}

function delectItem(guid) {
    layer.alert('是否确认删除', { icon: 0, closeBtn: 1 }, function(index){
        Request_.ajax({
            // key: '/api/UserCenter/DelProductionByGuid',
            // type: 'POST',
            key: '',
            type: '',
            data: {
                guid: guid
            }, 
            dataType: "json",
            success: function (resp) {
                layer.close(index);	
                if(resp.Stata=='10000'){
                    layer.msg('删除成功');
                    var btns = $('#submitType .btn');
                    var status_btn = 0;
                    $.each(btns, function(k, v) {
                        if($(v).hasClass('active_btn')) {
                            if (k <= 0) { status_btn = 2; }
                            if (k > 0) { status_btn = 1; }
                            return false;
                        }
                    });
                    // 重新刷新列表
                    getUserProducationList({
                        status: status_btn
                      },function(data) {
                        updataView('t:_creationList', 'creationList', {
                            list: data.rows,
                            status: status_btn
                        });
                        // 渲染作品总条数
                        $('#workNum').html('共提交'+ data.total +'件作品');
                      }
                    );
                }else{
                    layer.msg(resp.Message);
                }
            }
        })
    });
    
}