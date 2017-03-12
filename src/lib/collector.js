/**
 * Created by chenlei on 2017/3/12.
 */
'use strict'
const v8 = require('v8');
const os = require('os');


function collector(childProcess){
    this.childProcess = childProcess;
    this.interval = null;
    this.frequency = 1000;
};

collector.prototype.stop = function(){
    clearInterval(this.interval);
}

collector.prototype.start = function(){
    let that = this;
    if(that.interval){
        console.error('collector has been started');
    }

    that.interval = setInterval(()=>{
        //collecting data
        let processStat = process.memoryUsage();
        let v8Start = {
            heap: v8.getHeapStatistics(),
            // heapSpace: v8.getHeapSpaceStatistics(),
        }
        let osStat = {
            freeMem: os.freemem(),
            totalMem: os.totalmem(),
            cpus: os.cpus(),
        }
        let data = [
            {
                type: 'process',
                value: processStat,
            },
            {
                type: 'v8',
                value: v8Start,
            },
            {
                type: 'os',
                value: osStat,
            }
        ]
        that.childProcess.send(data);

    }, that.frequency);
}

module.exports = collector;