/**
 * 处理事件的底层对象
 */
Event = {
	getById: function() {},
	getElements: function() {},
	getEvent: function(event) {
		return event || window.event;
	},
	getTarget: function(event) {
		var event = this.getEvent(event);
		return event.target || event.srcElement;
	},
	cancelHandler: function(event) {
		var event = event || window.event;
		if(event.preventDefault) event.preventDefault();
		else if(event.returnValue) event.returnValue = false;
	}
};