<?php

	// 处理ajax上传的图片文件
	if(isset($_FILES['file'])) {
		move_uploaded_file($_FILES['file']['tmp_name'], 'images/'.$_FILES['file']['name']);
	}

	print_r($_FILES['file']);