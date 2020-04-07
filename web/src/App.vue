<template>
    <div id="app">
        <h4>welcome</h4>
        <div class="app">
            <div class="screen">
                <div class="topBar">
                    <div class="left">
                        <span class="time">{{time}}</span>
                        <span class="location"></span>
                    </div>
                    <div class="right">
                        <span class="signal"></span>
                        <span class="wifi"></span>
                        <span class="cell"></span>
                    </div>
                </div>
                <div class="view">
                    <div class="solid"></div>
                    <router-view />
                </div>
                <div class="bottomBar"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            time: "",
            timer: null
        };
    },
    methods: {
        getTime() {
            const now = new Date().toLocaleTimeString("zh", {
                hour12: false
            });
            const second = parseInt(now.slice(-2), 10);
            this.time = now.slice(0, -3);
            console.log(this.time);
            this.timer = window.setTimeout(() => {
                this.getTime();
            }, (60 - second) * 1000);
        }
    },
    mounted() {
        this.getTime();
    },
    deforeDestroy() {
        window.clearTimeout(this.timer);
        this.timer = null;
    }
};
</script>
<style lang="scss" scoped>
h4 {
    text-align: center;
}
.app {
    width: 460px;
    height: 924px;
    margin: 0 auto;
    border-radius: 70px;
    background: url("./assets/bg.jpg") no-repeat center / cover;
    .screen {
        width: 100%;
        height: 100%;
        box-sizing: border-box;

        background: transparent url("./assets/phone.png") no-repeat center /
            cover;
        position: relative;
        .topBar {
            width: 100%;
            padding: 29px 48px 0 48px;
            box-sizing: border-box;
            // height: 32px;
            line-height: 32px;
            display: flex;
            justify-content: space-between;
            div {
                display: flex;
                justify-content: space-between;
                width: 65px;
                span {
                    display: block;
                }
                .time {
                    font-weight: 400;
                    font-size: 14px;
                    padding-left: 5px;
                }
                .location {
                    width: 15px;
                    height: 28px;
                    background: url(./assets/location.png) no-repeat center /
                        contain;
                }
                .signal {
                    width: 20px;
                    height: 32px;
                    background: url(./assets/signal.png) no-repeat center /
                        contain;
                }

                .wifi {
                    width: 20px;
                    height: 32px;
                    background: url(./assets/wifi.png) no-repeat center /
                        contain;
                }
                .cell {
                    width: 20px;
                    height: 32px;
                    background: url(./assets/cell.png) no-repeat center /
                        contain;
                }
            }
        }
        .view {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 29px 30px;
            .solid {
                height: 32px;
            }
        }
        .bottomBar {
            position: absolute;
            left: 80px;
            bottom: 40px;
            width: 300px;
            height: 8px;
            background: #fff;
            border-radius: 10px;
        }
    }
}
</style>
