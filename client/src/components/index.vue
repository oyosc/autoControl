<template>
    <div id="auto">

        <h1> Wellcome to auto-control !</h1>
        <h2>Indicators Panels</h2>
        <auto
            :rss="rss"
            :heapFree="heapFree"
            :heapUsed="heapUsed"
            :freeMem="freeMem"
            :totalMem="totalMem"
            :newSpace="newSpace"
            :oldSpace="oldSpace"
            :codeSpace="codeSpace"
            :mapSpace="mapSpace"
        ></auto>

    </div>
</template>

<script>
    import socketio from 'socket.io-client';
    import auto from './auto.vue';

    let io = socketio('http://localhost:8081');

    export default {
        name: 'index',
        data: () => {
            return {
                // Process Indicators
                rss: null,
                heapTotal: null,
                heapUsed: null,

                // OS Indicators
                totalMem: null,
                freeMem: null,
                cpus: null,

                // V8 Indicators
                newSpace: null,
                oldSpace: null,
                codeSpace: null,
                mapSpace: null,
                largeObjectSpace: null,

                // Chart Data Collection
                processDoughnutData: null,
                processLineData: null,
                osMemoryPieData: null,
                osMemoryLineData: null,
                osCPUSUsedLineData: null,
                v8HeapSpacePieData: null,
                v8HeapSpaceBarData: null,
            }
        },
        mounted () {
            io.on('indicators:rss', msg => {
                this.rss = msg;

            });
            io.on('indicators:heapTotal', msg => {
                this.heapTotal = msg;
            });
            io.on('indicators:heapUsed', msg => {
                this.heapUsed = msg;
            });
            io.on('indicators:freeMem', msg => {
                this.freeMem = msg;
            });
            io.on('indicators:totalMem', msg => {
                this.totalMem = msg;
            });
            io.on('indicators:cpus', msg => {
                this.cpus = msg;
            });
            io.on('indicators:newSpace', msg => {
                this.newSpace = msg;
            });
            io.on('indicators:oldSpace', msg => {
                this.oldSpace = msg;

            });
            io.on('indicators:codeSpace', msg => {
                this.codeSpace = msg;

            });
            io.on('indicators:mapSpace', msg => {
                this.mapSpace = msg;

            });
            io.on('indicators:largeObjectSpace', msg => {
                this.largeObjectSpace = msg;

            });
        },
        components: {
            auto
        },
        computed: {
            heapFree: function () {
                return (this.heapTotal - this.heapUsed);
            },
            usedMem: function() {
                return (this.totalMem - this.freeMem);
            }
        }
    }
</script>

<style>

#memeye {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

#process, #os, #v8 {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 10px;
}

#process .chart {
    margin: 30px;
}

#os .chart {
    margin: 30px;
}

#v8 .chart {
    margin: 30px;
}

</style>
