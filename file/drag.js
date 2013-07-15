
var imgDragUpload = {
	init: function() {
		// 目标元素
		var target = document.getElementById('dropzone');
		var that = this;

		// target.ondragenter = function(event) { that.dragEnterHandle(event, target); };
		// target.ondragleave = function(event) { that.dragLeaveHandle(event, target); };
		// target.ondragOver = function(event) { that.dragOverHandle(event); };
		// target.ondrop = function(event) { that.dropHandle(event, target); };
		
		target.addEventListener('dragenter', function(event) {
			that.dragEnterHandle(event, target);
		}, false);
		target.addEventListener('dragleave', function(event) {
			that.dragLeaveHandle(event, target);
		}, false);
		target.addEventListener('dragover', function(event) {
			that.dragOverHandle(event);		
		}, false);
		target.addEventListener('drop', function(event) {
			that.dropHandle(event, target);
		}, false);
	},
	dragEnterHandle: function(event, target) {
		console.log('dragenter');
		var types = event.dataTransfer.types;
		if (types 
			&& ((types.contains && types.contains('Files')) 
				|| (types.indexOf && types.indexOf('Files')) !== -1)){
			this.setCss(target, {backgroundColor: '#aaa'});
		}
	},
	dragLeaveHandle: function(event, target) {
		this.setCss(target, {backgroundColor: ''});
	},
	dragOverHandle: function(event) {
		event = Event.getEvent(event);
		Event.cancelHandler(event);
	},
	// 添加ajax上传的回调函数
	dropHandle: function(event, target) {
		event = Event.getEvent(event);
		Event.cancelHandler(event);

		console.log('drop');
		this.setCss(target, {backgroundColor: ''});
		// 获取文件
		var files = event.dataTransfer.files;
		// ajax上传
		imgUpload.upload(files);
	},
	setCss: function(elem, settings) {
		for(var key in settings) {
			if (settings.hasOwnProperty(key)) {
				elem.style[key] = settings[key];
			}
		}
	}
};