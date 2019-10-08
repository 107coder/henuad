<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>添加评委</title>
    <link rel="stylesheet" href="">
</head>
<style>
    table,th,td {
        border-collapse:collapse;
        background:#fff;
    }
    table tr td{
        display: inline-block;
    }
    table tr td:nth-child(1){

        width:100px;
        color:#000;
        font-size:18px;
        text-align: right;
    }
    .table tr{
        height:40px;
        line-height:40px;

    }
    .table tr th {
        white-space:nowrap;
        text-align:center;
        font-size:20px;
        color: #3B96CB;
        background: #fff9ec;
        font-weight: 800;
    }
    .input_button{
        text-align: center;
    }
    span{
        color:red;
    }
</style>
<body>
<form action="<?php echo site_url() .'/admin/judges/judges_verity' ?>" method="POST" enctype="multipart/form-data">
    <table class="table">
        <tr >
            <th colspan="10">添加评委</th>
        </tr>
        <tr>
            <td>评委姓名:</td>
            <td>
                <input style="width:300px;height:20px;" type="text" name="Name" value="<?php echo set_value('Name')?>"/>
                <?php echo form_error('Name','<span>','</span>'); ?>
            </td>
        </tr>

        <tr>
            <td>所属类别:</td>
            <td>
                <select name="TypeId" id="">
                    <?php foreach($type as $v): ?>
                        <option value="<?php echo $v['TypeId'] ?>"<?php echo set_select('TypeId', $v['TypeId']) ?>><?php echo $v['TypeName'] ?></option>
                    <?php endforeach ?>
                </select>
            </td>
        </tr>

        <tr>
            <td>图片上传:</td>
            <td>
                <input type="file" name="Picture"/>
            </td>
        </tr>
        <tr>
            <td>职位:</td>
            <td>
                <input style="width:300px;height:20px;" type="text" name="Position" value="<?php echo set_value('Position')?>"/>
                <?php echo form_error('Position','<span>','</span>'); ?>
            </td>
        </tr>
        <tr>
            <td>简介:</td>
            <td>
                <!-- 加载编辑器的容器 -->
                <textarea name="Introduction" id="introduction" style50px;height:500px;"><?php echo set_value('Introduction') ?></textarea>
                <?php echo form_error('Introduction', '<span>', '</span>') ?>

            </td>
        </tr>
        <tr>
            <td colspan="10" ><input type="submit" class="input_button" value="添加"/></td>
        </tr>
    </table>
</form>
</body>
<!-- 配置文件 -->
<script type="text/javascript" src="<?php  echo base_url('utf8_php/');?>ueditor.config.js"></script>
<!-- 编辑器源码文件 -->
<script type="text/javascript" src="<?php  echo base_url('utf8_php/');?>ueditor.all.js"></script>
<!-- 实例化编辑器 -->
<script type="text/javascript">
    window.onload = function(){
        window.UEDITOR_CONFIG.initialFrameWidth = 900;
        window.UEDITOR_CONFIG.initialFrameHeight = 300;
        UE.getEditor('introduction',{
            enterTag : 'br'
        });
    }

</script>
</html>


