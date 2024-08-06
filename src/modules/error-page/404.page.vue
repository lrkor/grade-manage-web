<template>
    <div class="patch-match">
        <div class="patch-match__label">没找到页面</div>
    </div>
</template>

<style lang="scss" scoped>
.patch-match {
    flex: 1 0 0;
    width: 100%;
    height: 100%;
    background: url('../../assets/404.png') no-repeat center;
    overflow: hidden;

    &__label {
        font-size: 36px;
        width: 370px;
        height: 50px;
        margin: auto;
        white-space: nowrap;
        position: relative;
        top: 65%;
        text-align: center;
    }
}
</style>
