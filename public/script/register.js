var mobileNum='';

function initPage(){
    $('.form-input').on('click',function(){
        $(this).find('input[type="text"]').focus();
    })
    initStep1();
    initRegexp();
}

function initStep1(){
     $('#next_step2').on('click',function(){
        var mobileCode=null;
        mobileNum=$('#regMobile').val();
        mobileCode=$('#regMobileCode').val()
        if(mobileNum&&mobileCode){
            checkRegStep1(mobileNum,mobileCode,function(){
                $('#step1').hide();
                $('#step2').show();
            })
            initStep2();
        }else{
           if(!mobileNum) addRegexpError($('#regMobile'));
           if(!mobileCode) addRegexpError($('#regMobileCode'));
        }
     });

     $('.get-code').on('click',function(){
        mobileNum=$('#regMobile').val();
        if(mobileNum.length>0&&REGEXP.tel.test(mobileNum)){
            sendCode(mobileNum,$(this));
        }else{
            addRegexpError($('#regMobile'));
        }
     });
}

function initStep2(){
     $('#next_step3').on('click',function(){
        var password=$('#password').val();
        var confirmPassword=$('#confirmPassword').val();
        if(password&&confirmPassword){
            if(password!==confirmPassword){
               addRegexpError($('#confirmPassword'),'密码不一致');
               return;
            }
            setPassWord(mobileNum,password,function(){
                $('#step2').hide();
                $('#step3').show();
            })
        }else{
            if(!password) addRegexpError($('#password'));
            if(!confirmPassword) addRegexpError($('#confirmPassword'));
        }

     });
     $('#step2 .form-input').on('click',function(){
        $(this).find('input[type="password"]').focus();
    })
     $('#register_suc').on('click',function(){ 
         window.location.href = window.location.origin + '/index.html'; 
     })
}


function sendCode(mobile,element){
    console.log(mobile);
    $.ajax({
        // key: '/api/Account/SendRestigerSms',
        // type: 'POST',
        // key: '',
        url:'<?php echo site_url("index/PublicView/sendCode");?>',
        type: 'post',
        data: {
            phoneNumber: mobile,
            action:'register'
        },
        dataType:'json',
        success: function (resp) {
            console.log(resp);
            if(resp.Stata=='10000'){
                setTime(element);
            }else{
                console.log('resp');
                layer.msg(resp.Message);
            }
        },
        error: function()
        {
            console.log('error');
        }
    })
}


function checkRegStep1(mobile,code,sucCallback){
    Request_.ajax({
        // key: '/api/Account/CheckSmsCode',
        // type: 'POST',
        key: '',
        type: '',
        data: {
            tel: mobile,
            code: code
        }, 
        dataType: "json",
        success: function (resp) {
            if(resp.Stata=='10000'){
                sucCallback()
            }else{
                layer.msg(resp.Message);
            }
        }
    })
}

function setPassWord(mobile,password,sucCallback){
    Request_.ajax({
        // key: '/api/Account/Register',
        // type: 'POST',
        key: '',
        type: '',
        data: {
            tel: mobile,
            password: password
        },
        success: function (resp) {
            if(resp.Stata=='10000'){
                sucCallback()
            }else{
                layer.msg(resp.Message);
            }
        }
    })
}