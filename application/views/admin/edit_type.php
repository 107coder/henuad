<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>编辑文章栏目</title>
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
<form action="<?php echo site_url() .'/admin/type/edit' ?>" method="POST">
    <table class="table">
        <tr >
            <th colspan="10">编辑新闻类别</th>
        </tr>
        <tr>
            <td>类别名称:</td>
            <td>
                <input style="width:200px;height:20px;" type="text" name="TypeName" value="<?php echo $type[0]['TypeName'] ?>"/>
                <?php echo form_error('TypeName','<span>','</span>'); ?>
            </td>
        </tr>
        <tr>
            <input type="hidden" name="TypeId" value="<?php echo $type[0]['TypeId'] ?>"/>
            <td colspan="10" ><input type="submit" class="input_button" value="编辑"/></td>
        </tr>
    </table>
</form>
</body>
</html>



