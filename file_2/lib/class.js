/**
 * 用于创建接口的类,并带有检查功能
 */
var Interface = function(name, methods) {
    //检查参数个数
    if(arguments.length != 2) {
        //错误显示不能准确定位
        throw new Error('创建接口的对象需要2个参数:接口名,其方法名组成的数组');
    }
    //确保第二个参数是数组类型
    if(!(methods instanceof Array)) {
        throw new Error('创建接口的第二参数应为数组类型');
    }
    //为接口创建两个属性,并赋值
    this.name = name;
    this.methods = [];              //存储接口方法
    for(var i=0; methods[i]; i++) {
        if(typeof methods[i] !== 'string') {
            throw new Error('接口的方法名应为字符串');
        }
        this.methods.push(methods[i]);
    }
};
/**
 * 检查创建的实例是否存在接口中的所有方法
 * 使用方法：把此函数紧跟创建实例语句后面
 * @param {Object} object 实例
 * @param {multi} interfaces 接口列表
 */
Interface.ensureImplement = function(object, interfaces) {
    //检查参数个数
    if(arguments.length < 2) throw new Error('接口类的静态ensureImplement方法参数不能少于2个');
    //子类实现的接口
    var intface = null;
    //检查子类是否实现了接口所有方法
    for(var i=1; arguments[i]; i++) {
        intface = arguments[i];
        //判断传递的参数是否都是合法的接口实例
        if(intface.constructor !== Interface) throw new Error('用ensureImplement检查时,发现'+intface+'不是合法的接口');
        //获取接口的所有方法
        var methods = intface.methods;
        //检查子类是否实现了接口中的所有方法
        for(var j=0; methods[j]; j++) {
            var method = methods[j];
            if(!object[method] || typeof object[method]!='function') {
                throw new Error('没有实现'+intface.name+'接口的方法:'+method);
            }
        }
    }
};
/**
 * 实现原型对象继承
 */
var extend = function(subClass, superClass) {
    var F = function() {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;
    
    subClass.superclass = superClass.prototype;
    if(superClass.prototype.constructor === Object.prototype.constructor) {
        superClass.prototype.constructor = superClass;
    }
};

//原型式继承使用的辅助函数
var clone = function(object) {
    //检查object是不是字面量对象
    if(Object.prototype.toString.call(object) !== '[object Object]') {
        throw new Error('在clone函数中传递的不是字面量对象');
    }
    var F = function() {};
    F.prototype = object;
    return new F();
};