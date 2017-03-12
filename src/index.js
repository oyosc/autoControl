/**
 * Created by chenlei on 2017/3/12.
 */
/**
 * Created by chenlei on 2017/3/12.
 */
'use strict'
const path = require('path');
const child_process = require('child_process');
const Collector = require('./lib/Collector.js');
const modulePath = path.join(__dirname, './childProcess');

module.exports = function(){
    let childProcess = child_process.fork(modulePath);
    process.on('exit', ()=>{
        childProcess.kill();
    });
    let collector = new Collector(childProcess);
    collector.start();
}