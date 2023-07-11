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
                title: {
                    text: '| 库存和销量分析',
                    textStyle: {
                        color: 'white',
                        fontSize: '24'
                    },
                    left: 10,
                    top: 10
                },
                series: []
            },
        }
    },
    methods: {
        getData() {
            this.$http({
                url: '/stock'
            }).then(res => {
                console.log(res, '666');
                this.option.series = []
                res.forEach((item, index) => {
                    if (index > 4) return false
                    let center = [
                        ['25%', '44%'],
                        ['50%', '44%'],
                        ['75%', '44%'],
                        ['38%', '78%'],
                        ['62%', '78%'],
                    ];
                    let colors = ['#5c7bd9', '#9bdb7d', '#fac858', '#ee6666', '#73c0de']

                    this.option.series.push({
                        type: 'gauge',
                        radius: '35%',
                        center: center[index],
                        startAngle: 90,
                        endAngle: -270,
                        max: item.stock,
                        pointer: {
                            show: false
                        },
                        progress: {
                            show: true,
                        },
                        axisLine: {
                            lineStyle: {
                                width: 10
                            }
                        },
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false,
                            distance: 50
                        },
                        data: [{
                            value: item.sales,
                            name: item.name,
                            title: {
                                offsetCenter: ['0', '-18%'],
                                color: colors[index],
                            },
                            detail: {
                                valueAnimation: true,
                                offsetCenter: ['0', '20%'],
                            }
                        }],
                        title: {
                            fontSize: 10
                        },
                        detail: {
                            width: 50,
                            height: 14,
                            fontSize: 12,
                            color: 'inherit',
                            formatter: '{value}'
                        }
                    })
                })
                this.mycharts.setOption(this.option)
            })
        },
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
    height: 38%;
    position: absolute;
    bottom: 8%;
    right: 1%;
}
</style>
    
    