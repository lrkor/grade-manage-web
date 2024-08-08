<template>
    <div class="student">
        <div class="student-header">
            <el-form :inline="true" :model="formData" size="large">
                <el-form-item label="班级：">
                    <el-select v-model="formData.class" clearable placeholder="请选择班级" @change="reloadData(true)">
                        <el-option label="11班" value="b8e1a3f4-72a4-24fe-7588-c28a1b5ee327" />
                        <el-option label="12班" value="ea457cb1-b376-e97f-58fd-90f76b448e85" />
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名：">
                    <el-input v-model="formData.name" clearable placeholder="请输入姓名" @input="reloadData(true)" />
                </el-form-item>
            </el-form>
            <div>
                <el-button size="large" type="primary" @click="add">新增</el-button>
            </div>
        </div>
        <div class="student-table">
            <tablePage :table-data="tableData" :total="totalCount" @current-change="handleCurrentChange">
                <el-table-column align="center" label="学生姓名" prop="name" />
                <el-table-column align="center" label="班级" prop="class_name" />
                <el-table-column align="center" label="操作" width="210">
                    <template #default="{row}">
                        <el-button size="small" type="info" @click="detail(row.id)">详情</el-button>
                        <el-button size="small" type="primary" @click="editStudent(row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="delStudent(row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </tablePage>
        </div>
        <student-dialog ref="dialog" :edit="edit" @reload="reloadData"></student-dialog>
    </div>
</template>
<script lang="ts" setup>
import {reactive, ref} from 'vue';
import tablePage from '../component/table-page.vue';
import studentDialog from './student-dialog.vue';
import {StudentModel} from '@/modules/student/student.model';
import {useRouter} from 'vue-router';
import service from './student.service';
import {ElMessage, ElMessageBox} from 'element-plus';

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
    currentPage.value = val;
    reloadData();
};

const editStudent = (row: StudentModel) => {
    edit.value = true;
    dialog.value.open(row);
};

const delStudent = async (id: string) => {
    ElMessageBox.confirm('确认删除该学生信息吗?', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        const res = await service.deleteStudent(id);
        if (res.status) {
            ElMessage({
                type: 'success',
                message: '操作成功',
            });
            await reloadData(true);
        }
    });
};

const detail = (id: string) => {
    router.push({
        path: '/student/detail',
        query: {
            id,
        },
    });
};

const currentPage = ref(1);
const totalCount = ref(0);
const tableData = ref<StudentModel[]>([]);
const getTableData = async () => {
    const res = await service.getStudentList(currentPage.value, 10, formData.class, formData.name);
    if (res.status) {
        tableData.value = res.data.data;
        totalCount.value = res.data.pagination.total_count;
    }
};

const reloadData = async (reset = false) => {
    if (reset) {
        currentPage.value = 1;
    }
    await getTableData();
};

getTableData();
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
