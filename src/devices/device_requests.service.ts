import { pool } from '../utills/pool';

export const createDeviceRequest = async (
    requested_by: number,
    department_id: number,
    device_type: string,
    brand: string,
    reason: string,
    quantity: number,
    priority: string,
    requested_for: string
): Promise<number | undefined> => {
    const result = await pool.query(
        `INSERT INTO public.device_requests
            (
                requested_by,
                department_id,
                device_type,
                brand,
                reason,
                quantity,
                priority,
                approval_status,
                requested_for
            )
         VALUES ($1, $2, $3, $4, $5, $6, $7, 'Requested', $8)
         RETURNING request_id;`,
        [
            requested_by,
            department_id,
            device_type,
            brand,
            reason,
            quantity,
            priority,
            requested_for
        ]
    );

    return result.rows[0]?.request_id;
};


/**
 * Get all device requests
 *
 * IMPORTANT:
 * Dates are converted to strings using TO_CHAR()
 * so Node/JavaScript cannot convert them to UTC
 * and move the displayed date back by one day.
 */
export const getDeviceRequests = async (
    approval_status: string,
    device_type: string
): Promise<Record<string, unknown>[]> => {

    const result = await pool.query(
        `SELECT
            dr.request_id,
            dr.requested_by,
            u_req.user_name AS requester_name,

            dr.department_id,
            d.department_name,

            dr.device_type,
            dr.brand,
            dr.reason,
            dr.quantity,
            dr.priority,

            TO_CHAR(dr.request_date, 'YYYY-MM-DD') AS request_date,

            dr.approval_status,
            dr.approved_by,
            u_apr.user_name AS approver_name,

            CASE
                WHEN dr.approval_date IS NOT NULL
                THEN TO_CHAR(dr.approval_date, 'YYYY-MM-DD')
                ELSE NULL
            END AS approval_date,

            CASE
                WHEN dr.recommended_date IS NOT NULL
                THEN TO_CHAR(dr.recommended_date, 'YYYY-MM-DD')
                ELSE NULL
            END AS recommended_date,

            CASE
                WHEN dr.fulfilled_date IS NOT NULL
                THEN TO_CHAR(dr.fulfilled_date, 'YYYY-MM-DD')
                ELSE NULL
            END AS fulfilled_date,

            TO_CHAR(dr.created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at,
            TO_CHAR(dr.updated_at, 'YYYY-MM-DD HH24:MI:SS') AS updated_at,

            dr.requested_for

         FROM public.device_requests dr

         JOIN public.users u_req
             ON u_req.user_id = dr.requested_by

         JOIN public.departments d
             ON d.department_id = dr.department_id

         LEFT JOIN public.users u_apr
             ON u_apr.user_id = dr.approved_by

         WHERE
            ($1 = '' OR LOWER(dr.approval_status) = LOWER($1))
            AND
            ($2 = '' OR LOWER(dr.device_type) = LOWER($2))

         ORDER BY dr.request_id DESC;`,
        [approval_status, device_type]
    );

    return result.rows;
};


/**
 * Get a single device request
 */
export const getDeviceRequestById = async (
    request_id: number
): Promise<Record<string, unknown> | undefined> => {

    const result = await pool.query(
        `SELECT
            dr.request_id,
            dr.requested_by,
            u_req.user_name AS requester_name,

            dr.department_id,
            d.department_name,

            dr.device_type,
            dr.brand,
            dr.reason,
            dr.quantity,
            dr.priority,

            TO_CHAR(dr.request_date, 'YYYY-MM-DD') AS request_date,

            dr.approval_status,
            dr.approved_by,
            u_apr.user_name AS approver_name,

            CASE
                WHEN dr.approval_date IS NOT NULL
                THEN TO_CHAR(dr.approval_date, 'YYYY-MM-DD')
                ELSE NULL
            END AS approval_date,

            CASE
                WHEN dr.recommended_date IS NOT NULL
                THEN TO_CHAR(dr.recommended_date, 'YYYY-MM-DD')
                ELSE NULL
            END AS recommended_date,

            CASE
                WHEN dr.fulfilled_date IS NOT NULL
                THEN TO_CHAR(dr.fulfilled_date, 'YYYY-MM-DD')
                ELSE NULL
            END AS fulfilled_date,

            TO_CHAR(dr.created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at,
            TO_CHAR(dr.updated_at, 'YYYY-MM-DD HH24:MI:SS') AS updated_at,

            dr.requested_for

         FROM public.device_requests dr

         JOIN public.users u_req
             ON u_req.user_id = dr.requested_by

         JOIN public.departments d
             ON d.department_id = dr.department_id

         LEFT JOIN public.users u_apr
             ON u_apr.user_id = dr.approved_by

         WHERE dr.request_id = $1;`,
        [request_id]
    );

    return result.rows[0];
};


/**
 * Update device request
 */
export const updateDeviceRequestById = async (
    request_id: number,
    requested_by: number | null,
    department_id: number | null,
    device_type: string | null,
    brand: string | null,
    reason: string | null,
    quantity: number | null,
    priority: string | null,
    request_date: Date | null,
    approval_status: string | null,
    approved_by: number | null,
    approval_date: Date | null,
    requested_for: string | null
): Promise<boolean> => {

    const result = await pool.query(
        `SELECT update_device_request(
            $1::int,
            $2::int,
            $3::int,
            $4::varchar,
            $5::varchar,
            $6::text,
            $7::int,
            $8::varchar,
            $9::date,
            $10::varchar,
            $11::int,
            $12::date,
            $13::varchar
        ) AS success;`,
        [
            request_id,
            requested_by,
            department_id,
            device_type,
            brand,
            reason,
            quantity,
            priority,
            request_date,
            approval_status,
            approved_by,
            approval_date,
            requested_for
        ]
    );

    return result.rows[0]?.success ?? false;
};


/**
 * Move request between Kanban columns
 *
 * Each Kanban status has its own date field:
 *
 * Requested   -> request_date
 * Recommended -> recommended_date
 * Approved    -> approval_date
 * Rejected    -> approval_date
 * Fulfilled   -> fulfilled_date
 *
 * CURRENT_DATE is used so the date is stored according
 * to the PostgreSQL server's current date and is not
 * affected by JavaScript timezone conversion.
 */
export const moveKanbanColumn = async (
    request_id: number,
    status: string
): Promise<Record<string, unknown> | undefined> => {

    const normalizedStatus = status.trim().toLowerCase();

    /*
     * Only allow known status/date-field combinations.
     * This prevents arbitrary column names from being
     * inserted into the SQL query.
     */
    const dateFieldMap: Record<string, string> = {
        requested: 'request_date',
        recommended: 'recommended_date',
        approved: 'approval_date',
        rejected: 'approval_date',
        fulfilled: 'fulfilled_date'
    };

    const dateField = dateFieldMap[normalizedStatus];

    let query: string;

    if (dateField) {
        query = `
            UPDATE public.device_requests
            SET
                approval_status = $2,
                ${dateField} = CURRENT_DATE
            WHERE request_id = $1
            RETURNING *;
        `;
    } else {
        /*
         * Fallback for an unknown status.
         * Status will still be updated, but no date
         * field will be modified.
         */
        query = `
            UPDATE public.device_requests
            SET
                approval_status = $2
            WHERE request_id = $1
            RETURNING *;
        `;
    }

    const result = await pool.query(
        query,
        [request_id, status.trim()]
    );

    return result.rows[0];
};


/**
 * Approve / Reject device request
 *
 * Existing Approved/Rejected behavior is preserved.
 * approval_date is always updated to today's date.
 */
export const approveDeviceRequest = async (
    request_id: number,
    approval_status: string,
    approved_by: number
): Promise<Record<string, unknown> | undefined> => {

    const result = await pool.query(
        `UPDATE public.device_requests
         SET
             approval_status = $2,
             approved_by = $3,
             approval_date = CURRENT_DATE
         WHERE request_id = $1
         RETURNING *;`,
        [
            request_id,
            approval_status,
            approved_by
        ]
    );

    return result.rows[0];
};


/**
 * Delete device request
 */
export const deleteDeviceRequest = async (
    request_id: number
): Promise<void> => {

    await pool.query(
        `DELETE FROM public.device_requests
         WHERE request_id = $1;`,
        [request_id]
    );
};