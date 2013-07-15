	
	
	var uploadImg = {
		// 1.获取元素引用
		// 2.添加事件处理程序
		// 3.初始化参数
		init: function() {
			console.log('uploadImg');
			var container = document.getElementById('container');
			// 添加文件的input控件
			var inputFile = container.getElementsByClassName('upload-img')[0];
			// 拖拽文件的目标元素
			var dropzone = container.getElementsByClassName('dropzone')[0];
			// 缩略图预览列表
			var list = container.getElementsByClassName('pre-image')[0];
			// 所有进度条
			var processBars = list.getElementsByClassName('process-bar');
			// 上传按钮
			var uploadBtn = container.getElementsByClassName('upload-btn')[0];
			var url = uploadBtn.getAttribute('data-uploadto');				// 上传url地址
			
			// this.localImg = null;
			// 根据特性创建不同的对象
			// 通过创建的对象调用对应的handleFiles()方法
			inputFile.addEventListener('change', function(event) {
				// 创建localImg类对象
				var localImg = inputImgFactory.factoryMethod(event);
				localImg.filter();	
				// 缩略图预览
				localImg.preview(list);
				// 为上传按钮添加监听事件程序
				uploadBtn.addEventListener('click', function() {
					localImg.uploadTo(url, processBars);
				}, false);
			}, false);

			this.dragImgFiles(dropzone, url, list, processBars, uploadBtn);

		},
		dragImgFiles: function(dropzone, url, list, processBars, uploadBtn) {
			dropzone.addEventListener('dragenter', function(event) {
				console.log('dragenter');
				event.preventDefault();
				CSS.setCSS(dropzone, {'backgroundColor': 'rgba(0, 0, 0, 0.6)'});
			}, false);
			dropzone.addEventListener('dragleave', function(event) {// 当文件离开释放区域
				event.preventDefault();
				CSS.setCSS(dropzone, {'backgroundColor': ''});
			}, false);
			dropzone.addEventListener('dragover', function(event) {
				event.preventDefault();
				event.stopPropagation();
			}, false);
			dropzone.addEventListener('drop', function(event) {
				event.preventDefault();
				event.stopPropagation();
				CSS.setCSS(dropzone, {'backgroundColor': ''});
				
				// 创建localImg类对象
				var localImg = dragImgFactory.factoryMethod(event);
				localImg.filter();	
				// 缩略图预览
				localImg.preview(list);
				// 为上传按钮添加监听事件程序
				uploadBtn.addEventListener('click', function() {
					localImg.uploadTo(url, processBars);
				}, false);
			}, false);
		}
	};
