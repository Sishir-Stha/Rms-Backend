export interface DeviceRequest {
    request_id      : number;
    requested_by    : number;
    department_id   : number;
    device_type     : string;
    brand           : string;
    reason          : string;
    quantity        : number;
    priority        : string;
    request_date    : Date;
    approval_status : string;
    approved_by     : number | null;
    approval_date   : Date | null;
    kanban_column   : string;
}

// POST /device-requests — create a new request
export type TcreateDeviceRequest = Omit<DeviceRequest, 'request_id' | 'request_date' | 'approval_status' | 'approved_by' | 'approval_date' | 'kanban_column'>;

// GET /device-requests — filter by status / device_type
export type TfilterDeviceRequests = {
    approval_status ?: string;
    device_type     ?: string;
};

// PUT /device-requests/:id — full update (all fields optional except ID which is in params)
export type TupdateDeviceRequest = Partial<Omit<DeviceRequest, 'request_id'>>;

// PATCH /device-requests/:id/move — move kanban column
export type TmoveKanbanColumn = {
    kanban_column: string;
};

// PATCH /device-requests/:id/approve — approve / reject
export type TapproveDeviceRequest = {
    approval_status : 'Approved' | 'Rejected';
    approved_by     : number;
};
