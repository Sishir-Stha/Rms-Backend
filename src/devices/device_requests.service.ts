import { pool } from '../utills/pool';

const getUserName = async (user_id: number | null | undefined): Promise<string> => {
  if (!user_id) return 'User';
  const r = await pool.query(`SELECT user_name FROM public.users WHERE user_id = $1`, [user_id]);
  return r.rows[0]?.user_name || 'User';
};

export const createDeviceRequest = async (
  requested_by: number, department_id: number, device_type: string, brand: string,
  reason: string, quantity: number, priority: string, requested_for: string
): Promise<number | undefined> => {
  const result = await pool.query(
    `INSERT INTO public.device_requests (requested_by, department_id, device_type, brand, reason, quantity, priority, approval_status, requested_for, is_deleted)
     VALUES ($1, $2, $3, $4, $5, $6, $7, 'Requested', $8, FALSE) RETURNING request_id;`,
    [requested_by, department_id, device_type, brand, reason, quantity, priority, requested_for]
  );
  return result.rows[0]?.request_id;
};

export const getDeviceRequests = async (approval_status: string, device_type: string): Promise<Record<string, unknown>[]> => {
  const result = await pool.query(
    `SELECT 
      dr.request_id,
      dr.requested_by, u_req.user_name AS requester_name, dr.department_id, d.department_name,
      dr.device_type, dr.brand, dr.reason, dr.quantity, dr.priority,
      TO_CHAR(dr.request_date, 'YYYY-MM-DD') AS request_date, dr.approval_status, dr.approved_by, u_apr.user_name AS approver_name,
      CASE WHEN dr.approval_date IS NOT NULL THEN TO_CHAR(dr.approval_date, 'YYYY-MM-DD') ELSE NULL END AS approval_date,
      CASE WHEN dr.fulfilled_date IS NOT NULL THEN TO_CHAR(dr.fulfilled_date, 'YYYY-MM-DD') ELSE NULL END AS fulfilled_date,
      CASE WHEN dr.recommended_date IS NOT NULL THEN TO_CHAR(dr.recommended_date, 'YYYY-MM-DD') ELSE NULL END AS recommended_date,
      TO_CHAR(dr.created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at,
      TO_CHAR(dr.updated_at, 'YYYY-MM-DD HH24:MI:SS') AS updated_at,
      dr.requested_for, dr.is_deleted, dr.original_request_id, dr.split_info, dr.planned_fulfilled_qty,
      dr.expense_without_vat, dr.expense_with_vat
     FROM public.device_requests dr
     JOIN public.users u_req ON u_req.user_id = dr.requested_by
     JOIN public.departments d ON d.department_id = dr.department_id
     LEFT JOIN public.users u_apr ON u_apr.user_id = dr.approved_by
     WHERE dr.is_deleted = FALSE
       AND ($1 = '' OR LOWER(dr.approval_status) = LOWER($1))
       AND ($2 = '' OR LOWER(dr.device_type) = LOWER($2))
     ORDER BY dr.request_id DESC;`,
    [approval_status, device_type]
  );
  return result.rows;
};

export const getDeviceRequestById = async (request_id: number): Promise<Record<string, unknown> | undefined> => {
  const result = await pool.query(
    `SELECT 
      dr.request_id,
      dr.requested_by, u_req.user_name AS requester_name, dr.department_id, d.department_name,
      dr.device_type, dr.brand, dr.reason, dr.quantity, dr.priority,
      TO_CHAR(dr.request_date, 'YYYY-MM-DD') AS request_date, dr.approval_status, dr.approved_by, u_apr.user_name AS approver_name,
      CASE WHEN dr.approval_date IS NOT NULL THEN TO_CHAR(dr.approval_date, 'YYYY-MM-DD') ELSE NULL END AS approval_date,
      CASE WHEN dr.fulfilled_date IS NOT NULL THEN TO_CHAR(dr.fulfilled_date, 'YYYY-MM-DD') ELSE NULL END AS fulfilled_date,
      CASE WHEN dr.recommended_date IS NOT NULL THEN TO_CHAR(dr.recommended_date, 'YYYY-MM-DD') ELSE NULL END AS recommended_date,
      TO_CHAR(dr.created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at,
      TO_CHAR(dr.updated_at, 'YYYY-MM-DD HH24:MI:SS') AS updated_at,
      dr.requested_for, dr.is_deleted, dr.original_request_id, dr.split_info, dr.planned_fulfilled_qty,
      dr.expense_without_vat, dr.expense_with_vat
     FROM public.device_requests dr
     JOIN public.users u_req ON u_req.user_id = dr.requested_by
     JOIN public.departments d ON d.department_id = dr.department_id
     LEFT JOIN public.users u_apr ON u_apr.user_id = dr.approved_by
     WHERE dr.request_id = $1 AND dr.is_deleted = FALSE;`,
    [request_id]
  );
  return result.rows[0];
};

export const updateDeviceRequestById = async (
  request_id: number, requested_by: number | null, department_id: number | null, device_type: string | null,
  brand: string | null, reason: string | null, quantity: number | null, priority: string | null,
  request_date: Date | null, approval_status: string | null, approved_by: number | null,
  approval_date: Date | null, requested_for: string | null, planned_fulfilled_qty: number | null,
  updated_by: number | null, expense_without_vat: number | null, expense_with_vat: number | null
): Promise<boolean> => {
  const oldRes = await pool.query(`SELECT * FROM public.device_requests WHERE request_id = $1 AND is_deleted = FALSE`, [request_id]);
  const old = oldRes.rows[0];
  if (!old) return false;

  const editor = updated_by ?? approved_by;

  const result = await pool.query(
    `UPDATE public.device_requests SET
      requested_by = COALESCE($2, requested_by),
      department_id = COALESCE($3, department_id),
      device_type = COALESCE($4, device_type),
      brand = COALESCE($5, brand),
      reason = COALESCE($6, reason),
      quantity = COALESCE($7, quantity),
      priority = COALESCE($8, priority),
      request_date = COALESCE($9, request_date),
      approval_status = COALESCE($10, approval_status),
      approved_by = COALESCE($11, approved_by),
      approval_date = COALESCE($12, approval_date),
      requested_for = COALESCE($13, requested_for),
      planned_fulfilled_qty = COALESCE($14, planned_fulfilled_qty),
      expense_without_vat = COALESCE($15::numeric, expense_without_vat),
      expense_with_vat = COALESCE($16::numeric, expense_with_vat),
      updated_at = CURRENT_TIMESTAMP
     WHERE request_id = $1 AND is_deleted = FALSE`,
    [request_id, requested_by, department_id, device_type, brand, reason, quantity, priority, request_date, approval_status, approved_by, approval_date, requested_for, planned_fulfilled_qty, expense_without_vat, expense_with_vat]
  );
  const changed = (result.rowCount ?? 0) > 0;

  if (changed) {
    const name = await getUserName(editor);
    const logs: Array<{ action: string; notes: string }> = [];

    if (quantity != null && Number(quantity) !== Number(old.quantity)) {
      logs.push({ action: 'QUANTITY_UPDATE', notes: `${name} updated quantity from ${old.quantity} units to ${quantity} units` });
    }
      if (planned_fulfilled_qty != null) {
      const oldPartialQty = (old.approval_status === 'Approved' && (!old.planned_fulfilled_qty || old.planned_fulfilled_qty === 0))
        ? Number(old.quantity)
        : Number(old.planned_fulfilled_qty) || 0;
      const newPartialQty = Number(planned_fulfilled_qty);
      
      if (newPartialQty !== oldPartialQty) {
        logs.push({ 
          action: 'PARTIAL_FULFILLED_UPDATE', 
          notes: `${name} updated partial quantity from ${oldPartialQty} units to ${newPartialQty} units` 
        });
      }
    }
    if (expense_without_vat != null && Number(expense_without_vat) !== Number(old.expense_without_vat ?? 0)) {
      logs.push({ action: 'EXPENSE_UPDATE', notes: `${name} updated expense without VAT from Rs. ${old.expense_without_vat || 0} to Rs. ${expense_without_vat}` });
    }
    if (device_type != null && device_type !== old.device_type) logs.push({ action: 'FIELD_UPDATE', notes: `${name} updated device type from "${old.device_type}" to "${device_type}"` });
    if (brand != null && brand !== old.brand) logs.push({ action: 'FIELD_UPDATE', notes: `${name} updated brand from "${old.brand}" to "${brand}"` });
    if (priority != null && priority !== old.priority) logs.push({ action: 'FIELD_UPDATE', notes: `${name} updated priority from ${old.priority} to ${priority}` });
    if (requested_for != null && requested_for !== old.requested_for) logs.push({ action: 'FIELD_UPDATE', notes: `${name} updated requested for from "${old.requested_for}" to "${requested_for}"` });

    for (const log of logs) {
      await pool.query(
        `INSERT INTO public.device_request_audit_log (request_id, action, previous_value, new_value, performed_by, notes)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [request_id, log.action, null, null, editor, log.notes]
      );
    }
  }
  return changed;
};

export const moveKanbanColumn = async (request_id: number, status: string): Promise<Record<string, unknown> | undefined> => {
  const normalizedStatus = status.trim().toLowerCase();
  const dateField = normalizedStatus === 'fulfilled' ? 'fulfilled_date' : 'approval_date';
  const query = `UPDATE public.device_requests SET approval_status = $2, ${dateField} = CURRENT_DATE, updated_at = CURRENT_TIMESTAMP WHERE request_id = $1 AND is_deleted = FALSE RETURNING *;`;
  const result = await pool.query(query, [request_id, status.trim()]);
  return result.rows[0];
};

export const approveDeviceRequest = async (request_id: number, approval_status: string, approved_by: number): Promise<Record<string, unknown> | undefined> => {
  const result = await pool.query(
    `UPDATE public.device_requests SET approval_status = $2, approved_by = $3, approval_date = CURRENT_DATE, updated_at = CURRENT_TIMESTAMP WHERE request_id = $1 AND is_deleted = FALSE RETURNING *;`,
    [request_id, approval_status, approved_by]
  );
  return result.rows[0];
};

export const deleteDeviceRequest = async (request_id: number, deleted_by: number): Promise<void> => {
  await pool.query('BEGIN');
  try {
    await pool.query(`UPDATE public.device_requests SET is_deleted = TRUE, deleted_at = CURRENT_TIMESTAMP WHERE request_id = $1`, [request_id]);
    await pool.query(
      `INSERT INTO public.device_request_audit_log (request_id, action, previous_value, new_value, performed_by, notes)
       VALUES ($1, 'SOFT_DELETE', 'ACTIVE', 'DELETED', $2, 'Request soft-deleted')`,
      [request_id, deleted_by]
    );
    await pool.query('COMMIT');
  } catch (error) {
    await pool.query('ROLLBACK');
    throw error;
  }
};

export const processSplitFulfillment = async (request_id: number, fulfilled_qty: number, performed_by: number, notes?: string) => {
  await pool.query('BEGIN');
  try {
    const res = await pool.query(`SELECT * FROM public.device_requests WHERE request_id = $1 AND is_deleted = FALSE`, [request_id]);
    const original = res.rows[0];
    if (!original) throw new Error('Request not found or already deleted');

    const total_qty = Number(original.quantity);
    const fulfilled_qty_num = Number(fulfilled_qty);
    if (fulfilled_qty_num <= 0 || fulfilled_qty_num > total_qty) {
      throw new Error(`Fulfilled quantity must be between 1 and ${total_qty}`);
    }

    const remaining_qty = total_qty - fulfilled_qty_num;
    const today = new Date().toISOString().split('T')[0];
    const name = await getUserName(performed_by);

    if (fulfilled_qty_num === total_qty) {
      await pool.query(
        `UPDATE public.device_requests SET approval_status = 'Fulfilled', fulfilled_date = CURRENT_DATE, planned_fulfilled_qty = NULL, updated_at = CURRENT_TIMESTAMP WHERE request_id = $1`,
        [request_id]
      );
      await pool.query(
        `INSERT INTO public.device_request_audit_log (request_id, action, previous_value, new_value, performed_by, notes)
         VALUES ($1, 'STATUS_CHANGE', 'Approved', 'Fulfilled', $2, $3)`,
        [request_id, performed_by || null, `${name} fulfilled the request (Qty ${total_qty})`]
      );
      await pool.query('COMMIT');
      return { fulfilled_request_id: request_id, remaining_request_id: null, message: 'Request fulfilled successfully' };
    }

    await pool.query(`UPDATE public.device_requests SET is_deleted = TRUE, deleted_at = CURRENT_TIMESTAMP WHERE request_id = $1`, [request_id]);

    // FULFILLED child -> keeps the original expense amounts
    const fulfilledRes = await pool.query(
      `INSERT INTO public.device_requests (
        requested_by, department_id, device_type, brand, reason, quantity, priority, request_date,
        approval_status, requested_for, approved_by, approval_date, fulfilled_date,
        original_request_id, split_info, is_deleted, expense_without_vat, expense_with_vat
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'Fulfilled', $9, $10, $11, $12, $13, $14, FALSE, $15, $16)
      RETURNING request_id`,
      [
        original.requested_by, original.department_id, original.device_type, original.brand,
        original.reason, fulfilled_qty_num, original.priority, original.request_date, original.requested_for,
        performed_by || original.approved_by, original.approval_date || today, today,
        request_id, `${fulfilled_qty_num}/${total_qty}`,
        original.expense_without_vat || 0, original.expense_with_vat || 0
      ]
    );
    const fulfilled_request_id = fulfilledRes.rows[0].request_id;

    // REMAINING APPROVED child -> expenses RESET to 0 (new entry)
    const remainingRes = await pool.query(
      `INSERT INTO public.device_requests (
        requested_by, department_id, device_type, brand, reason, quantity, priority, request_date,
        approval_status, requested_for, approved_by, approval_date, original_request_id, split_info, is_deleted,
        expense_without_vat, expense_with_vat, planned_fulfilled_qty
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'Approved', $9, $10, $11, $12, $13, FALSE, 0, 0, NULL)
      RETURNING request_id`,
      [
        original.requested_by, original.department_id, original.device_type, original.brand,
        original.reason, remaining_qty, original.priority, original.request_date, original.requested_for,
        performed_by || original.approved_by, today,
        request_id, `${remaining_qty}/${total_qty}`
      ]
    );
    const remaining_request_id = remainingRes.rows[0].request_id;

    const splitNotes = `${name} split quantity: approved quantity = ${remaining_qty}, fulfilled quantity = ${fulfilled_qty_num}`;
    await pool.query(
      `INSERT INTO public.device_request_audit_log (request_id, action, previous_value, new_value, performed_by, notes)
       VALUES ($1, 'REQUEST_SPLIT', $2, $3, $4, $5)`,
      [request_id, `Qty: ${total_qty}`, splitNotes, performed_by || null, splitNotes]
    );

    await pool.query(
      `INSERT INTO public.device_request_audit_log (request_id, action, previous_value, new_value, performed_by, performed_at, notes)
       SELECT $1, action, previous_value, new_value, performed_by, performed_at, notes
       FROM public.device_request_audit_log WHERE request_id = $2`,
      [fulfilled_request_id, request_id]
    );
    await pool.query(
      `INSERT INTO public.device_request_audit_log (request_id, action, previous_value, new_value, performed_by, performed_at, notes)
       SELECT $1, action, previous_value, new_value, performed_by, performed_at, notes
       FROM public.device_request_audit_log WHERE request_id = $2`,
      [remaining_request_id, request_id]
    );

    await pool.query('COMMIT');
    return { fulfilled_request_id, remaining_request_id, message: 'Request split successfully' };
  } catch (error: any) {
    await pool.query('ROLLBACK');
    console.error("❌ SPLIT FULFILLMENT DB ERROR:", error.message);
    throw new Error(error.message || 'Database error during split');
  }
};

export const getRequestHistory = async (request_id: number) => {
  const result = await pool.query(
    `SELECT a.action, a.previous_value, a.new_value, a.notes, TO_CHAR(a.performed_at, 'YYYY-MM-DD HH24:MI:SS') AS performed_at, u.user_name AS performed_by_name
     FROM public.device_request_audit_log a
     LEFT JOIN public.users u ON u.user_id = a.performed_by
     WHERE a.request_id = $1 ORDER BY a.performed_at DESC`,
    [request_id]
  );
  return result.rows;
};

export const updateDeviceRequestExpense = async (request_id: number, expense_without_vat: number, expense_with_vat: number) => {
  const result = await pool.query(
    `UPDATE public.device_requests SET expense_without_vat = $2, expense_with_vat = $3 WHERE request_id = $1 AND is_deleted = FALSE RETURNING request_id, expense_without_vat, expense_with_vat;`,
    [request_id, expense_without_vat, expense_with_vat]
  );
  return result.rows[0];
};