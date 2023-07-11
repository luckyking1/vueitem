<template>
    <div class="map">
        <div class="charts" ref="map">123</div>
    </div>
</template>
    
<script>
import * as echarts from 'echarts'
import axios from 'axios'

export default {
    data() {
        return {
            myEcharts: null,
            // 准备option
            option: {
                legend: {
                    data: [],
                    left:40, 
                    bottom: 60, 
                    width: "100px", 
                    textStyle: {
                        color: "#aaa", 
                    },

                    icon: "circle",
                },
                title: {
                    text: '| 商家分布',
                    textStyle: {
                        color: 'white',
                        fontSize: '24'
                    },
                    left: 10,
                    top: 10
                },
                geo: {
                    type: 'map',
                    map: 'china',
                },
                series: [{
                    name: '',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: [{
                        name: '111',
                        value: [116, 39]
                    }]
                }],
            },
        }
    },
    methods: {
        init() {
            this.myEcharts = echarts.init(this.$refs.map)
            axios('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json').then(res => {
                console.log(res.data,'mmm');
                echarts.registerMap('china',res.data)
                this.myEcharts.setOption(this.option)
            })
        },
        getWsData() {
            const ws = new WebSocket('ws://127.0.0.1:9998')
            ws.onopen = () => {
                console.log('连接成功');
                const params = {
                    action: 'getData',
                    chartName: 'map',
                    socketType: 'mapData',
                    value: ''
                }
                ws.send(JSON.stringify(params));
            }
            ws.onmessage = msg => {
                const data = JSON.parse(msg.data);
                const res = JSON.parse(data.data);
                console.log(res, '222');

                this.option.series = []
                const levelName = []
                res.forEach(item => {
                    levelName.push(item.name);
                    item.children.forEach(it => {
                        this.option.series.push({
                            name: item.name,
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            data: [{
                                name: it.name,
                                value: it.value
                            }]
                        })
                    })
                });
                this.option.legend.data = levelName
                console.log(this.option);
                this.myEcharts.setOption(this.option)
            }
        },
    },
    mounted() {
        this.init()
        this.getWsData()
    }
}
</script>

<style lang="scss" scoped>
.charts {
    background-color: #0d1d38;
    width: 35%;
    border-radius: 5%;
    height: 55%;
    position: absolute;
    top: 1%;
    left: 32.5%;
}
</style>
    
    