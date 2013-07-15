	
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
	};

	LocalImg.fn.filter = function() {
		var result = [];
		this.files.forEach(function(file, index) {
			if (/^image\/.*/.test(file.type)) {
				result.push(file);
			}
		});
		return result;
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
	LocalImg.fn.uploadTo = function() {};

	// InputImg类继承LocalImg
	var InputImg = function() {
		this.init.apply(this, arguments);
	};
	extend(InputImg, LocalImg);
	// LocalDragImg类继承LocalImg
	var DragImg = function() {
		this.init.apply(this, arguments);
	};
	extend(DragImg, LocalImg);
