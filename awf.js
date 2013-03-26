/* async-waitfor
 * Wait for something to happen and then do it.
 * (c) 2013 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */

/* UMD LOADER: https://github.com/umdjs/umd/blob/master/returnExports.js */
(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
  }
}(this, function() {
    return function(async) {
        var _wf = function() {
            var wf = function() {
                this.ran = false;
                this.q = [];
            };
            
            wf.prototype.builder = function() {
                var that = this;
                
                return function(cb) {
                    if(typeof cb == 'function') {
                        if(that.ran === true) {
                            cb();
                        } else {
                            that.q.push(cb);
                        }
                    } else {
                        if(that.ran === false) {
                            that.q.forEach(function(v, i, a) {
                                v();
                            });
                            
                            that.q = [];
                        }
                        
                        that.ran = true;
                    }
                };
            };
            
            return (new wf()).builder();
        };
        
        if(typeof async == 'object') {
            async.waitFor = _wf;
            
            return async;
        } else {
            return _wf();
        }
    };
}));