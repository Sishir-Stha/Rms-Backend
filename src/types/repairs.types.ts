export interface reports{
    repair_id : number;
  
    device_name : string;
    category_id : number;
    serial_no : string;
    department_id : number;
    issue : string;
    notes : string;
    reported_by : number;
    reported_date : Date;
    vendor_id : number;
    priority : string;
    expected_completion : Date;
    resolved_date : Date;
    cost : number;
    status : string;

}

export type TcreateRepair = Omit<reports,'repair_id'|'reported_date'>

export type TfilterReports = Omit<reports,'repair_id'|'category_id'|'serial_no'|'issue'|
                                  'notes'|'vendor_id'|'priority'|'expected_completion'|'resolved_date'|'cost'|'department_id'> 

export type TupdateKanbanColumn = Omit<reports,'repair_id'|'category_id'|'serial_no'|'issue'|'status'|'reported_by'|'reported_date'|
                                  'notes'|'vendor_id'|'priority'|'expected_completion'|'resolved_date'|'cost'|'department_id'|'device_name'> 
                                  &{kanban_column : string}

export type TupdateRepairs = Omit<reports,'repair_id'>