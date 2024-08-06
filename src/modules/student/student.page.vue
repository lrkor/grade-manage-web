<template>
    <div class="student">
        <div class="student-header">
            <el-form :inline="true" :model="formData" size="large">
                <el-form-item label="班级：">
                    <el-select v-model="formData.class" clearable placeholder="请选择班级">
                        <el-option label="11班" value="11" />
                        <el-option label="12班" value="12" />
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名：">
                    <el-input v-model="formData.name" clearable placeholder="请输入姓名" />
                </el-form-item>
            </el-form>
            <div>
                <el-button size="large" type="primary" @click="add">新增</el-button>
            </div>
        </div>
        <div class="student-table">
            <tablePage :table-data="tableData" :total="400" @current-change="handleCurrentChange">
                <el-table-column align="center" label="学生姓名" prop="name" />
                <el-table-column align="center" label="班级" prop="className" />
                <el-table-column align="center" label="近一次成绩" prop="lastGrade" />
                <el-table-column align="center" label="操作" width="210">
                    <template #default="{row}">
                        <el-button size="small" type="info" @click="detail(row.id)">详情</el-button>
                        <el-button size="small" type="primary" @click="editStudent(row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="editStudent(row)">删除</el-button>
                    </template>
                </el-table-column>
            </tablePage>
        </div>
        <student-dialog ref="dialog" :edit="edit"></student-dialog>
    </div>
</template>
<script lang="ts" setup>
import {reactive, ref} from 'vue';
import tablePage from '../component/table-page.vue';
import studentDialog from './student-dialog.vue';
import {StudentModel} from '@/modules/student/student.model';
import {useRouter} from 'vue-router';

const formData = reactive({
    name: '',
    class: '',
});

const router = useRouter();

const dialog = ref();
const edit = ref(false);

const add = () => {
    dialog.value.open();
};

const handleCurrentChange = (val: number) => {
    console.log(val);
};

const editStudent = (row: StudentModel) => {
    edit.value = true;
    dialog.value.open(row);
};

const detail = (id: string) => {
    router.push({
        path: '/student/detail',
        query: {
            id,
        },
    });
};

const tableData = ref<StudentModel[]>([
    {
        id: '2222',
        name: 'Tom',
        className: '11班',
        classValue: '11',
        lastGrade: 88,
    },
    {
        id: '2222',
        name: 'Tom',
        className: '11班',
        classValue: '11',
        lastGrade: 88,
    },
]);
</script>

<style lang="scss" scoped>
.student {
    height: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;

    &-header {
        height: 60px;
        background-color: #fefefe;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;

        :deep(.el-form-item) {
            margin-bottom: 0;
        }
    }

    &-table {
        margin-top: 20px;
        flex: 1;
        padding: 16px;
        background-color: #fefefe;
        border-radius: 8px;
    }
}
</style>
