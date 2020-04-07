<template>
    <div class="title">
        <slot name="home">
            <router-link to="/home">◀ 返回</router-link>
        </slot>
        <slot name="status"></slot>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.title {
    padding: 0 15px;
}
</style>