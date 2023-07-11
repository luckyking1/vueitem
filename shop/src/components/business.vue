<template>
    <div class="map">
        <div class="charts" ref="charst"></div>
    </div>
</template>
    
<script>
import { markRaw } from 'vue'
import * as echarts from 'echarts'
import axios from 'axios'

export default {
    data() {
        return {
            myEchart: null,
            acroutes: [],
            data: {},
            // 准备option
            option: {
                width: 350,
                height: 350,
                title: {
                    text: '| 商家分布',
                    textStyle: {
                        color: 'white',
                        fontSize: '24'
                    },
                    left: 10,
                    top: 10
                },
                tooltip: {},
                geo: {
                    tooltip: {
                        show: true
                    },
                    map: 'china',
                    // roam: true,
                    itemStyle: {
                        areaColor: '#2e72bf'
                    },
                    label: {
                        normal: {
                            show: false,
                        },
                    }
                },
                series: [],

            },
        }
    },
    methods: {
        getMapJSON(adcode = 100000, level) {
            let url = ''
            if (level == 'district' || adcode == 710000) {
                url = `https://geo.datav.aliyun.com/areas_v3/bound/${adcode}.json`
            } else {
                url = `https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`
            }
            axios({ url }).then(res => {
                const data = res.data;
                this.data = data
                console.log(data);
                echarts.registerMap('china', data)
                this.myEchart.setOption(this.option)
                this.myEchart.off()
                this.myEchart.on('click', e => {
                    console.log(e.name);
                    console.log(111);
                    const obj = data.features.find(item => item.properties.name == e.name)
                    console.log(obj);
                    this.acroutes = obj.properties.acroutes;
                    this.getMapJSON(obj.properties.adcode, obj.properties.level)
                });
            })
        },
        getData() {
            this.$http({
                url: '/map'
            }).then(res => {
                console.log(res, '222');
                res.forEach((item, indexs) => {
                    let color = ['red', 'green', 'blue']
                    item.children.forEach((items, index) => {
                        this.option.series.push({
                            type: 'effectScatter',
                            hoverAnimation: true,
                            coordinateSystem: 'geo',
                            // geoIndex: 0,
                            data: [items.value],
                            symbolSize: 10,
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            silent: 'true',
                            itemStyle: {
                                color: color[indexs],
                                shadowBlur: 10,
                                shadowColor: color[indexs]
                            },
                            zlevel: 0
                        })
                    })
                })
                this.myEchart.setOption(this.option)
            })

        }
    },
    mounted() {
        this.getMapJSON()
        this.getData()
        this.myEchart = markRaw(echarts.init(this.$refs.charst))
        this.myEchart.getZr().on('click', zr => {
            /*判断画布条件出错*/
            if (!zr.target) {
                console.log('点空白处');
                if (this.acroutes.length > 0) {
                    this.getMapJSON(this.acroutes[this.acroutes.length - 1])
                    this.acroutes.pop();
                }
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.charts {
    background-color: #0d1d38;
    width: 35%;
    border-radius: 5%;
    height: 58%;
    position: absolute;
    top: 1%;
    left: 32.5%;
}
</style>
    
    