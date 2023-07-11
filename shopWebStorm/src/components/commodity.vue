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
            // 准备option
            option: {
                title: [{
                    text: '| 热销商品占比',
                    textStyle: {
                        color: 'white',
                        fontSize: '24'
                    },
                    left: 10,
                    top: 10
                },
                {
                    text: '女装',
                    textStyle: {
                        color: 'white',
                        fontSize: '24'
                    },
                    right: 20,
                    bottom: 20
                }
                ],
                tooltip: {
                    trigger: 'item'

                },
                legend: {
                    icon: "circle",
                    left: 'center',
                    top: 50,
                    textStyle: {
                        color: 'white',
                        fontSize: '12'
                    },

                },

                series: [{
                    label: {
                        normal: {
                            show: false,
                        },
                    },
                    type: 'pie',
                    radius: '50%',
                    data: [],
                    itemStyle: {
                        normal: {
                            color: function (colors) {
                                var colorList = [
                                    '#0CA82B',
                                    '#2C6EFF',
                                    '#16F2D9',
                                    '#FF211E',
                                    '#FA6800',
                                    '#EFDD76'
                                ];
                                return colorList[colors.dataIndex];
                            }
                        },
                    },
                }],
            },
            myEchart: null,
        }
    },
    methods: {
        getWsData() {
            const ws = new WebSocket('ws://127.0.0.1:9998')
            ws.onopen = () => {
                console.log('连接成功');
                const params = {
                    action: 'getData',
                    chartName: 'hot',
                    socketType: 'hotData',
                    value: ''
                }
                ws.send(JSON.stringify(params));
            }
            ws.onmessage = msg => {
                const data = JSON.parse(msg.data);
                const res = JSON.parse(data.data);
                console.log(res, '333');

                let dataName = [];
                res[0].children.forEach(item => {
                    dataName.push({
                        name: item.name,
                        value: item.value,
                    })
                })
                this.option.series[0].data = dataName
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
    background-color: #0d1d38;
    width: 30%;
    border-radius: 5%;
    height: 50%;
    position: absolute;
    top: 1%;
    right: 1%;
}
</style>
    
    