Function.prototype.myBind = function (target, ...preArgs) {
    let self = this
    function fBound (...args) {
        // 这里需要考虑一下构造函数的场景，构造函数下不能让构造函数的this还是使用target，不然实例化就实例化到target上了，这样是不对的
        // 所以要把this在构造函数场景下矫正，
        return self.apply(this instanceof fBound  ? this : target, preArgs.concat(args)) 
    }
    // 别忘了返回的函数应该保持原型和原函数保持一致
    fBound.prototype = this.prototype
    return fBound
}