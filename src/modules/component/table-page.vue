<template>
    <div class="table-page">
        <div class="table-page-body">
            <el-table
                :data="tableData"
                :header-cell-style="{color: '#333', fontSize: '16px'}"
                border
                empty-text="暂无数据"
                size="large"
                stripe
                style="width: 100%"
            >
                <slot></slot>
            </el-table>
        </div>
        <div class="table-page-bottom">
            <el-pagination
                :background="true"
                :current-page="pageNum"
                :page-size="10"
                :total="total"
                hide-on-single-page
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
            />
        </div>
    </div>
</template>
<script lang="ts" setup>

const props = defineProps({
    tableData: {
        type: Array,
        default: () => [],
    },
    total: {
        type: Number,
        default: 0,
    },
    pageNum: {
        type: Number,
        default: 1,
    },
});

const emit = defineEmits(['currentChange']);

const handleCurrentChange = (val: number) => {
    emit('currentChange', val);
};
</script>

<style lang="scss" scoped>
.table-page {
    height: 100%;
    display: flex;
    flex-direction: column;

    &-body {
        flex: 1;
    }

    &-bottom {
        display: flex;
        justify-content: flex-end;
    }
}
</style>
