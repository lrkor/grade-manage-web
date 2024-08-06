<template>
    <div class="detail">
        <div class="detail-header">
            <div>
                <el-icon>
                    <ArrowLeftBold />
                </el-icon>
            </div>
            <div>tom</div>
            <div>
                <el-icon>
                    <ArrowRightBold />
                </el-icon>
            </div>
        </div>
        <div class="detail-body">
            <div class="detail-body__title">
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
                    <el-form-item>
                        <el-radio-group v-model="formData.tb" size="large" @change="tbChange">
                            <el-radio-button label="1" value="1">同期</el-radio-button>
                            <el-radio-button label="2" value="2">本期</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </div>
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
import {ArrowLeftBold, ArrowRightBold} from '@element-plus/icons-vue';
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

const tbChange = (val: string) => {
    if (val === '1') {
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
        padding: 0 16px;
        height: 40px;
        display: flex;
        background-color: #fff;
        border-radius: 8px;
        align-items: center;
        justify-content: space-between;
    }

    &-body {
        margin-top: 20px;
        flex: 1;
        background-color: #fff;
        border-radius: 8px;
        display: flex;
        flex-direction: column;

        &__title {
            margin-top: 16px;
            padding: 0 16px;
        }

        :deep(.el-form-item) {
            margin-bottom: 0;
        }
    }
}
</style>
