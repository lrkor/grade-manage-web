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
                            <el-option label="上学期" value="1" />
                            <el-option label="下学期" value="2" />
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
                    <el-form-item label="文件：" prop="file_id">
                        <el-upload
                            v-model:file-list="fileList"
                            :before-remove="beforeRemove"
                            :http-request="uploadFile"
                            :limit="3"
                            :on-exceed="handleExceed"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            class="upload-demo"
                        >
                            <el-button type="primary">文件上传</el-button>
                            <template #tip>
                                <div class="el-upload__tip">Excel 文件上传</div>
                            </template>
                        </el-upload>
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
import type {UploadProps, UploadUserFile} from 'element-plus';
import {ElMessage, ElMessageBox} from 'element-plus';
import service from './grade.service';

const emit = defineEmits(['reload']);
const props = defineProps({
    edit: {
        type: Boolean,
        default: false,
    },
});
const visible = ref(false);
const open = () => {
    visible.value = true;
};

const formRef = ref();
const ruleForm = reactive({
    class_id: '',
    file_id: '',
    year: '',
    exam: '',
    semester: '',
});

const rules = reactive({
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
    file_id: [
        {
            required: true,
            message: '请上传文件',
            trigger: 'change',
        },
    ],
});

const close = () => {
    visible.value = false;
    resetForm();
};

const submitForm = async () => {
    await formRef.value.validate(async (valid: boolean) => {
        if (valid) {
            const res = await service.addImportGrade(ruleForm);
            if (res.status) {
                ElMessage.success('导入成功');
                emit('reload');
                close();
            }
        }
    });
};

const resetForm = () => {
    formRef.value.resetFields();
};

const fileList = ref<UploadUserFile[]>([]);

const uploadFile = async (options: any) => {
    const res = await service.uploadFile(options.file);
    if (res.status) {
        ruleForm.file_id = res.data.file_id;
    }
};

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
    console.log(file, uploadFiles);
};

const handlePreview: UploadProps['onPreview'] = uploadFile => {
    console.log(uploadFile);
};

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
    ElMessage.warning(
        `The limit is 3, you selected ${files.length} files this time, add up to ${
            files.length + uploadFiles.length
        } totally`
    );
};

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
    return ElMessageBox.confirm(`Cancel the transfer of ${uploadFile.name} ?`).then(
        () => true,
        () => false
    );
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

:deep(.el-upload-list) {
    width: 200px;
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
