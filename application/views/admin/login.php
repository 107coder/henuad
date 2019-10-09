<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>广告节网站管理系统</title>
    <link rel="stylesheet" href="<?php  echo base_url('public/admin/');?>loginimg/css/css.css" type="text/css">
    <base onmouseover="window.status='网站管理系统';return true">
</head>

<body onLoad="document.login.username.focus();">
<div class="login_top">
    <div class="login_logo"><img src="<?php  echo base_url('public/admin/');?>loginimg/images/logo02.gif" alt="" /></div>
    <p class="top_nav"><a href="" target="_blank">帮助中心</a>|<a href="" target="_blank">求助客服</a></p>
</div>
<div class="login">
    <div class="login_main">
        <div class="login_left">

        </div>
        <div class="login_right">
            <div class="dl_top"></div>
            <h2 class="go">管理员登录</h2>
            <div class="dl_main">
                <form name="login" id="login" method="post" action="<?php echo site_url('admin/login/login_in')?>">
                    <input type="hidden" name="enews" value="login">
                    <table class="tab" border="0">
                        <tr>
                            <td align="center">手机号：</td>
                            <td><input style="width:150px;" name="mobileNumber" class="inp" size=15 maxlength=40></td>
                        </tr>
                        <tr>
                            <td align="center">密&nbsp;&nbsp;&nbsp;&nbsp;码：</td>
                            <td><input style="width:150px;" name="password" type="password" class="inp" id="password" size=15 maxlength=40></td>
                        </tr>
                        <tr>
                            <td align="center">验&nbsp;证&nbsp;码：</td>
                            <td>
                                <input style="width:150px;" name="captcha" type="text"  size="9">
                            </td>
                            <td>&nbsp;&nbsp;<img src="<?php echo site_url('admin/login/code')?>" name="KeyImg" id="KeyImg" align="middle" alt="看不清楚,点击刷新"></td>
                        </tr>


                    </table>
                    <div class="an">
                        <input name="submit" type="submit" value="登录" /><input name="reset" type="reset" value="重输" />
                    </div>
                </form>
                <ul class="new">
                    <li><a href="http://www.daxiao360.cn" target="_blank">忘记了后台密码怎么办？</a></li>
                    <li><a href="http://www.daxiao360.cn" target="_blank">后台使用视频教程。</a></li>
                    <li><a href="http://www.daxiao360.cn" target="_blank">使用网站系统后台的几个注意事项。</a></li>
                </ul>
            </div>
            <div class="dl_bottom"></div>
        </div>
    </div>
</div>
<div class="clear"></div>
<div class="login_footer">
    <p>Webmofun system 2.0</p>
</div>
<script>
    if(document.login.equestion.value==0)
    {
        showanswer.style.display='none';
    }
</script>
</body>
</html>
