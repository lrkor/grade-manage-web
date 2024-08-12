<template>
    <div class="student-dialog">
        <el-dialog
            v-model="visible"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :title="edit ? '编辑' : '新增'"
            :visible="visible"
            width="500"
            @close="resetForm"
        >
            <div class="student-dialog__body">
                <el-form
                    ref="formRef"
                    :model="ruleForm"
                    :rules="rules"
                    label-position="right"
                    label-width="80px"
                    size="large"
                >
                    <el-form-item label="姓名：" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入姓名" style="width: 300px" />
                    </el-form-item>
                    <el-form-item label="班级：" prop="class_id">
                        <el-select v-model="ruleForm.class_id" placeholder="请选择班级" style="width: 300px">
                            <el-option label="11班" value="b8e1a3f4-72a4-24fe-7588-c28a1b5ee327" />
                            <el-option label="12班" value="ea457cb1-b376-e97f-58fd-90f76b448e85" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学年：" prop="year">
                        <el-select v-model="ruleForm.year" clearable placeholder="请选择学年">
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
                    <el-form-item label="学期：" prop="semester">
                        <el-select v-model="ruleForm.semester" clearable placeholder="请选择学期">
                            <el-option label="第一学期" value="1" />
                            <el-option label="第二学期" value="2" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="考试：" prop="exam">
                        <el-select v-model="ruleForm.exam" clearable placeholder="请选择考试">
                            <el-option label="第一次" value="1" />
                            <el-option label="第二次" value="2" />
                            <el-option label="第三次" value="3" />
                            <el-option label="第四次" value="4" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="成绩：" prop="score">
                        <el-input-number v-model="ruleForm.score" :max="150" :min="0" />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <div class="student-dialog__footer">
                    <el-button @click="close">关闭</el-button>
                    <el-button type="primary" @click="submitForm">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import {reactive, ref} from 'vue';
import {GradeModel} from './grade.model';
import service from './grade.service';

const props = defineProps({
    edit: {
        type: Boolean,
        default: false,
    },
});
const emit = defineEmits(['reload']);
const id = ref('');

const visible = ref(false);
const open = (row?: GradeModel) => {
    if (row) {
        ruleForm.name = row.student_name;
        ruleForm.class_id = row.class_id;
        ruleForm.score = row.score;
        ruleForm.year = row.year;
        ruleForm.exam = row.exam;
        ruleForm.semester = row.semester;
        id.value = row.id;
    }
    visible.value = true;
};
const formRef = ref();
const ruleForm = reactive({
    name: '',
    class_id: '',
    year: '',
    exam: '',
    semester: '',
    score: 0,
});

const rules = reactive({
    name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
    class_id: [
        {
            required: true,
            message: '请选择班级',
            trigger: 'change',
        },
    ],
    year: [
        {
            required: true,
            message: '请选择学年',
            trigger: 'change',
        },
    ],
    exam: [
        {
            required: true,
            message: '请选择学期',
            trigger: 'change',
        },
    ],
    semester: [
        {
            required: true,
            message: '请选择考试',
            trigger: 'change',
        },
    ],
    score: [{required: true, message: '请输入成绩', trigger: 'blur'}],
});

const close = () => {
    visible.value = false;
    resetForm();
};

const addGrade = async () => {
    const res = await service.addGrade(ruleForm);
    if (res.status) {
        emit('reload');
        close();
    }
};

const updateGrade = async () => {
    const res = await service.updateGrade(id.value, ruleForm);
    if (res.status) {
        emit('reload');
        close();
    }
};

const submitForm = async () => {
    await formRef.value.validate(async (valid: boolean) => {
        if (valid) {
            if (props.edit) {
                await updateGrade();
            } else {
                await addGrade();
            }
            resetForm();
        }
    });
};

const resetForm = () => {
    formRef.value.resetFields();
};

defineExpose({
    open,
});
</script>

<style lang="scss" scoped>
:deep(.el-dialog__header) {
    margin-right: 0;
    border-bottom: 1px solid #eee;
}

:deep(.el-select) {
    width: 300px;
}

:deep(.el-input-number) {
    width: 300px;
}

.student-dialog {
    .my-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 16px;
    }

    &__footer {
        text-align: right;
    }
}
</style>
