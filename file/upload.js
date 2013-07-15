// 在IE5-6中模拟XMLHttpRequest()构造函数
// 且IE7+中是以对象类型存在的
if (window.XMLHttpRequest === undefined) {
	window.XMLHttpRequest = function() {
		try{
			return new ActiveXObject('Msxml2.XMLHTTP.6.0');
		}catch(e1) {
			try {
				return new ActiveXObject('Msxml2.XMLHTTP.3.0');
			}catch(e2) {
				throw new Error('不支持XMLHttpRequest');
			}
		}
	};
}

var imgInputUpload = {
	init: function() {
		var input = document.getElementById('upload-img');
		var that = this;
		// 隐藏上传按钮
		var submit = document.getElementById('submit');
		submit.style.display = 'none';

		input.onchange = function(event) {
			that.changeHandle(event);
		};
	},
	// 获取合格的图片文件
	changeHandle: function(event) {
		var event = event || window.event;
		var target = event.target || event.srcElement;
		
		imgUpload.upload(target.files);
	}
};

// 本地获得待上传图片文件后
// 1. 预览这些图片
// 2. Ajax上传
var imgUpload = {
	upload: function(files) {
		
		this.files = this.filter(files);					// 获取合法的文件
		if (this.files.length === 0) { return false; }

		// 显示上传按钮
		var submit = document.getElementById('submit');
		submit.style.display = '';
		// 获取上传url
		var uploadto = submit.getAttribute('data-uploadto');

		this.progressDiv = document.getElementById('progress');

		this.pre_show();									// 预览上传的图片
		// this.ajax(uploadto);								// 异步上传到服务器

		this.list = document.getElementById('pre-show');	// 图片预览列表<ul id="pre-show">
		var that = this;
		submit.onclick = function(event) {
			that.ajax(uploadto);
		};
		this.list.onclick = function(event) {				// 添加点击事件处理程序用于预览时删除
			that.deleteHandle(event);
		};
	},
	pre_show: function() {
		var that = this;

		// 上传服务器前可以查看，删除
		this.files.forEach(function(file, index) {
			var reader = new FileReader();
			reader.onload = function() {
				that.list.innerHTML += '<li><img src="'+ this.result +'" alt="'+
					file.name+'" /><span>'+ file.name +'</span><span>删除<span></li>'
			};
			reader.readAsDataURL(file);
		});
	},
	ajax: function(url) {
		var that = this;
		
		var xhr = new XMLHttpRequest();
		xhr.open('POST', url);
		// 包装上传文件
		var data = new FormData();
		this.files.forEach(function(file, index) {
			data.append(index, file);
		});
		// 监视上传的全过程
		xhr.upload.onprogress = function(e) {
			if(e.lengthComputable) {
				// that.progressDiv.innerHTML = '上传进度：'+ Math.round(e.loaded / e.total * 100) + '%';
				// 显示进度条
				that.progressDiv.style.width = 100 * Math.round(e.loaded / e.total) + 'px';
			}
		};
		// 上传完后给出相应的提示
		xhr.upload.onload = function() {
			// that.progressDiv.innerHTML = '上传完成！';
		};
		// 开始上传
		xhr.send(data);

	},
	// 过滤上传的图片文件
	filter: function(files) {
		var result = [];
		for(var i=0, len=files.length; i<len; i++) {
			var file = files[i];
			if (/image.*/.test(file.type)) {
				result.push(file);
			}
		}
		return result;
	},
	// 在上传前删除指定的文件
	deleteHandle: function() {}
};