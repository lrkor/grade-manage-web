<template>
    <div class="table">
        <el-icon :size="14" color="transparent">
            <icon-add></icon-add>
        </el-icon>
        <el-table :data="tableData" border style="width: 100%" @row-click="rowClick">
            <el-table-column label="Date" prop="date" width="180" />
            <el-table-column label="Name" prop="name" width="180" />
            <el-table-column label="加数1" prop="num1">
                <template #default="{row}">
                    <div v-if="row.edit">
                        <el-input v-model="row.num1" type="number" @change="change(row.num1, row, 'num2')"></el-input>
                    </div>
                    <span v-else>{{ row.num1 }}</span>
                </template>
            </el-table-column>
            <el-table-column label="加数2" prop="num2">
                <template #default="{row}">
                    <div v-if="row.edit">
                        <el-input v-model="row.num2" type="number" @change="change(row.num1, row, 'num1')"></el-input>
                    </div>
                    <span v-else>{{ row.num2 }}</span>
                </template>
            </el-table-column>
            <el-table-column label="总数" prop="total"></el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import {reactive} from 'vue';
import {IconAdd} from '@/icons/index';
import service from '@/modules/table/table.service';

const tableData = reactive([
    {
        date: '2016-05-03',
        name: 'Tom',
        num1: 1,
        num2: 2,
        total: 3,
        edit: false,
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        num1: 1,
        num2: 2,
        total: 3,
        edit: false,
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        num1: 1,
        num2: 2,
        total: 3,
        edit: false,
    },
]);

const rowClick = (row: any) => {
    tableData.forEach(item => {
        item.edit = false;
    });

    row.edit = true;
};

const getTable = async () => {
    const res = await service.getTableData();
    console.log(res.data);
};
getTable();
const change = (value: number, row: any, field: string) => {
    row.total = Number(row[field]) + Number(value);
};
</script>
