<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" href="<?php  echo base_url('public/admin/');?>css/amazeui.min.css" />
    <link rel="stylesheet" href="<?php  echo base_url('public/admin/');?>css/admin.css" />
</head>
<style>
    #admin_one{
        width:100%;
    }
    #admin_one table{
        width:100%;
        background:#f9f9f9;

    }
    .table-main{
        font-size:1.8rem;
    }
</style>
<body>

<div class="admin-content-body id="admin_one">
<div class="am-cf am-padding am-padding-bottom-0">
    <div class="am-fl am-cf">
        <strong class="am-text-primary am-text-lg">欢迎光临河南大学广告节后台</strong>
    </div>
</div>

<hr>
<table class="table am-table am-table-striped am-table-hover table-main">
    <tr>
        <td>用户名</td>
        <td style="color:#cccc77;font-weight: bold"><?php echo $this->session->userdata('username') ?></td>
    </tr>
    <tr>
        <td>登录时间</td>
        <td style="color:#cccc77;font-weight: bold"><?php $datestring = '%Y-%m-%d - %h:%i';echo mdate($datestring,$this->session->userdata('login_time')) ?></td>
    </tr>
    <tr>
        <td>客户端IP</td>
        <td style="color:#cccc77;font-weight: bold"><?php echo $this->input->ip_address() ?></td>
    </tr>
    <tr>
        <td colspan='2' class="th"  style="font-size:20px;color:#0e90d2"><span class="span_server" style="float:left">&nbsp</span>服务器信息</td>
    </tr>
    <tr>
        <td>服务器环境</td>
        <td style="color:#cccc77;font-weight: bold"><?php echo $this->input->server('SERVER_SOFTWARE') ?></td>
    </tr>
    <tr>
        <td>PHP版本</td>
        <td style="color:#cccc77;font-weight: bold"><?php echo PHP_VERSION ?></td>
    </tr>
    <tr>
        <td>服务器IP</td>
        <td style="color:#cccc77;font-weight: bold"><?php echo $this->input->server('SERVER_ADDR') ?></td>
    </tr>

</table>



</div>
</body>
</html>

