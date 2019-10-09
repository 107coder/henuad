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
    </style>
	<body>
		<div class="admin-content-body">
			<div class="am-cf am-padding am-padding-bottom-0">
				<div class="am-fl am-cf"><strong class="am-text-primary am-text-lg">类别管理</strong><small></small></div>
			</div>

			<hr>

			<div class="am-g">
				<div class="am-u-sm-12 am-u-md-6">
					<div class="am-btn-toolbar">
						<div class="am-btn-group am-btn-group-xs">
                            <button type="button" class="am-btn am-btn-default"><a style="display: inline-block;color:#000;" href="<?php echo site_url() .'/admin/type/add_type' ;?>"><span class="am-icon-plus"></span> 新增</a></button>
						</div>
					</div>
				</div>
				<div class="am-u-sm-12 am-u-md-3">

				</div>
				<div class="am-u-sm-12 am-u-md-3">
					<div class="am-input-group am-input-group-sm">
						<input type="text" class="am-form-field"  placeholder="请输入类型">
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
									<th class="table-id">ID</th>
									<th class="table-title">类别</th>
									<th class="table-set">操作</th>
								</tr>
							</thead>
							<tbody>
                                <?php foreach($type as $v): ?>
								<tr>
									<td><input type="checkbox"></td>
									<td><?php echo $v['TypeId'] ?></td>
									<td>
										<a href="#"><?php echo $v['TypeName'] ?></a>
									</td>
									<td>
										<div class="am-btn-toolbar">
											<div class="am-btn-group am-btn-group-xs">
                                                <button class="am-btn am-btn-default am-btn-xs am-text-secondary"><a href="<?php echo site_url('admin/type/edit_type/' . $v['TypeId']) ?>"><span class="am-icon-pencil-square-o"></span> 编辑</a></button>
                                                <button class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only"><a href="<?php echo site_url('admin/type/del/' . $v['TypeId']) ?>"><span class="am-icon-trash-o"></span> 删除</a></button>
											</div>
										</div>
									</td>
								</tr>
                                <?php endforeach ?>
							</tbody>
						</table>
						<div class="am-cf">
							共 <?php echo $total;?> 条记录
							<div class="am-fr">
                                <?php echo $links;?>
							</div>
						</div>
						<hr>
					</form>
				</div>

			</div>
		</div>
		
	
	</body>

</html>