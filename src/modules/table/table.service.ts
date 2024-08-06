import http from '@/common/http';
import {TableModel} from './table.model';
import {AxiosResponse} from 'axios';

export default class tableAPI {
    // 获取表格数据
    static getTableData(): Promise<AxiosResponse<TableModel[]>> {
        return http.post('/list');
    }

    // 删除表格数据
    static deleteTableData(id: string): Promise<TableModel> {
        return http.delete(`api/sysUser/${id}`);
    }

    // 修改表格数据
    static updateTableData(id: string, parm: TableModel): Promise<TableModel> {
        return http.put(`api/sysUser/${id}`, parm);
    }
}
