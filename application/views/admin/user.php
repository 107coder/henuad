<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" href="<?php  echo base_url('public/admin/');?>css/amazeui.min.css" />
    <link rel="stylesheet" href="<?php  echo base_url('public/admin/');?>css/admin.css" />
</head>
<style>
    .am-fr > strong{
        display: inline-block;
        width:40px;
        color: #444;
        height:33px;
        border: 1px solid transparent;
        background-color: #c4c4c4;
        text-align: center;
        margin-left:5px;
        cursor: pointer;
        font-size: 18px;
        transition: background-color .3s ease-out,border-color .3s ease-out;
    }
    .am-fr > .am-disabled:hover,.am-fr > strong:hover{
        background-color: #c4c4c4;
        color:#0e90d2;
        border-color:#eee;
    }
    .am-fr > .am-disabled{
        display: inline-block;
        width:40px;
        height:33px;
        text-align: center;
        color: #444;
        font-size:18px;
        border: 1px solid transparent;
        background-color: #e6e6e6;
        margin-left:5px;
        transition: background-color .3s ease-out,border-color .3s ease-out;
    }
    button a{

        text-decoration: none;
    }
</style>
<body>
<div class="admin-content-body">
    <div class="am-cf am-padding am-padding-bottom-0">
        <div class="am-fl am-cf"><strong class="am-text-primary am-text-lg">用户管理</strong><small></small></div>
    </div>

    <hr>

    <div class="am-g">
        <div class="am-u-sm-12 am-u-md-6">
            <div class="am-btn-toolbar">
                <div class="am-btn-group am-btn-group-xs">
                    <button type="button" class="am-btn am-btn-default"><a style="color:#000" href="javascript:void(0)"  onclick="addUser('添加管理员',1)"><span class="am-icon-plus"></span> 新增</a></button>
                </div>
            </div>
        </div>
        <div class="am-u-sm-12 am-u-md-3">

        </div>
        <div class="am-u-sm-12 am-u-md-3">
            <div class="am-input-group am-input-group-sm">
                <input type="text" class="am-form-field" placeholder="请输入用户姓名">
                <span class="am-input-group-btn">
            <button class="am-btn am-btn-default" type="button">搜索</button>
          </span>
            </div>
        </div>
    </div>
    <div class="am-g">
        <div class="am-u-sm-12">
            <form class="am-form">
                <table class="am-table am-table-striped am-table-hover table-main">
                    <thead>
                    <tr>
                        <th class="table-check"><input type="checkbox"></th>
                        <th class="table-type">用户名</th>
                        <th class="table-title">姓名</th>
                        <th class="table-author am-hide-sm-only">邮箱</th>
                        <th class="table-type">注册时间</th>
                        <th class="table-set">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php foreach ($user as $v):?>
                        <tr>
                            <td><input type="checkbox"></td>
                            <td><?=$v['mobileNumber'] ?></td>
                            <td>
                                <a href="#"><?=$v['name'] ?></a>
                            </td>
                            <td><?=$v['email'] ?></td>
                            <td><?php $datestring = '%Y-%m-%d %h:%i';echo mdate($datestring,$v['registerTime'])?></td>
                            <td>
                                <div class="am-btn-toolbar">
                                    <div class="am-btn-group am-btn-group-xs">
                                        <button class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only" <?php if($v['isAdmin']==1) echo 'disabled'?>><a class="am-text-danger" href="<?php echo site_url('admin/users/user_del/' . $v['mobileNumber']) ?>"><span class="am-icon-trash-o"></span> 删除</a></button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    <?php endforeach;?>
                    </tbody>
                </table>
                <div class="am-cf">
                    共 <?php if(isset($total))echo $total?> 条记录
                    <div class="am-fr">
                        <?php echo $links ?>
                    </div>
                </div>
                <hr>
            </form>
        </div>
    </div>
</div>
<script type="text/javascript" src="<?php  echo base_url('style/admin/');?>js/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="<?php  echo base_url('style/admin/');?>myplugs/js/plugs.js"></script>
<script type="text/javascript">
    //添加编辑弹出层
    function addUser(title, id) {
        $.jq_Panel({
            title: title,
            iframeWidth: 500,
            iframeHeight: 300,
            url: "<?php echo site_url() .'/admin/admin_user/add_admin' ?>"
        });
    }
</script>
</body>
</html>