export interface Vendor {
    vendor_id       : number;
    vendor_name     : string;
    contact         : string | null;
    phone           : string | null;
    specialization  : string | null;
    rating          : number | null;
    created_at      : Date;
}

export type TcreateVendor = Omit<Vendor, 'vendor_id' | 'created_at'>;

export type TfilterVendors = {
    vendor_name    ?: string;
    specialization ?: string;
};

export type TupdateVendor = Partial<Omit<Vendor, 'vendor_id' | 'created_at'>>;
