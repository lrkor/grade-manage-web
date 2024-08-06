<template>
    <div class="table-page">
        <div class="table-page-body">
            <el-table
                :data="tableData"
                :header-cell-style="{color: '#333', fontSize: '16px'}"
                border
                empty-text="--"
                size="large"
                stripe
                style="width: 100%"
            >
                <slot></slot>
                >
            </el-table>
        </div>
        <div class="table-page-bottom">
            <el-pagination
                :background="true"
                :current-page="currentPage"
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
import {ref} from 'vue';

const props = defineProps({
    tableData: {
        type: Array,
        default: () => [],
    },
    total: {
        type: Number,
        default: 0,
    },
});

const emit = defineEmits(['currentChange']);

const currentPage = ref(1);
const handleCurrentChange = (val: number) => {
    currentPage.value = val;
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
