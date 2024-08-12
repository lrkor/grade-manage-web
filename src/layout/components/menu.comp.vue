<template>
    <div :class="isCollapse ? 'width-64' : 'width-200'" class="menu-comp">
        <el-menu
            :collapse="isCollapse"
            :collapse-transition="false"
            :default-active="menuIndex"
            :default-openeds="['baseData']"
            background-color="#545c64"
            text-color="#fff"
        >
            <el-sub-menu v-for="(item, index) in menuList" :index="item.id">
                <template #title>
                    <el-icon color="transparent" size="18">
                        <component :is="activeMenuIndex !== index ? item.icon : item.activeIcon"></component>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </template>
                <el-menu-item v-for="child in item.children" :index="child.id" @click="skip(child)"
                    >{{ child.name }}
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue';
import MenuModel from '@/common/models/menu.model';
import {useRouter} from 'vue-router';
import {menuIndex, menuList} from '@/common/menu';

const isCollapse = ref(false);

const router = useRouter();
const skip = (child: MenuModel) => {
    router.push(child.path!);
};
watch(
    () => router.currentRoute.value,
    newValue => {
        const currentPath = newValue.path;
        menuList.forEach((item, index) => {
            if (currentPath === item.path) {
                menuIndex.value = item.id;
            }
            if (item.children) {
                item.children.forEach((child, index) => {
                    if (currentPath === child.path) {
                        menuIndex.value = child.id;
                    }
                });
            }
        });
    },
    {
        immediate: true,
    }
);
</script>

<style lang="scss" scoped>
.width-64 {
    width: 64px;
}

.width-200 {
    width: 200px !important;
}

.menu-comp {
    height: 100%;
    background-color: #434a50;
    transition: width var(--el-transition-duration);

    .el-menu {
        border-right: none;
        position: relative;
    }

    .menu-collapse {
        right: -15px;
        top: 200px;
        width: 15px;
        height: 30px;
        background-color: #434a50;
        position: absolute;
        display: flex;
        align-items: center;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
}

.el-menu-vertical {
    height: 100%;
}

.el-menu-item.is-active {
    background-color: #434a50;
}
</style>
