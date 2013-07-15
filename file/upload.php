<?php

	// 处理ajax上传的图片文件
	foreach ($_FILES as $file) {
		move_uploaded_file($file['tmp_name'], 'images/'.$file['name']);
	}
	
	