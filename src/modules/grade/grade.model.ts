export interface GradeModel {
    id: string;
    student_name: string;
    class_name: string;
    class_id: string;
    year: string;
    semester: string;
    exam: string;
    score: number;
}

export interface GradeFormModel {
    name: string;
    class_id: string;
    year: string;
    semester: string;
    exam: string;
    score: number;
}

export interface GradeImportModel {
    file_id: string;
    class_id: string;
    year: string;
    semester: string;
    exam: string;
}
