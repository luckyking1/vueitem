import { markRaw } from 'vue'
import * as echarts from 'echarts'

export default{
    methods: {
        init() {
            // 准备dom
            this.mycharts = markRaw(echarts.init(this.$refs.charts));
            // console.log(echarts.init(this.$refs.charst));
            // 关联
            this.mycharts.setOption(this.option)

        }
    },
    mounted() {
        this.init()
        window.addEventListener('resize',()=>{
            this.mycharts.resize()
        })
    },
}