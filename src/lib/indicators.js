/**
 * Created by chenlei on 2017/3/12.
 */
'use strict'
const events = require('events');

//conctructor
class Indicators extends events{

    constructor(indicators){
        super(indicators);
        this.watch = {};
        Object.assign(this.watch, indicators);

        //set watcher
        this.setWatcher.call(this, indicators);
    }
    setWatcher(indicators){
        let propDefine = {};
        let that = this;

        Object.keys(indicators).forEach((key)=>{
            that.watch[key] = indicators[key];
            propDefine[key] = {
                set: function(value){
                    this.emit(indicators[key], value);
                    this['_'+ key] = value;
                },
                get: function(){
                    return this['_'+ key];
                },
                enumerable: true,
            }
        });
        Object.defineProperties(that, propDefine);
    }
}

module.exports = Indicators;
