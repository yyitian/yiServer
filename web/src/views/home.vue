<template>
    <div class="menu">
        <div class="module" v-for="(item, index) in deskList" :key="index">
            <div v-if="item.type==='group'">
                <ul class="list" @click="handleClick(item, index)">
                    <li v-for="(app, idx) in item.list" :key="idx">
                        <img :src="app.img" alt />
                    </li>
                </ul>
            </div>
            <div v-else>
                <img src alt />
            </div>
            <span>{{item.title}}</span>
        </div>

        <div class="shade" v-show="shade" @click.self="closeShade">
            <div class="magnify">
                <input
                    type="text"
                    v-if="shadeEdit"
                    v-model="magnifyData.title"
                    @blur="handleBlur"
                />
                <span
                    class="title"
                    v-else
                    @click="shadeEdit = true"
                >{{magnifyData.title}}</span>
                <ul class="list">
                    <li v-for="(item, index) in magnifyData.list" :key="index">
                        <router-link class="item" :to="item.route">
                            <img :src="item.img" alt />
                            <span>{{item.name}}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            deskList: [
                {
                    title: "游戏",
                    type: "group",
                    list: [
                        {
                            name: "贪吃蛇",
                            img: require("../assets/logo/snake.png"),
                            route: "/gluttonousSnake"
                        }
                    ]
                },
                {
                    title: "案例",
                    type: "group",
                    list: [
                        {
                            name: "放大镜",
                            img: require("../assets/logo/magnifying.png"),
                            route: "/magnifying"
                        }
                    ]
                }
            ],
            shade: false,
            shadeEdit: false,
            index: 0,
            magnifyData: {
                title: "",
                list: []
            }
        };
    },
    methods: {
        handleClick(item, index) {
            this.magnifyData = item;
            this.index = index;
            this.shade = true;
        },
        handleBlur() {
            const title = this.magnifyData.title;
            this.$set(this.deskList[this.index], "title", title);
            this.shadeEdit = false;
        },
        closeShade() {
            this.shade = false;
            this.shadeEdit = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.menu {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    position: relative;
}
.module {
    width: 25%;
    text-align: center;
    div {
        width: 100%;
        .list {
            width: 60px;
            height: 60px;
            margin: 0 auto;
            padding: 3px;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.5);
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
            li {
                width: 16px;
                height: 16px;
                padding: 2px;
            }
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    span {
        color: #fff;
        font-size: 12px;
    }
}
.shade {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.3);
    .magnify {
        position: absolute;
        width: 342px;
        left: 29px;
        top: 195px;
        input,
        .title {
            display: block;
            width: 336px;
            margin: 0 auto 20px;
            height: 45px;
            border-radius: 5px;
            line-height: 45px;
            color: #fff;
            text-align: center;
        }
        input {
            border: none;
            background: rgba(0, 0, 0, 0.5);
            outline: none;
        }
        .list {
            width: 342px;
            height: 342px;
            padding: 10px 0 5px 0;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.7);
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
            li {
                width: 114px;
                padding: 6px 0;
                .item {
                    display: block;
                    img {
                        display: block;
                        width: 72px;
                        height: 72px;
                        margin: 0 auto;
                        background: rgb(255, 255, 255);
                        border-radius: 10px;
                    }
                    span {
                        display: block;
                        line-height: 30px;
                        color: #fff;
                        text-align: center;
                    }
                }
            }
        }
    }
}
</style>