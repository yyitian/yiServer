<template>
    <div class="gluttonousSnake">
        <Title>
            <slot></slot>
                <span v-slot:"status">得分：{{score}}</span>
        </Title>
        <div class="container">
            <div class="food" :style="foodCoordinate"></div>
            <div class="snake">
                <div
                    v-for="(item, index) in snakeNode"
                    :key="index"
                    :style="getStyle(item.x, item.y, item.rotate)"
                ></div>
            </div>
        </div>
        <div class="bottom">
            <span>{{ over ? '按回车键重新开始游戏' : '按空格键开始/暂停游戏' }}</span>
        </div>
    </div>
</template>
<script>
import Title from "@/components/title";
export default {
    components: { Title },
    data() {
        return {
            score: 0,
            key: 37,
            keyList: [37, 38, 39, 40],
            foodCoordinate: {
                left: 0,
                top: 0
            },
            snakeNode: [
                { x: 112, y: 304, rotate: 0 },
                { x: 128, y: 304, rotate: 0 },
                { x: 144, y: 304, rotate: 0 },
                { x: 160, y: 304, rotate: 0 },
                { x: 176, y: 304, rotate: 0 }
            ],
            timer: null,
            over: false
        };
    },
    computed: {
        getStyle() {
            return (x, y, rotate = 0) => {
                return {
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: `rotate(${rotate}deg)`
                };
            };
        }
    },
    methods: {
        // 随机数
        randomNum(min, max) {
            return parseInt(Math.random() * (max - min + 1) + min, 10) * 16;
        },
        // 刷新食物坐标
        refreshFood() {
            const x = this.randomNum(0, 18);
            const y = this.randomNum(0, 37);
            this.foodCoordinate = {
                left: `${x}px`,
                top: `${y}px`
            };
        },
        // 运动执行
        excute(direction) {
            let snakeNode = this.snakeNode;
            let defaultKey = 37;
            let rotate = 0;
            let { x: refX, y: refY } = snakeNode[0];
            switch (direction) {
                case 38: // 上
                    refY = refY - 16;
                    defaultKey = 40;
                    rotate = 90;
                    break;
                case 40: // 下
                    defaultKey = 38;
                    refY = refY + 16;
                    rotate = -90;
                    break;
                case 37: // 左
                    defaultKey = 39;
                    refX = refX - 16;
                    rotate = 0;
                    break;
                case 39: // 右
                    defaultKey = 37;
                    refX = refX + 16;
                    rotate = 180;
                    break;
            }
            // 不许回头
            if (refX === snakeNode[1]["x"] && refY === snakeNode[1]["y"]) {
                console.log("不许回头");
                this.key = defaultKey;
                return false;
            }

            // 自己撞自己
            const die = this.snakeNode.filter(item => {
                return item.x === refX && item.y === refY;
            });
            if (die.length > 0) {
                console.log("自己撞自己");
                this.gameover();
                return false;
            }

            // 撞墙
            if (refX < 0 || refX > 296 || refY < 0 || refY > 592) {
                console.log("撞墙");
                this.gameover();
                return false;
            }

            // 吃到食物
            if (
                `${refX}px` === this.foodCoordinate.left &&
                `${refY}px` === this.foodCoordinate.top
            ) {
                console.log("eating");
                this.score++;
                const last = snakeNode[snakeNode.length - 1];
                snakeNode.push(last);
                this.refreshFood();
            }
            // 运动路线：从第二节起直接取前一节上一步的值即可
            this.snakeNode = snakeNode.map((item, index) => {
                return {
                    x: index === 0 ? refX : snakeNode[index - 1]["x"],
                    y: index === 0 ? refY : snakeNode[index - 1]["y"],
                    rotate:
                        index === 0 ? rotate : snakeNode[index - 1]["rotate"]
                };
            });
        },
        // 自动
        runing() {
            let key = this.key;
            if (!this.over) {
                this.excute(key);
                this.timer = window.setTimeout(() => {
                    this.runing();
                }, 100);
            }
        },
        // 开始/暂停
        toggle() {
            if (this.over || this.timer !== null) {
                window.clearTimeout(this.timer);
                this.timer = null;
            } else {
                this.runing();
                console.log("runing");
            }
        },
        // 游戏结束
        gameover() {
            this.over = true;
            console.log("game over");
        },
        // 初始化
        init() {
            this.score = 0;
            this.over = false;
            this.refreshFood();
            this.snakeNode = [
                { x: 112, y: 304 },
                { x: 128, y: 304 },
                { x: 144, y: 304 },
                { x: 160, y: 304 },
                { x: 176, y: 304 }
            ];
        }
    },
    mounted() {
        this.init();
        document.onkeydown = () => {
            let key = window.event.keyCode;
            // 方向键
            if (this.keyList.includes(key)) {
                this.key = key;
                return;
            }
            // 空格
            if (key === 32) {
                this.toggle();
                return;
            }
            // 回车重开(死亡后)
            if (key === 13 && this.over) {
                this.init();
                return;
            }
        };
    }
};
</script>
<style lang="scss" scoped>
.gluttonousSnake {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.container {
    width: 304px;
    height: 608px;
    border: tan solid 1px;
    position: relative;
    // box-sizing: border-box;
    .food {
        position: absolute;
        width: 16px;
        height: 16px;
        background: brown;
    }
    .snake {
        div {
            position: absolute;
            width: 16px;
            height: 16px;
            background: url("../../assets/snake/body.png") no-repeat center /
                16px;
            &:first-child {
                background: url("../../assets/snake/head.png") no-repeat center /
                    16px;
                // background: crimson;
            }
            &:last-child {
                background: url("../../assets/snake/tail.png") no-repeat center /
                    16px;
                // background: crimson;
            }
        }
    }
}
</style>