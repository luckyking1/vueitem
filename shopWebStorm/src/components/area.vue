<template>
    <div class="charts" ref="charts">
    
    </div>
</template>
    
<!-- vue2 -->
<script>
import resize from "@/mixins/echart"

export default {
    mixins: [resize],
    data() {
        return {
            myEchart: null,
            // 准备option
            option: {
                textStyle: {
                    color: '#bbb'
                },
                grid: {
                    left: 50,
                    top: 100,
                },
                title: {
                    text: '| 地区销量趋势',
                    textStyle: {
                        color: 'white',
                        fontSize: '24'
                    },
                    left: 10,
                    top: 10
                },
                color: ['rgb(1,191,236)', 'rgb(77,119,255)', 'rgb(116,21,219)', 'rgb(135,0,157)', 'rgb(224,62,76)'],
                legend: {
                    data: ['上海', '北京', '深圳', '广州', '重庆'],
                    left: 20,
                    top: 50,
                    icon: "circle",
                    textStyle: {
                        color: '#bbb',
                        fontSize: '12'
                    },

                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    interval: 0,
                    data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
                }],
                yAxis: [{
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: true, //不显示坐标轴线
                    },

                }],
                series: []
            },
        }
    },
    methods: {
        getWsData() {
            const ws = new WebSocket('ws://127.0.0.1:9998')
            ws.onopen = () => {
                console.log('连接成功');
                const params = {
                    action: 'getData',
                    chartName: 'trend',
                    socketType: 'trendData',
                    value: ''
                }
                ws.send(JSON.stringify(params));
            }
            ws.onmessage = msg => {
                const data = JSON.parse(msg.data);
                const res = JSON.parse(data.data);
                console.log(res, '111');

                this.option.xAxis[0].data = res.common.month
                this.option.series = []
                let cityName = []
                res.map.data.forEach((item, index) => {
                    let colors = ['rgba(1,191,236,0.3)', 'rgba(77,119,255,0.3)', 'rba(116,21,219,0.3)', 'rgba(135,0,157,0.3)', 'rgba(224,62,76,0.3)']
                    let col = ['rgb(1,191,236)', 'rgb(77,119,255)', 'rgb(116,21,219)', 'rgb(135,0,157)', 'rgb(224,62,76)']
                    cityName.push(item.name)
                    this.option.series.push({
                        name: item.name,
                        type: 'line',
                        symbol: "none",
                        areaStyle: {
                            color: colors.index
                        },
                        itemStyle: {
                            normal: {
                                color: col.index, //改变折线点的颜色
                            }
                        },
                        stack: 'all',
                        smooth: true,
                        data: item.data
                    })
                })
                this.option.legend.data = cityName
                this.mycharts.setOption(this.option)
            }
        }
    },
    mounted() {
        this.getWsData();

    }
}
</script>


<style lang="scss" scoped>
.charts {
    background-color: #0d1d38;
    width: 30%;
    border-radius: 5%;
    height: 52%;
    position: absolute;
    top: 1%;
    left: 1%;
}
</style>
    
    


