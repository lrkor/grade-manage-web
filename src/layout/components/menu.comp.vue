<template>
    <div :class="isCollapse ? 'width-64' : 'width-200'" class="menu-comp">
        <el-menu
            :collapse="isCollapse"
            :collapse-transition="false"
            :default-openeds="['baseData']"
            background-color="#545c64"
            default-active="baseData1"
            text-color="#fff"
        >
            <el-sub-menu v-for="(item, index) in menuList" :index="item.id">
                <template #title>
                    <el-icon color="transparent" size="18">
                        <component :is="activeMenuIndex !== index ? item.icon : item.activeIcon"></component>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </template>
                <el-menu-item v-for="child in item.children" :index="child.id" @click="skip(child.path!)"
                    >{{ child.name }}
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {Grid} from '@element-plus/icons-vue';
import MenuModel from '@/common/models/menu.model';
import {useRouter} from 'vue-router';

const isCollapse = ref(false);
const activeMenuIndex = ref(0);
const menuList: MenuModel[] = [
    {
        id: 'baseData',
        name: '学生成绩',
        icon: Grid,
        activeIcon: Grid,
        path: '',
        children: [
            {
                id: 'baseData1',
                name: '学生列表',
                path: '/student',
            },
            {
                id: 'grade',
                name: '成绩列表',
                path: '/grade',
            },
        ],
    },
];
const router = useRouter();
const skip = (path: string) => {
    router.push(path);
};
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
