export interface RequestCount {
    Open: number;
    InProgress: number;
    Resolved: number;
    Closed: number;
}

export interface DeviceRequestReport {
    department_code: string;
    request_count: RequestCount;
}

export interface RepairStatusCount {
    Open: number;
    InProgress: number;
    Resolved: number;
    Closed: number;
}

export interface RepairMonthlyReport {
    month: string;
    monthly_repair_summary: RepairStatusCount;
}