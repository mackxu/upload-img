
	/**
	 * 实例：
	 * var localImg = inputImgFactory.factoryMethod(event);
	 */
	// 创建抽象类工厂
	var LocalImgFactory = {
		createLocalImg: function() {
			throw new Error('LocalImgFactory是一个抽象类,子类需要实现factoryMethod方法');
		},
		// 调用对象工厂方法创建对象
		// 调用对象的getFiles()方法，获取图片文件
		factoryMethod: function(event) {
			return this.createLocalImg(event);
		}
	};

	// 对象工厂inputImgFactory
	var inputImgFactory = Object.create(LocalImgFactory);
	inputImgFactory.createLocalImg = function(event) {					// 重写createLocalImg方法
		return new InputImg(event);
	};
	// 对象工厂dragImgFactory
	var dragImgFactory = Object.create(LocalImgFactory);
	dragImgFactory.createLocalImg = function() {
		return new DragImg();
	};
