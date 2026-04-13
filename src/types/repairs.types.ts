export interface reports{
    repair_id : number;
    status : string;
    device_name : string;
    category_id : number;
    serial_no : string;
    issue : string;
    notes : string;
    vendor_id : number;
    priority : string;
    expected_completion : Date;
    resolved_date : Date;
    cost : number;
}

export type TfilterReports = Omit<reports,'repair_id'|'category_id'|'serial_no'|'issue'|
                                  'notes'|'vendor_id'|'priority'|'expected_completion'|'resolved_date'|'cost'>