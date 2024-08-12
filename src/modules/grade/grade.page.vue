<template>
    <div class="student">
        <div class="student-header">
            <el-form :inline="true" :model="formData" size="large">
                <el-form-item label="学年：">
                    <el-select v-model="formData.year" clearable placeholder="请选择学年" @change="reloadData(true)">
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
                    <el-select
                        v-model="formData.semester"
                        clearable
                        placeholder="请选择学期"
                        @change="reloadData(true)"
                    >
                        <el-option label="第一学期" value="1" />
                        <el-option label="第二学期" value="2" />
                    </el-select>
                </el-form-item>
                <el-form-item label="考试：">
                    <el-select v-model="formData.exam" clearable placeholder="请选择考试" @change="reloadData(true)">
                        <el-option label="第一次" value="1" />
                        <el-option label="第二次" value="2" />
                        <el-option label="第三次" value="3" />
                        <el-option label="第四次" value="4" />
                    </el-select>
                </el-form-item>
                <el-form-item label="班级：">
                    <el-select v-model="formData.classId" clearable placeholder="请选择班级" @change="reloadData(true)">
                        <el-option label="11班" value="b8e1a3f4-72a4-24fe-7588-c28a1b5ee327" />
                        <el-option label="12班" value="ea457cb1-b376-e97f-58fd-90f76b448e85" />
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名：">
                    <el-input v-model="formData.name" clearable placeholder="请输入姓名" @input="reloadData(true)" />
                </el-form-item>
            </el-form>
            <div>
                <el-button size="large" type="success" @click="openImportDialog">导入</el-button>
                <el-button size="large" type="primary" @click="add">新增</el-button>
            </div>
        </div>
        <div class="student-table">
            <table-page :page-num="page" :table-data="tableData" :total="total" @current-change="handleCurrentChange">
                <el-table-column align="center" label="学生姓名" prop="student_name" />
                <el-table-column align="center" label="班级" prop="class_name" />
                <el-table-column align="center" label="年度" prop="year" />
                <el-table-column align="center" label="学期" prop="semester">
                    <template #default="{row}">
                        {{ row.semester === '1' ? '第一学期' : '第二学期' }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="考试" prop="exam">
                    <template #default="{row}">
                        {{ examObj[row.exam as string] }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="成绩" prop="score" />
                <el-table-column align="center" label="操作" width="200">
                    <template #default="{row}">
                        <el-button size="small" type="primary" @click="editStudent(row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="delGrade(row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </table-page>
        </div>
        <grade-dialog ref="dialog" :edit="edit" @reload="reloadData(true)"></grade-dialog>
        <grade-import-dialog ref="importDialog" @reload="reloadData(true)"></grade-import-dialog>
    </div>
</template>
<script lang="ts" setup>
import {reactive, readonly, ref} from 'vue';
import {StudentModel} from '@/modules/student/student.model';
import moment from 'moment';
import {GradeModel} from '@/modules/grade/grade.model';
import gradeDialog from './grade-dialog.vue';
import GradeImportDialog from '@/modules/grade/grade-import-dialog.vue';
import service from './grade.service';
import {ElMessage, ElMessageBox} from 'element-plus';
import TablePage from '@/modules/component/table-page.vue';

const formData = reactive({
    year: moment().format('YYYY'),
    semester: '',
    exam: '',
    name: '',
    classId: '',
});

const examObj = readonly<Record<string, string>>({
    '1': '第一次',
    '2': '第二次',
    '3': '第三次',
    '4': '第四次',
});

const dialog = ref();
const edit = ref(false);

const add = () => {
    dialog.value.open();
};

const handleCurrentChange = async (val: number) => {
    page.value = val;
    await reloadData();
};

const editStudent = (row: StudentModel) => {
    edit.value = true;
    dialog.value.open(row);
};

const importDialog = ref();
const openImportDialog = () => {
    importDialog.value.open();
};

const tableData = ref<GradeModel[]>([]);
const page = ref(1);
const total = ref(0);
const getGradeList = async () => {
    const res = await service.getGradeList(
        page.value,
        10,
        formData.classId,
        formData.name,
        formData.year,
        formData.semester ? parseInt(formData.semester) : '',
        formData.exam ? parseInt(formData.exam) : ''
    );
    if (res.status) {
        tableData.value = res.data.data;
        total.value = res.data.pagination.total_count;
    }
};

const reloadData = async (reset = false) => {
    if (reset) {
        page.value = 1;
    }
    await getGradeList();
};

const delGrade = async (id: string) => {
    ElMessageBox.confirm('确认删除该成绩信息吗?', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        const res = await service.deleteGrade(id);
        if (res.status) {
            ElMessage({
                type: 'success',
                message: '操作成功',
            });
            await reloadData(true);
        }
    });
};

getGradeList();
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

        :deep(.el-select) {
            width: 150px;
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
