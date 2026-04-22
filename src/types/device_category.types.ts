export interface DeviceCategory {
    category_id    : number;
    category_name  : string;
    description    : string | null;
    device_count   : number | null;
}

export type TcreateDeviceCategory = Omit<DeviceCategory, 'category_id'>;

export type TfilterDeviceCategories = {
    category_name ?: string;
};

export type TupdateDeviceCategory = Partial<Omit<DeviceCategory, 'category_id'>>;
