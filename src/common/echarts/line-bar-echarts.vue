<template>
    <div ref="echartsLine" class="echarts-line"></div>
</template>

<script lang="ts" setup>
import {onBeforeUnmount, onMounted, PropType, reactive, ref, watch} from 'vue';
import * as echarts from 'echarts';
import {EchartsLineBarGridModel, EchartsLineBarSeriesModel} from '@/common/echarts/echarts-line-bar.model';

const props = defineProps({
    dataX: {
        type: Array<string>,
        default: () => [],
    },
    grid: {
        type: Object as PropType<EchartsLineBarGridModel>,
        default: () => {
            return {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            };
        },
    },
    series: {
        type: Array<EchartsLineBarSeriesModel>,
        default: () => [],
    },
    boundaryGap: {
        type: Boolean,
        default: true,
    },
    title: {
        type: String,
        default: '',
    },
});

const echartsLine = ref();
let myChart: echarts.ECharts;

const options = reactive({
    title: {
        text: props.title,
    },
    tooltip: {
        // 触发类型，默认数据触发，可选为：'item' | 'axis'
        trigger: 'axis',
        // 自定义的 formatter 函数
    },
    grid: props.grid,
    xAxis: {
        boundaryGap: props.boundaryGap,
        data: props.dataX,
        axisLine: {
            lineStyle: {
                color: '#D6E0F9',
                type: 'dashed',
            },
        },
        axisLabel: {
            show: true,
            color: '#35353E',
            margin: 10,
        },
        axisPointer: {
            show: true,
            label: {
                show: true,
                color: '#3162E1',
                fontWeight: 'bold',
                backgroundColor: '#FFFFFF',
            },
        },
        splitLine: {
            show: true, // 显示网格线
            lineStyle: {
                color: '#e0e0e0', // 网格线颜色
                width: 1, // 网格线宽度
                type: 'solid', // 网格线类型
            },
        },
        axisTick: {
            show: false,
        },
    },
    yAxis: {
        splitLine: {
            show: true, // 显示网格线
            lineStyle: {
                color: '#e0e0e0', // 网格线颜色
                width: 1, // 网格线宽度
                type: 'solid', // 网格线类型
            },
        },
    },
    series: [...props.series] as echarts.SeriesOption[],
});
const initEcharts = () => {
    myChart = echarts.init(echartsLine.value);
    myChart.setOption(options);
};

const chartResize = () => {
    myChart.resize();
};

onMounted(() => {
    initEcharts();
    window.addEventListener('resize', chartResize);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', chartResize);
    myChart.dispose();
});

watch(
    () => props.series,
    newSeries => {
        if (myChart) {
            options.series = [...newSeries] as echarts.SeriesOption[];
            options.xAxis.data = props.dataX;
            myChart.setOption(options, {notMerge: true, lazyUpdate: false});
        }
    },
    {
        deep: true,
    }
);
</script>

<style lang="scss" scoped>
.echarts-line {
    width: 100%;
    height: 100%;
}
</style>
