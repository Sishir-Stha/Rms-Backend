import { pool } from '../utills/pool';

const createVendorQuery = `
    INSERT INTO public.vendors
        (vendor_name, contact, phone, specialization, rating)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING vendor_id;
`;

const getVendorsQuery = `
    SELECT * FROM get_vendors($1, $2);
`;

const getVendorByIdQuery = `
    SELECT * FROM public.vendors WHERE vendor_id = $1;
`;

const updateVendorQuery = `
    SELECT update_vendor(
        $1::int, $2::varchar, $3::varchar, $4::varchar, $5::varchar, $6::numeric
    ) AS success;
`;

const deleteVendorQuery = `
    DELETE FROM public.vendors WHERE vendor_id = $1;
`;

export const vendorSql = {
    createVendorQuery,
    getVendorsFunctionQuery: `
        CREATE OR REPLACE FUNCTION public.get_vendors(
            p_vendor_name varchar DEFAULT '',
            p_specialization varchar DEFAULT ''
        )
        RETURNS TABLE (
            vendor_id integer,
            vendor_name varchar,
            contact varchar,
            phone varchar,
            specialization varchar,
            rating numeric,
            created_at timestamp
        )
        LANGUAGE plpgsql
        AS $$
        BEGIN
            RETURN QUERY
            SELECT
                v.vendor_id,
                v.vendor_name,
                v.contact,
                v.phone,
                v.specialization,
                v.rating,
                v.created_at
            FROM public.vendors v
            WHERE
                (COALESCE(p_vendor_name, '') = '' OR v.vendor_name ILIKE '%' || p_vendor_name || '%')
                AND
                (COALESCE(p_specialization, '') = '' OR v.specialization ILIKE '%' || p_specialization || '%')
            ORDER BY v.vendor_id DESC;
        END;
        $$;
    `,
    getVendorsQuery,
    updateVendorFunctionQuery: `
        CREATE OR REPLACE FUNCTION public.update_vendor(
            p_vendor_id integer,
            p_vendor_name varchar DEFAULT NULL,
            p_contact varchar DEFAULT NULL,
            p_phone varchar DEFAULT NULL,
            p_specialization varchar DEFAULT NULL,
            p_rating numeric DEFAULT NULL
        )
        RETURNS boolean
        LANGUAGE plpgsql
        AS $$
        DECLARE
            v_updated_rows INT;
        BEGIN
            UPDATE public.vendors
            SET
                vendor_name    = COALESCE(NULLIF(p_vendor_name, ''), vendor_name),
                contact        = COALESCE(NULLIF(p_contact, ''), contact),
                phone          = COALESCE(NULLIF(p_phone, ''), phone),
                specialization = COALESCE(NULLIF(p_specialization, ''), specialization),
                rating         = COALESCE(p_rating, rating)
            WHERE vendor_id = p_vendor_id;

            GET DIAGNOSTICS v_updated_rows = ROW_COUNT;
            RETURN v_updated_rows > 0;
        END;
        $$;
    `,
    updateVendorQuery,
    deleteVendorQuery,
};

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
