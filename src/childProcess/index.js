/**
 * Created by chenlei on 2017/3/12.
 */
'use strict'
const Indicator = require('../lib/indicators');
const http = require('http');

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
            console.log(msg);
        }
    });
}

//bind indicators
bindIndicators(indicator);

http.createServer(function(req, res){
    res.end('that is ok');
}).listen('8080');