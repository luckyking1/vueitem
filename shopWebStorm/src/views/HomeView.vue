<template>
    <div class="home">
        <header>
            <div class="title">电商平台实时监测系统</div>
            <div class="pic"></div>
            <div class="time">
                <p>2019-01-01 00:00:00</p>
            </div>
        </header>
        <div class="main">
            <are></are>
            <business></business>
            <commodity></commodity>
            <merchant></merchant>
            <regional></regional>
            <inventory></inventory>
        </div>
    </div>
</template>

<script>
import are from '@/components/area.vue'
import business from '@/components/business.vue'
import commodity from '@/components/commodity.vue'
import inventory from '@/components/inventory.vue'
import merchant from '@/components/merchant.vue'
import regional from '@/components/regional.vue'


export default {
    components: {
        are,
        business,
        commodity,
        inventory,
        merchant,
        regional,
    }
}
</script>

<style lang="scss" scoped>
.home {
    background-color: #161522;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    header {
        width:98%;
        height: 10%;
        background: url(../../public/img/header_border_dark.png) no-repeat center center/100%;
        text-align: center;
        position: relative;
        .title{
            display:inline-block;
            font-size: 1.25rem;
            color: #fff;
            height: 10vh;
            line-height: 10vh;
        }
        .pic{
            width:8%;
            height:35%;
            background: url(../../public/img/qiehuan_dark.png) no-repeat center center;
            position: absolute;
            top: 25%;
            right: 18%;
        }
        .time{
            width: 20%;
            height: 35%;
            color: #fff;
            position: absolute;
            top: 30%;
            right: 1%;
            font-size: 1rem
        };
    }

    .main {
        width: 100%;
        height: 90vh;
        position: relative;
    }
}
</style>
