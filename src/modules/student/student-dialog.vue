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
import {StudentModel} from './student.model';
import service from './student.service';

const props = defineProps({
    edit: {
        type: Boolean,
        default: false,
    },
});
const emit = defineEmits(['reload']);

const visible = ref(false);
const id = ref('');
const open = (row?: StudentModel) => {
    if (row) {
        id.value = row.id;
        ruleForm.name = row.name;
        ruleForm.class_id = row.class_id;
    }
    visible.value = true;
};

const formRef = ref();
const ruleForm = reactive({
    name: '',
    class_id: '',
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
});

const close = () => {
    visible.value = false;
    resetForm();
};

const addStudent = async () => {
    const res = await service.addStudent(ruleForm.name, ruleForm.class_id);
    if (res.status) {
        emit('reload');
        close();
    }
};

const updateStudent = async () => {
    const res = await service.updateStudent(id.value, ruleForm.name, ruleForm.class_id);
    if (res.status) {
        emit('reload');
        close();
    }
};

const submitForm = async () => {
    await formRef.value.validate(async (valid: boolean) => {
        if (valid) {
            if (!props.edit) {
                await addStudent();
            } else {
                await updateStudent();
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

.student-dialog {
    &__footer {
        text-align: right;
    }
}
</style>
