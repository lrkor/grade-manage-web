<template>
    <div class="detail">
        <div class="detail-header">
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
                        <el-option label="第一学期" value="1" />
                        <el-option label="第二学期" value="2" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-radio-group v-model="formData.tb" size="large" @change="tbChange">
                        <el-radio-button label="1" value="1">同期</el-radio-button>
                        <el-radio-button label="2" value="2">本期</el-radio-button>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </div>
        <div class="detail-body">
            <line-bar-echarts
                ref="echarts"
                :boundary-gap="boundaryGap"
                :data-x="dataX"
                :series="series"
                :title="name"
            ></line-bar-echarts>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue';
import lineBarEcharts from '@/common/echarts/line-bar-echarts.vue';
import {EchartsLineBarSeriesModel} from '@/common/echarts/echarts-line-bar.model';
import {colorBlue, colorRed} from '@/common/echarts/echarts-color';
import moment from 'moment/moment';
import {useRoute} from 'vue-router';
import service from './student.service';
import {StudentGradeCompareModel, StudentGradeModel} from '@/modules/student/student.model';

const route = useRoute();
const id = route.query.id as string;
const name = route.query.name + '的成绩';

const echarts = ref();
const dataX = ref<string[]>([]);
const series = ref<EchartsLineBarSeriesModel[]>([]);
const boundaryGap = ref(true);

const tbChange = () => {
    if (formData.tb === '1') {
        getStudentGradesCompare();
    } else {
        getStudentGrades();
    }
};

const formData = reactive({
    year: moment().format('YYYY'),
    semester: '1',
    exam: '',
    tb: '1',
});

const getStudentGrades = async () => {
    const res = await service.getStudentGrades(id, formData.year, formData.semester);
    if (res.status) {
        dataX.value.length = 0;
        const dataY: number[] = [];
        res.data.forEach((item: StudentGradeModel) => {
            dataX.value.push(item.exam);
            dataY.push(item.score);
        });
        series.value = [
            {
                name: '成绩',
                type: 'line',
                data: dataY,
                color: colorBlue,
                smooth: true,
                label: {
                    show: true,
                    position: 'top', // 显示在柱子上方
                    formatter: '{c}', // 显示值
                },
            },
        ];
    }
};

const getStudentGradesCompare = async () => {
    const res = await service.getStudentGradesCompare(id, formData.year, formData.semester);
    if (res.status) {
        dataX.value.length = 0;
        const dataY1: number[] = [];
        const dataY2: number[] = [];
        res.data.forEach((item: StudentGradeCompareModel) => {
            dataX.value.push(item.exam);
            dataY1.push(item.current_score);
            dataY2.push(item.previous_score);
        });
        series.value = [
            {
                name: '当前成绩',
                type: 'bar',
                data: dataY1,
                color: colorBlue,
                smooth: true,
                label: {
                    show: true,
                    position: 'top', // 显示在柱子上方
                    formatter: '{c}', // 显示值
                },
            },
            {
                name: '上期成绩',
                type: 'bar',
                color: colorRed,
                smooth: true,
                data: dataY2,
                label: {
                    show: true,
                    position: 'top', // 显示在柱子上方
                    formatter: '{c}', // 显示值
                },
            },
        ];
    }
};

onMounted(() => {
    getStudentGradesCompare();
});
</script>

<style lang="scss" scoped>
.detail {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 16px;

    &-header {
        padding: 16px;
        display: flex;
        background-color: #fff;
        border-radius: 8px;
        align-items: center;
        justify-content: space-between;

        :deep(.el-form-item) {
            margin-bottom: 0;
        }
    }

    &-body {
        margin-top: 20px;
        flex: 1;
        background-color: #fff;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        padding: 16px;
    }
}
</style>
