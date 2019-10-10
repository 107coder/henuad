<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
        <base href="<?=base_url();?>">
	    <link rel="stylesheet" href="public/admin/css/amazeui.min.css">
		<link rel="stylesheet" href="public/admin/css/admin.css">
		<link rel="stylesheet" href="public/admin/css/app.css">
		<style>
			.admin-main{
				padding-top: 0px;
			}
		</style>
	</head>
	<body>
		<div class="am-cf admin-main">
		<!-- content start -->
		<div class="admin-content">
			<div class="admin-content-body">
				<div class="am-g">
					<form action="<?php echo site_url('admin/background/pwd_verify')?>" class="am-form am-form-horizontal" method="post" style="padding-top:30px;" data-am-validator>
                        <div class="am-form-group">
                            <label for="user-name" class="am-u-sm-3 am-form-label">
                                原始密码 </label>
                            <div class="am-u-sm-9">
                                <input type="password" id="doc-vld-pwd-1" required placeholder="请输入原始密码"
                                       name="password"> <small>输入原始密码。</small>
                            </div>
                        </div>
						<div class="am-form-group">
							<label for="user-name" class="am-u-sm-3 am-form-label">
							新密码 </label>
							<div class="am-u-sm-9">
								<input type="password" id="doc-vld-pwd-1" required placeholder="请输入新密码" 
									name="passwordN"> <small>输入新密码。</small>
							</div>
						</div>
						<div class="am-form-group">
							<label for="user-name" class="am-u-sm-3 am-form-label">
								重复密码</label>
							<div class="am-u-sm-9">
								<input type="password" id="doc-vld-pwd-2" required placeholder="请输入重复密码" 
									name="passwordE"  data-equal-to="#doc-vld-pwd-1"  required> <small>输入重复密码。</small>
							</div>
						</div>
						<div class="am-form-group">
							<div class="am-u-sm-9 am-u-sm-push-3">
								<input type="submit" class="am-btn am-btn-success" value="修改密码" />
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript"
		src="public/admin/assets/js/libs/jquery-1.10.2.min.js">
	</script>
	<script type="text/javascript" src="public/admin/myplugs/js/plugs.js">
	</script>
	</body>
</html>
