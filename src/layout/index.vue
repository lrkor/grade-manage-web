<template>
    <div class="layout">
        <el-container>
            <el-main>
                <div class="header">
                    <nav-comp></nav-comp>
                </div>

                <div class="app-main">
                    <div class="app-main-left">
                        <menu-comp></menu-comp>
                    </div>
                    <div class="app-main-right">
                        <router-view v-slot="{Component}">
                            <transition mode="out-in" name="fade">
                                <component :is="Component" :key="$route.path" />
                            </transition>
                        </router-view>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import MenuComp from './components/menu.comp.vue';
import NavComp from './components/nav.comp.vue';
</script>

<style lang="scss" scoped>
.layout {
    width: 100%;
    height: 100%;
}

.el-container {
    width: 100%;
    height: 100%;
    display: flex;
}

.el-aside {
    width: 200px;
}

.el-main {
    flex: 1;
    display: flex;
    padding: 0;
    flex-direction: column;
}

.app-main {
    flex: 1;
    display: flex;

    > div {
        height: 100%;
    }

    &-right {
        flex: 1;
        overflow: hidden;
    }
}
</style>
