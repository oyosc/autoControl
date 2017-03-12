// const util = require('util');
// const EventEmitter = require('events');
//
// function MyStream(){
//     EventEmitter.call(this);
// }
//
// util.inherits(MyStream, EventEmitter);
//
// MyStream.prototype.write = function(data){
//     this.emit('data', data);
// }
//
// const stream = new MyStream();
//
// console.log(stream instanceof EventEmitter);
// console.log(MyStream.super_ === EventEmitter);
//
// stream.on('data', function(data){
//     console.log('接收的数据：' + data);
// });
//
// stream.write('运行良好');
"use strict"

// const EventEmitter = require('events');
//
// class MyStream extends EventEmitter {
//     constructor(){
//         super();
//     }
//     write(data){
//         this.emit('data', data);
//     }
// }
//
// const stream = new MyStream();
//
// stream.on('data', function(data){
//     console.log('接收的数据:'+ data);
// });
//
// stream.write('使用es6');

var obj = {a: 1};
var copy = Object.assign({}, obj);
console.log(copy);