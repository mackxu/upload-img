	
	// // 创建接口
	// var LocalImg = new Interface('LocalImg', ['handleFiles']);

	// //创建实现接口的类InputImg
	// var InputImg = function(inputFile) {
	// 	this.inputFile = inputFile;
	// };
	// InputImg.prototype.handleFiles = function() {
		
	// };

	// //创建实现接口的类DragImg
	// var DragImg = function() {};
	// DragImg.prototype.handleFiles = function() {};

	// ==============================================================

	var LocalImg = function() {
		throw new Error('不能实例化类LocalImg');
	};
	LocalImg.fn = LocalImg.prototype;
	LocalImg.fn.init = function(files) {
		this.files = [].slice.call(files);						// 上传的图片

		var container = document.getElementById('container');
		this.list = container.getElementsByClassName('pre-image')[0];
		this.uploadBtn = container.getElementsByClassName('upload-btn')[0];
		this.url = this.uploadBtn.getAttribute('data-uploadto');
	};

	LocalImg.fn.filter = function() {
		var result = [];
		for(var i=0, len=this.files.length;i<len; i++) {
			var file = this.files[i];
			if (/^image\/.*/.test(file.type)) {
				result.push(file);
			}
		}
		this.files = result;							// 符合要求的文件数组
	};
	// 上传图片的缩略图预览
	LocalImg.fn.preview = function() {
		var that = this;

		// 可以在上传到服务器前查看，删除
		this.files.forEach(function(file, index) {
			var reader = new FileReader();
			reader.onload = function() {
				that.list.innerHTML += '<li><img src="'+ this.result +'" alt="'+
					file.name+'" /><span>'+ file.name +'</span><span>删除<span></li>';
				// 缩略图、进度条、删除
			};
			reader.readAsDataURL(file);
		});
	};
	// 让图片异步并行上传
	LocalImg.fn.uploadTo = function() {
		var that = this;
			xhr = null;
			formData = null;
		this.files.forEach(function(file, index) {
			xhr = new XMLHttpRequest();
			xhr.open('POST', that.url);
			formData = new FormData();
			formData.append('file', file);

			// 图片对应的进度条
			var processBar = that.list.getElementsByClassName('process-bar')[index];
			processBar.style.display = 'block';						// 显示进度条框
			// 显示上传进度
			xhr.upload.onprogress = function(e) {
				if (e.lengthComputable) {
					processBar.style.width = 160 * Math.round(e.loaded / e.total) + 'px';
				}
			};
			xhr.upload.onload = function() {};
			xhr.send(formData);
		});
	};

	// InputImg类继承LocalImg
	var InputImg = function(event) {
		var event = event || window.event;
		var target = event.target || event.srcElement;
		this.files = target.files;
	};
	extend(InputImg, LocalImg);
	// LocalDragImg类继承LocalImg
	var DragImg = function(event) {
		this.files = event.dataTransfer.files;
	};
	extend(DragImg, LocalImg);
