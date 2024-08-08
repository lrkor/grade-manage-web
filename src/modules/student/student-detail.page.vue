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
                        <el-option label="上学期" value="1" />
                        <el-option label="下学期" value="2" />
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
            ></line-bar-echarts>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {reactive, ref} from 'vue';
import lineBarEcharts from '@/common/echarts/line-bar-echarts.vue';
import {EchartsLineBarSeriesModel} from '@/common/echarts/echarts-line-bar.model';
import {colorBlue} from '@/common/echarts/echarts-color';
import moment from 'moment/moment';

const echarts = ref();
const dataX = ref<string[]>(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
const series = ref<EchartsLineBarSeriesModel[]>([
    {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20, 10, 20, 36, 10, 10, 20],
        color: colorBlue,
        smooth: true,
    },
    {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20, 10, 20, 36, 10, 10, 20],
        color: colorBlue,
        smooth: true,
    },
]);
const boundaryGap = ref(true);

const change = () => {
    dataX.value = ['1', '2', '33', '55', '5', 'ss', '7', '8', '9', '10', '11', '12'];
    boundaryGap.value = !boundaryGap.value;
    series.value = [
        {
            name: '销量',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20, 10, 20, 36, 10, 10, 20],
            color: colorBlue,
            smooth: true,
        },
    ];
};

const tbChange = () => {
    if (formData.tb === '1') {
        series.value = [
            {
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20, 10, 20, 36, 10, 10, 20],
                color: colorBlue,
                smooth: true,
            },
            {
                name: '销量',
                type: 'bar',
                color: colorBlue,
                smooth: true,
                data: [5, 20, 36, 10, 10, 20, 10],
            },
        ];
    } else {
        dataX.value = ['1', '2', '33', '55', '5', 'ss', '7', '8', '9', '10', '11', '12'];
        boundaryGap.value = !boundaryGap.value;
        series.value = [
            {
                name: '销量',
                type: 'line',
                data: [5, 20, 36, 10, 10, 20, 10, 20, 36, 10, 10, 20],
                color: colorBlue,
                smooth: true,
            },
        ];
    }
};

const formData = reactive({
    year: moment().format('YYYY'),
    semester: '',
    exam: '',
    tb: '1',
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
    }
}
</style>
