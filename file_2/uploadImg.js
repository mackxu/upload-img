	
	
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
				console.log(localImg.files);	
				// 缩略图预览
				// localImg.preview();
				// 为上传按钮添加监听事件程序
				uploadBtn.addEventListener('click', function() {
					localImg.uploadTo(url);
				}, false);
			}, false);

			this.dragImgFiles(dropzone, url);

		},
		dragImgFiles: function(dropzone, url) {
			dropzone.addEventListener('dragenter', function() {

			}, false);
			dropzone.addEventListener('dragleave', function() {}, false);
			dropzone.addEventListener('dragover', function() {}, false);
			dropzone.addEventListener('drop', function(event) {
				var files = event.dataTransfer.files;
				dragImgFactory.handleFiles(files);
			}, false);
		}
	};
