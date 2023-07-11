<template>
    <div class="charts" ref="charts"></div>
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
                title: {
                    text: '| 商家销售统计',
                    textStyle: {
                        color: 'white',
                        fontSize: '24'
                    },
                    left: 10,
                    top: 10
                },
                tooltip: {},
                xAxis: {
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: true, //不显示坐标轴线
                    },
                    textStyle: {
                        fontSize: '12'
                    }
                },
                yAxis: {
                    type: 'category',
                    data: ["商家一", "商家一", "商家一", "商家一", "商家一"],
                    axisTick: {
                        length: 0,    // 坐标轴刻度的长度

                    },
                    textStyle: {
                        fontSize: '12'
                    }
                },
                series: [
                    {
                        type: 'bar',
                        data: [23, 49, 57, 76, 83],
                        label: {
                            position: 'right',
                            show: true, // 是否可见
                        },
                        itemStyle: {
                            barBorderRadius: [0, 30, 30, 0],//柱子的圆角
                            color: {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 1,
                                y2: 0,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: "#512DA8",
                                    },
                                    {
                                        offset: 1,
                                        color: "#7b4397",
                                    },
                                ],
                            },
                        }
                    }
                ]
            },
        }
    },
    methods: {
        getData() {
            this.$http({
                url: '/seller'
            }).then(res => {
                console.log(res, '444');
                let dataName = [];
                let nameData = [];
                res.forEach((item, index) => {
                    if (index % 3) return false;
                    dataName.push(item.value);
                    nameData.push(item.name);
                })
                this.option.series[0].data = dataName;
                this.option.yAxis.data = nameData;
                this.mycharts.setOption(this.option)
            })

        }
    },
    mounted() {
        this.getData();

    }
}
</script>

<style lang="scss" scoped>
.charts {
    background-color: #0d1d38;
    width: 30%;
    border-radius: 5%;
    height: 35%;
    position: absolute;
    bottom: 8%;
    left: 1%;
}
</style>
    
    