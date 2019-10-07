var loginTimer = null;
function initPageEvent(){
    $('.form-input').on('click',function(){
        $(this).find('input[type="text"]').focus();
        $(this).find('input[type="password"]').focus();
    });
    
    $('.password-login').on('click',function() {
        $('#form1').show();
        $('#form2').hide();
        $('.code-login').removeClass('selected');
        $(this).addClass('selected');
    })
    
    $('.code-login').on('click',function() {
        $('#form1').hide();
        $('#form2').show();
        $('.password-login').removeClass('selected')
        $(this).addClass('selected');
    })
    
    $('.get-code').on('click',function(){
        var mobileNum=$('#mobile2').val();
        if(mobileNum.length>0&&REGEXP.tel.test(mobileNum)){
            sendCode(mobileNum,$(this));
        }else{
            addRegexpError($('#mobile2'));
        }
     });

     initRegexp();

     $('#login1').on('click',function(){ 
          var mobile=$('#mobile1').val();
          var password=$('#password').val();
          if(mobile&&password){
            loginWithPassWord(mobile,password,function(userInfo){
                if($('#passwordCode').is(':checked')){
                    langsaveUserInfo(userInfo)
                }
                saveUserInfo(userInfo);             
                layer.msg('登陆成功');
                if (loginTimer) {
                    clearTimeout(loginTimer);
                }
                loginTimer = setTimeout(function() {
                    window.location.href='../../index.html';
                }, 1000)
                
            })
          }else{
            if(!mobile) addRegexpError($('#mobile1'));
            if(!password) addRegexpError($('#password'));
          }
     });

     $('#login2').on('click',function(){
          var mobile=$('#mobile2').val();
          var code=$('#mobileCode').val();
          if(mobile&&code){
            loginWithCode(mobile,code,function(userInfo){
                if($('#imgCode').is(':checked')){
                    langsaveUserInfo(userInfo)
                }
                saveUserInfo(userInfo);              
                layer.msg('登陆成功');
                if (loginTimer) {
                    clearTimeout(loginTimer);
                }
                loginTimer = setTimeout(function() {
                    window.location.href='../../index.html';
                }, 1000) 
            })
          }else{
            if(!mobile) addRegexpError($('#mobile2'));
            if(!code) addRegexpError($('#mobileCode'));
          }
     });
}

function loginWithPassWord(mobile,password,sucCallback){
    var userInfo={
        tel:mobile,
        token:''
    }
    Request_.ajax({
        // key: '/api/Account/Login',
        // type: 'POST',
        key: '',
        type: '',
        data: {
            tel: mobile,
            password: password
        }, 
        dataType: "json",
        
        success: function (resp) {
            if(resp.Stata=='10000'||resp.Stata=='200'){
                userInfo.token=resp.Message;
                
                sucCallback(userInfo)
            }else{
                layer.msg(resp.Message);
            }
        }
    })
}

function loginWithCode(mobile,code,sucCallback){
    var userInfo={
        tel:mobile,
        token:''
    }
    Request_.ajax({
        // key: '/api/Account/LoginByCode',
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
                userInfo.token=resp.Message; 
                sucCallback(userInfo);
            }else{
                layer.msg(resp.Message);
            }
        }
    })
}

function sendCode(mobile,element){
    Request_.ajax({
        // key: '/api/Account/SendLoginSms',
        // type: 'POST',
        key: '',
        type: '',
        data: {
            tel: mobile
        }, 
        success: function (resp) {
            if(resp.Stata=='10000'){
                setTime(element);
            }else{
                layer.msg(resp.Message);
            }
        }
    })
}

function saveUserInfo(userInfo){
    sessionStorage.setItem('UserInfo',JSON.stringify(userInfo))
}
function langsaveUserInfo(userInfo){
    localStorage.setItem('UserInfo',JSON.stringify(userInfo))
}