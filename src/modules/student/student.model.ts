export interface StudentModel {
    id: string;
    name: string;
    class_name: string;
    class_id: string;
}

export interface StudentGradeModel {
    score: number;
    exam: string;
}

export interface StudentGradeCompareModel {
    current_score: number;
    previous_score: number;
    exam: string;
}
