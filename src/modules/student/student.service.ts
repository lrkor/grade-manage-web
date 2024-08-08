import http from '@/common/http';
import {AxiosResponse} from 'axios';
import {StudentModel} from '@/modules/student/student.model';
import PageModel from '@/common/models/page.model';

export default class studentAPI {
    // 获取表格数据
    static getStudentList(
        page: number,
        size: number,
        class_id: string,
        name: string
    ): Promise<AxiosResponse<PageModel<StudentModel[]>>> {
        return http.get('/student', {
            page,
            size,
            class_id,
            name,
        });
    }

    static addStudent(name: string, class_id: string): Promise<AxiosResponse<{id: string}>> {
        return http.post('/student', {name, class_id});
    }

    // 删除表格数据
    static deleteStudent(id: string): Promise<AxiosResponse<{id: string}>> {
        return http.delete(`/student/${id}`);
    }

    // 修改表格数据
    static updateStudent(id: string, name: string, class_id: string): Promise<AxiosResponse<{id: string}>> {
        return http.put(`/student/${id}`, {name, class_id});
    }
}
