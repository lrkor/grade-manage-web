import {ref} from 'vue';
import MenuModel from '@/common/models/menu.model';
import {Grid} from '@element-plus/icons-vue';

export const menuIndex = ref<string>('baseData1');
export const menuList: MenuModel[] = [
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
