export type TStockStatus = 'IN' | 'OUT';

export type TcreateDeviceStock = {
    device_category_id: number;
    device_code: string | null;
    issue: string | null;
    date: Date | string | null;
    origin_sector: string | null;
    origin_department: number;
    destination_sector: string | null;
    destination_department: number | null;
    device_quantity: number;
    status: TStockStatus;
    created_by: number;
};

export type TfilterDeviceStocks = {
    status: TStockStatus | '' | null;
    device_category_id: number | null;
    origin_department: number | null;
    destination_department: number | null;
};

export type TdeviceStockById = {
    stock_id: number;
};

export type TupdateDeviceStock = {
    device_category_id: number | null;
    device_code: string | null;
    issue: string | null;
    date: Date | string | null;
    origin_sector: string | null;
    origin_department: number | null;
    destination_sector: string | null;
    destination_department: number | null;
    device_quantity: number | null;
    status: TStockStatus | '' | null;
    updated_by: number;
};

export type TupdateDeviceStockStatus = {
    status: TStockStatus;
    updated_by: number;
};

export type TtransferDeviceStock = {
    destination_sector: string | null;
    destination_department: number;
    updated_by: number;
};

export type TdeleteDeviceStock = {
    stock_id: number;
    updated_by: number;
};