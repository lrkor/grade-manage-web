<template>
    <div class="test">
        测试
        <el-input v-model="input" placeholder="Please input" />

        <div :class="['box', isCollapse ? 'width-200' : '']"></div>

        <div @click="isCollapse = !isCollapse">点击</div>
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';

const input = ref<string>('');
const isCollapse = ref(false);
</script>

<style lang="scss" scoped>
.test {
    .box {
        width: 100px;
        height: 100px;
        background-color: red;
        transition: width 1s;
    }

    .width-200 {
        width: 200px;
    }

    .box:hover {
        width: 200px;
    }
}
</style>
