import http from '@/common/http';
import {AxiosResponse} from 'axios';
import PageModel from '@/common/models/page.model';
import {GradeFormModel, GradeImportModel, GradeModel} from '@/modules/grade/grade.model';

export default class studentAPI {
    // 获取表格数据
    static getGradeList(
        page: number,
        size: number,
        class_id: string,
        name: string,
        year: string,
        semester: number | string,
        exam: number | string
    ): Promise<AxiosResponse<PageModel<GradeModel[]>>> {
        return http.get('/grade', {
            page,
            size,
            class_id,
            name,
            year,
            semester,
            exam,
        });
    }

    static addGrade(data: GradeFormModel): Promise<AxiosResponse<{id: string}>> {
        return http.post('/grade', data);
    }

    static addImportGrade(data: GradeImportModel): Promise<AxiosResponse<{id: string}>> {
        return http.post('/grade/import-grades', data);
    }

    // 删除表格数据
    static deleteGrade(id: string): Promise<AxiosResponse<{id: string}>> {
        return http.delete(`/grade/${id}`);
    }

    // 修改表格数据
    static updateGrade(id: string, data: GradeFormModel): Promise<AxiosResponse<{id: string}>> {
        return http.put(`/grade/${id}`, data);
    }

    static uploadFile(file: File): Promise<AxiosResponse<{file_id: string}>> {
        const formData = new FormData();
        formData.set('file', file);
        return http.post(`/common/upload-file`, formData);
    }
}
