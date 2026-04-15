import { pool } from '../utills/pool';

// ── CREATE ────────────────────────────────────────────────────────────────────
export const createRepair = async (
    device_name        : string,
    category_id        : number,
    serial_no          : string,
    department_id      : number,
    issue              : string,
    notes              : string,
    reported_by        : number,
    vendor_id          : number,
    priority           : string,
    expected_completion: Date | null
): Promise<number | undefined> => {
    const query = `
        INSERT INTO public.repairs (
            device_name, category_id, serial_no, department_id,
            issue, notes, reported_by, vendor_id, priority,
            expected_completion, status, kanban_column, costs
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'Open','Backlog',0)
        RETURNING repair_id;
    `;
    const result = await pool.query(query, [
        device_name, category_id, serial_no, department_id,
        issue, notes, reported_by, vendor_id, priority, expected_completion,
    ]);
    return result.rows[0]?.repair_id;
};

// ── GET WITH FILTERS (via DB function) ───────────────────────────────────────
export const getRepairs = async (
    status     : string,
    device_name: string
): Promise<Record<string, unknown>[]> => {
    const result = await pool.query(
        `SELECT * FROM get_repairs($1, $2);`,
        [status, device_name]
    );
    return result.rows;
};

// ── GET BY ID ─────────────────────────────────────────────────────────────────
export const getRepairsById = async (
    repair_id: number
): Promise<Record<string, unknown> | undefined> => {
    const result = await pool.query(
        `SELECT * FROM repairs WHERE repair_id = $1;`,
        [repair_id]
    );
    return result.rows[0];
};

// ── UPDATE (via DB function update_repair) ────────────────────────────────────
export const updateRepairsById = async (
    repair_id          : number,
    device_name        : string | null,
    category_id        : number | null,
    serial_no          : string | null,
    department_id      : number | null,
    issue              : string | null,
    notes              : string | null,
    reported_by        : number | null,
    reported_date      : Date   | null,
    vendor_id          : number | null,
    status             : string | null,
    priority           : string | null,
    expected_completion: Date   | null,
    resolved_date      : Date   | null,
    cost               : number | null
): Promise<boolean> => {
    const result = await pool.query(
        `SELECT update_repair(
            $1::int, $2::varchar, $3::int,  $4::varchar, $5::int,
            $6::text, $7::text,  $8::int,  $9::date,   $10::int,
            $11::varchar, $12::varchar, $13::date, $14::date, $15::numeric
        ) AS success;`,
        [
            repair_id, device_name, category_id, serial_no, department_id,
            issue, notes, reported_by, reported_date, vendor_id,
            status, priority, expected_completion, resolved_date, cost,
        ]
    );
    return result.rows[0]?.success ?? false;
};

// ── MOVE KANBAN COLUMN ────────────────────────────────────────────────────────
export const updateKanbanColumn = async (
    repair_id    : number,
    kanban_column: string
): Promise<Record<string, unknown> | undefined> => {
    const result = await pool.query(
        `UPDATE repairs SET kanban_column = $2 WHERE repair_id = $1 RETURNING *;`,
        [repair_id, kanban_column]
    );
    return result.rows[0];
};

// ── DELETE ────────────────────────────────────────────────────────────────────
export const deleteRepair = async (repair_id: number): Promise<void> => {
    await pool.query(
        `DELETE FROM repairs WHERE repair_id = $1;`,
        [repair_id]
    );
};
