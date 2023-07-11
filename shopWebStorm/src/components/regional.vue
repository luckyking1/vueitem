<template>
    <div class="charts" ref="charts">
    
    </div>
</template>
    
<script>
import resize from "@/mixins/echart"

export default {
    mixins: [resize],
    data() {
        return {
            myEchart: null,
            // 准备option
            option: {
                tooltip: {
                    trigger: 'item',
                    triggerOn: "click",
                    formatter: '{b}:{c}'
                },
                title: {
                    text: '| 地区销售排行',
                    textStyle: {
                        color: 'white',
                        fontSize: '24'
                    },
                    left: 10,
                    top: 10
                },
                tooltip: {},
                xAxis: {
                    type: 'category',
                    data: ['广东', '福建', '江苏', '重庆', '四川', '河北', '山东'],
                    axisTick: {
                        length: 0, // 坐标轴刻度的长度
                    },
                    textStyle: {
                        fontSize: '12'
                    }

                },
                yAxis: {
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: true, //不显示坐标轴线
                    },
                },
                series: [{
                    barWidth: '40%',
                    type: 'bar',
                    data: [83, 76, 57, 49, 53, 60, 40],
                    itemStyle: {
                        normal: {
                            barBorderRadius: [300, 300, 0, 0], //柱子的圆角
                            color: function(colors) {
                                var colorList = [{
                                        type: "linear",
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                                offset: 0,
                                                color: "#2F7EC3",
                                            },
                                            {
                                                offset: 1,
                                                color: "#25C4DA",
                                            },
                                        ],
                                    },
                                    {
                                        type: "linear",
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                                offset: 0,
                                                color: "#2F7EC3",
                                            },
                                            {
                                                offset: 1,
                                                color: "#25C4DA",
                                            },
                                        ],
                                    },
                                    {
                                        type: "linear",
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                                offset: 0,
                                                color: "#2F7EC3",
                                            },
                                            {
                                                offset: 1,
                                                color: "#25C4DA",
                                            },
                                        ],
                                    },
                                    {
                                        type: "linear",
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                                offset: 0,
                                                color: "#512DA8",
                                            },
                                            {
                                                offset: 1,
                                                color: "#7b4397",
                                            },
                                        ],
                                    },
                                    {
                                        type: "linear",
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                                offset: 0,
                                                color: "#512DA8",
                                            },
                                            {
                                                offset: 1,
                                                color: "#7b4397",
                                            },
                                        ],
                                    },
                                    {
                                        type: "linear",
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                                offset: 0,
                                                color: "#512DA8",
                                            },
                                            {
                                                offset: 1,
                                                color: "#7b4397",
                                            },
                                        ],
                                    },
                                    {
                                        type: "linear",
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                                offset: 0,
                                                color: "#512DA8",
                                            },
                                            {
                                                offset: 1,
                                                color: "#7b4397",
                                            },
                                        ],
                                    }
                                ];
                                return colorList[colors.dataIndex];
                            }
                        },

                    }
                }]
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
                    chartName: 'rank',
                    socketType: 'rankData',
                    value: ''
                }
                ws.send(JSON.stringify(params));
            }
            ws.onmessage = msg => {
                const data = JSON.parse(msg.data);
                const res = JSON.parse(data.data);
                console.log(res, '555');
                let dataName = [];
                let nameData = [];
                res.forEach((item, index) => {
                    if (index > 6) return false;
                    dataName.push(item.value);
                    nameData.push(item.name);
                })
                this.option.series[0].data = dataName;
                this.option.xAxis.data = nameData;
                this.mycharts.setOption(this.option)
            }
        },
    },
    mounted() {
        this.getWsData();

    }
}
</script>
<style lang="scss" scoped>
.charts {
    width: 35%;
    height: 33%;
    background-color: #0d1d38;
    border-radius: 5%;
    position: absolute;
    bottom: 8%;
    left: 32.5%;
}
</style>
    
    