<!--头部导航-->
<div id="commonHeader">
    <header class="headerBase">
        <div class="container">
            <div class="navbar-header">
                <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#bs-navbar" aria-controls="bs-navbar" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <img src="./images/logo.png" class="navbar-brand" onclick="navTo('../index')" alt="">
            </div>
            <nav id="bs-navbar" class="collapse navbar-collapse">
                <ul class="nav navbar-nav navbar-left">
                    <li onclick="" name="index" class="active">
                        <a href="<?php echo site_url() .'/index/PublicView/index' ?>">首页</a>
                    </li>

                    <li onclick="" name="about">
                        <a href="<?php echo site_url() .'/index/PublicView/about' ?>">关于大广节</a>
                    </li>
                    <li onclick="" name="news">
                        <a href="<?php echo site_url() .'/index/PublicView/news_more' ?>">新闻动态</a>
                    </li>
                    <li onclick="" name="judgesIntroduce">
                        <a href="<?php echo site_url() .'/index/PublicView/judges_more' ?>">评审介绍</a>
                    </li>

                    <li onclick="" name="linkus">
                        <a href="<?php echo site_url() .'/index/PublicView/contact' ?>">联系我们</a>
                    </li>
                </ul>

                <!-- mavleft -->
                <?php if(empty($this->session->mobile)){?>
                    <ul class="nav navbar-nav navbar-right" id="unLogin">
                        <li onclick=""><a href="<?=site_url('index/PublicView/login')?>">登录</a>
                        </li>
                        <li onclick=""><a href="<?=site_url('index/PublicView/register')?>">注册</a>
                        </li>
                    </ul>
                <?php } else {?>
                    <div class="nav navbar-nav navbar-right" id="userPic" style="" onmouseleave="hideUserImgList(event)">
                        <img id="user-image" onmouseenter="getUserCenterList(event)" src="./images/touxiang.jpg" width="40" alt="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <div id="user-navbar" class="hideList">
                            <div class="navbar-content">
                                <a href="<?=site_url('index/PrivateView/userInfo')?>"> <div class="navbar-item active" onclick="" name="user-info">个人信息</div></a>
                                <a href="<?=site_url('index/PrivateView/upload')?>"> <div class="navbar-item" onclick="" name="upload">作品上传</div></a>
                                <a href="<?=site_url('index/PrivateView/myCreation')?>"> <div class="navbar-item" onclick="" name="mycreation">我的作品</div></a>
                                <a href="<?=site_url('index/PrivateView/changePassword')?>"> <div class="navbar-item" onclick="" name="changePassword">修改密码</div></a>
                                <a href="<?=site_url('index/UserAction/loginOut')?>"><div class="navbar-item" onclick="">安全退出</div></a>
                            </div>
                        </div>
                    </div>
                <?php }?>

            </nav>
        </div>
    </header>
</div>