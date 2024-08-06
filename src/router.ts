import {createRouter, createWebHistory, RouterOptions} from 'vue-router';
import LoginPage from '@/login.page.vue';
import layout from '@/layout/index.vue';
import Page403 from './modules/error-page/403.page.vue';
import Page404 from './modules/error-page/404.page.vue';
import store from './common/store';

import {RouteModel} from '@/common/models/tabs.model';

const routes: RouteModel[] = [
    {
        path: '/',
        component: layout,
        redirect: '/student',
        meta: {
            icon: 'el-icon-s-home',
            title: '首页',
        },
        children: [
            {
                path: '/student',
                name: 'student',
                component: () => import('@/modules/student/student.page.vue'),
            },
            {
                path: '/student/detail',
                name: 'studentDetail',
                component: () => import('@/modules/student/student-detail.page.vue'),
            },
            {
                path: '/grade',
                name: 'grade',
                component: () => import('@/modules/grade/grade.page.vue'),
            },
            {
                path: '/test',
                name: 'Test',
                meta: {
                    icon: 'el-icon-data-analysis',
                    title: '测试',
                },
                component: () => import('@/modules/test/test.page.vue'),
            },
            {
                path: '/table',
                name: 'Table',
                meta: {
                    icon: 'el-icon-s-grid',
                    title: '表格',
                },
                component: () => import('@/modules/table/table.page.vue'),
            },
            {
                path: '/component',
                name: 'Component',
                meta: {
                    icon: 'el-icon-s-grid',
                    title: '组件',
                },
                component: () => import('@/modules/component/index.page.vue'),
            },
        ],
    },
    {
        path: '/login',
        component: LoginPage,
    },
    {path: '/403', component: Page403},
    {path: '/404', component: Page404},
    {path: '/:patchMatch(.*)*', component: Page404},
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
} as RouterOptions);

router.beforeEach((to: any, from: any, next: any) => {
    const tabsOption = store.state.tabsOption;
    // 判断当前路由中是否已经入栈
    const flag = tabsOption.findIndex((tab: {route: string}) => tab.route === to.path) > -1;

    if (!flag && !to.meta.hiddenTab) {
        store.commit('addTab', {route: to.path, title: to.meta.title, name: to.name, meta: to.meta});
    }
    store.commit('setTab', to.path);
    next();
});

export default router;
