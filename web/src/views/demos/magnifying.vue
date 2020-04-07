<template>
    <div class="magnify">
        <Title>
            <span slot="title">放大镜</span>
            <span>demo</span>
        </Title>
        <div class="container">
            <div class="module">
                <span>--主体--</span>
                <div
                    class="box"
                    @mouseover="handleMouseOver"
                    @mousemove="handleMouseMove($event)"
                    @mouseout="handleMouseOut"
                    ref="target"
                >
                    <img src="../../assets/logo.png" ref="img" />
                    <div
                        class="mask"
                        v-show="maskShow"
                        ref="mask"
                        :style="maskStyle"
                    ></div>
                </div>
            </div>
            <div class="module">
                <span>--镜像--</span>
                <div class="gho box" :style="ghoStyle"></div>
            </div>
        </div>
    </div>
</template>

<script>
import Title from "@/components/title";
export default {
    components: { Title },
    data() {
        return {
            targetInfo: {
                width: 0,
                height: 0,
                left: 0,
                top: 0
            },
            maskShow: false,
            maskStyle: "",
            src: "",
            ghoStyle: ""
        };
    },
    methods: {
        // 获取目标数据信息
        getTargetInfo() {
            const {
                width,
                height,
                left,
                top
            } = this.$refs.target.getBoundingClientRect();
            this.targetInfo = { width, height, left, top };
        },
        // 获取图片地址
        getImgSrc() {
            const src = this.$refs.img.getAttribute("src");
            this.src = src;
        },

        // 鼠标移入
        handleMouseOver() {
            this.maskShow = true;
        },
        // 滑动
        handleMouseMove($event) {
            // 利用client和遮罩宽/高一半的距离计算出遮罩的目标坐标
            const {
                width: maskWidth,
                height: maskHeight
            } = this.$refs.mask.getBoundingClientRect();

            let x = $event.clientX - maskWidth / 2;
            let y = $event.clientY - maskHeight / 2;

            // 通过本体坐标 + 本体宽/高限定遮罩的坐标范围
            // ps: 坐标以元素的左上角为基准，所以要坐标范围减去遮罩的宽高值
            const {
                left: realityLeft,
                top: realityTop,
                width: realityWidth,
                height: realityHeight
            } = this.targetInfo;
            const maxX = realityLeft + realityWidth - maskWidth;
            const maxy = realityTop + realityHeight - maskHeight;

            // 修正遮罩的位置，避免超过限定范围
            if (x <= realityLeft) {
                x = realityLeft;
            }
            if (x >= maxX) {
                x = maxX;
            }
            if (y <= realityTop) {
                y = realityTop;
            }
            if (y >= maxy) {
                y = maxy;
            }

            // 根据鼠标的轨迹设置遮罩的位置，同时通过修改背景图定位(反向移动)达到放大镜的功能
            // 默认放大倍数为2
            this.maskStyle = `left: ${x}px;top: ${y}px`;
            let ghoStyle = `backgroundImage: url(${this.src});
            backgroundPositionX: ${-(x - realityLeft) * 2}px;
            backgroundPositionY:${-(y - realityTop) * 2}px`;
            this.ghoStyle = ghoStyle;
        },
        // 鼠标移出
        handleMouseOut() {
            this.maskShow = false;
        }
    },
    mounted() {
        this.getTargetInfo();
        this.getImgSrc();
    }
};
</script>

<style lang="scss" scoped>
.magnifying {
    width: 100%;
    height: 100%;
}
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .module {
        background: #fff;
        text-align: center;
        margin-top: 25px;
        span {
            color: darkturquoise;
            line-height: 25px;
        }
        .box {
            width: 200px;
            height: 200px;
            border: 1px solid seagreen;
            .img {
                width: 100%;
                height: 100%;
            }
            .mask {
                width: 100px;
                height: 100px;
                position: fixed;
                left: 0;
                top: 0;
                background: #7e8c8d;
                opacity: 0.5;
            }
        }

        .gho {
            background: no-repeat center / 400px 400px;
        }
    }
}
</style>