<template>
    <div class="student">
        <div class="student-header">
            <el-form :inline="true" :model="formData" size="large">
                <el-form-item label="学年：">
                    <el-select v-model="formData.year" clearable placeholder="请选择学年">
                        <el-option label="2023" value="2023" />
                        <el-option label="2024" value="2024" />
                        <el-option label="2025" value="2025" />
                        <el-option label="2026" value="2026" />
                        <el-option label="2027" value="2027" />
                        <el-option label="2028" value="2028" />
                        <el-option label="2029" value="2029" />
                        <el-option label="2030" value="2030" />
                    </el-select>
                </el-form-item>
                <el-form-item label="学期：">
                    <el-select v-model="formData.semester" clearable placeholder="请选择学期">
                        <el-option label="上学期" value="1" />
                        <el-option label="下学期" value="2" />
                    </el-select>
                </el-form-item>
                <el-form-item label="考试：">
                    <el-select v-model="formData.exam" clearable placeholder="请选择考试">
                        <el-option label="第一次" value="1" />
                        <el-option label="第二次" value="2" />
                        <el-option label="第三次" value="3" />
                        <el-option label="第四次" value="4" />
                    </el-select>
                </el-form-item>
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
                <el-table-column align="center" label="年度" prop="year" />
                <el-table-column align="center" label="学期" prop="semester" />
                <el-table-column align="center" label="考试" prop="exam" />
                <el-table-column align="center" label="成绩" prop="grade" />
                <el-table-column align="center" label="操作" width="200">
                    <template #default="{row}">
                        <el-button size="small" type="primary" @click="editStudent(row)">编辑</el-button>
                        <el-button size="small" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </tablePage>
        </div>
        <grade-dialog ref="dialog" :edit="edit"></grade-dialog>
    </div>
</template>
<script lang="ts" setup>
import {reactive, ref} from 'vue';
import tablePage from '../component/table-page.vue';
import {StudentModel} from '@/modules/student/student.model';
import {useRouter} from 'vue-router';
import moment from 'moment';
import {GradeModel} from '@/modules/grade/grade.model';
import gradeDialog from './grade-dialog.vue';

const formData = reactive({
    year: moment().format('YYYY'),
    semester: '',
    exam: '',
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

const tableData = ref<GradeModel[]>([
    {
        id: '2222',
        name: 'Tom',
        className: '11班',
        classValue: '11',
        year: '2023',
        semester: '上学期',
        exam: '第一次',
        grade: 88,
    },
    {
        id: '2222',
        name: 'Tom',
        className: '11班',
        classValue: '11',
        year: '2023',
        semester: '上学期',
        exam: '第一次',
        grade: 88,
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
