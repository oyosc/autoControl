/**
 * Created by chenlei on 2017/3/12.
 */
'use strict'
const Indicator = require('../lib/indicators');
const http = require('http');
const socketio = require('socket.io');
const fs = require('fs');
const path = require('path');
const staticPath = path.join(__dirname, '../../client/dist');

let indicator = new Indicator({
    //process
    rss: 'indicators: rss',
    heapTotal: 'indicators:heapTotal',
    heapUsed: 'indicators:heapUsed',

    //os
    freeMem: 'indicators:freeMem',
    totalMem: 'indicators:totalMem',
    cpus: 'indicators:cpus',

    //v8
    newSpace: 'indicators:newSpace',
    oldSpace: 'indicators:oldSpace',
    codeSpace: 'indicators:codeSpace',
    mapSpace: 'indicators:mapSpace',
    largeObjectSpace:'indicators:largeObjectSpace',
});

function bindIndicators(indicator){
    //parent process will send three type of data
    const collectHandler = {
        'process': function(value){
            indicator.rss = value.rss;
            indicator.heapTotal = value.heapTotal;
            indicator.heapUsed = value.heapUsed;
        },
        'os': function(value){
            indicator.totalMem = value.totalMem;
            indicator.freeMem = value.freeMem;
            indicator.cpus = value.cpus;
        },
        'v8': function(value){
            indicator.v8 = value.v8
        }
    }
    process.on('message', (msg)=>{
        if(Array.isArray(msg)){
            msg.forEach(function(data){
                let handler = collectHandler[data.type];
                if(typeof handler === 'function'){
                    collectHandler[data.type](data.value);
                }
            });
        }
    });
}

function bindSocket(io, indicator){
    Object.keys(indicator.watch).forEach(function(key){
        let eventName = indicator.watch[key];
        indicator.on(eventName, (msg) =>{
            console.log(msg);
            io.emit(eventName, msg);
        });
    });
}


//bind indicators
bindIndicators(indicator);

function getStaticFileStream(url, cb){
    let filePath = path.join(staticPath, url);
    fs.stat(filePath, (err, stats)=>{
        if(err) return cb(err);
        cb(null, fs.createReadStream(filePath));
    });
}

const server = http.createServer(function(req, res){
    let url = req.url;
    console.log(url);
    switch(url){
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            getStaticFileStream('/index.html', (err, stream) => {
                if (err) {
                    res.writeHead(404);
                    return res.end('Not Found!');
                }
                stream.pipe(res);
            });
            break;
        default:
            getStaticFileStream(url, (err, stream) => {
                if (err) {
                    res.writeHead(404);
                    return res.end('Not Found!');
                }
                stream.pipe(res);
            });
            break;
    }

}).listen('8081', function(){
        console.log('auto-control listen 8081');
});

const io = socketio(server);
//bind socket
bindSocket(io, indicator);
