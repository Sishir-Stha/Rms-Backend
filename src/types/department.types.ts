export interface Department {
    department_id   : number;
    department_name : string;
    department_code : string;
    head_count      : number | null;
}

export type TcreateDepartment = Omit<Department, 'department_id'>;

export type TfilterDepartments = {
    department_name ?: string;
    department_code ?: string;
};

export type TupdateDepartment = Partial<Omit<Department, 'department_id'>>;
