import { pool } from '../utills/pool';

const createVendorQuery = `
    INSERT INTO public.vendors
        (vendor_name, contact, phone, specialization, rating)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING vendor_id;
`;

const getVendorsQuery = `
   select * from get_vendors($1,$2);
`;

const getVendorByIdQuery = `
    SELECT * FROM public.vendors WHERE vendor_id = $1;
`;

const updateVendorQuery = `
    SELECT update_vendor(
        $1::int, $2::varchar, $3::varchar,
        $4::varchar, $5::varchar, $6::numeric
    ) AS success;
`;
const deleteVendorQuery = `
    DELETE FROM public.vendors WHERE vendor_id = $1;
`;

export const createVendor = async (
    vendor_name   : string,
    contact       : string | null,
    phone         : string | null,
    specialization: string | null,
    rating        : number | null
): Promise<number | undefined> => {
    const result = await pool.query(createVendorQuery, [vendor_name, contact, phone, specialization, rating]);
    return result.rows[0]?.vendor_id;
};

export const getVendors = async (
    vendor_name   : string,
    specialization: string
): Promise<Record<string, unknown>[]> => {
    const result = await pool.query(getVendorsQuery, [vendor_name, specialization]);
    return result.rows;
};

export const getVendorById = async (
    vendor_id: number
): Promise<Record<string, unknown> | undefined> => {
    const result = await pool.query(getVendorByIdQuery, [vendor_id]);
    return result.rows[0];
};

export const updateVendorById = async (
    vendor_id      : number,
    vendor_name    : string | null,
    contact        : string | null,
    phone          : string | null,
    specialization : string | null,
    rating         : number | null
): Promise<boolean> => {
    const result = await pool.query(updateVendorQuery, [vendor_id, vendor_name, contact, phone, specialization, rating]);
    return result.rows[0]?.success ?? false;
};

export const deleteVendor = async (vendor_id: number): Promise<void> => {
    await pool.query(deleteVendorQuery, [vendor_id]);
};
