
	/**
	 * 实例：
	 * var inputImgFactory = new InputImgFactory();
	 * var files = inputImgFactory.getFiles();
	 */
	// 创建抽象类工厂
	var LocalImgFactory = {
		createLocalImg: function() {
			throw new Error('LocalImgFactory是一个抽象类,子类需要实现factoryMethod方法');
		},
		// 调用对象工厂方法创建对象
		// 调用对象的getFiles()方法，获取图片文件
		handleFiles: function(files) {
			// 创建LocalImg对象
			var localImg = this.createUploadImg(files);		

			localImg.filter();				// 过滤文件
			localImg.preview();				// 预览图片的缩略图
			localImg.uploadTo();			// 上传最终显示缩略图的图片
 
		}
	};

	// 对象工厂inputImgFactory
	var inputImgFactory = Object.create(LocalImgFactory);
	inputImgFactory.createUploadImg = function(files) {					// 重写createLocalImg方法
		return new InputImg(files);
	};
	// 对象工厂dragImgFactory
	var dragImgFactory = Object.create(LocalImgFactory);
	dragImgFactory.createLocalImg = function() {
		return new DragImg();
	};
