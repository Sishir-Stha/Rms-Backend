-- =====================================================================
-- RMS Device Request: Soft Delete, Partial Fulfillment Split, Audit Log
-- Run this file once to add all required columns and tables
-- Safe to re-run (all statements use IF NOT EXISTS / IF EXISTS)
-- =====================================================================

-- PREREQUISITE COLUMNS (safe no-ops if already present)
ALTER TABLE public.device_requests
  ADD COLUMN IF NOT EXISTS requested_for       VARCHAR(255),
  ADD COLUMN IF NOT EXISTS recommended_date    DATE,
  ADD COLUMN IF NOT EXISTS fulfilled_date      DATE,
  ADD COLUMN IF NOT EXISTS expense_without_vat NUMERIC(10,2) DEFAULT 0.00,
  ADD COLUMN IF NOT EXISTS expense_with_vat    NUMERIC(10,2) DEFAULT 0.00;

-- CLEAN UP OBSOLETE COLUMNS (from earlier iteration)
ALTER TABLE public.device_requests DROP COLUMN IF EXISTS fulfilled_quantity CASCADE;
ALTER TABLE public.device_requests DROP COLUMN IF EXISTS remaining_quantity;

-- SOFT DELETE + SPLIT TRACKING COLUMNS
ALTER TABLE public.device_requests
  ADD COLUMN IF NOT EXISTS is_deleted            BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS deleted_at            TIMESTAMP NULL,
  ADD COLUMN IF NOT EXISTS original_request_id   INT REFERENCES public.device_requests(request_id),
  ADD COLUMN IF NOT EXISTS split_info            VARCHAR(50),
  ADD COLUMN IF NOT EXISTS planned_fulfilled_qty INT NULL;

UPDATE public.device_requests SET is_deleted = FALSE WHERE is_deleted IS NULL;

-- WORKFLOW STATUS CONSTRAINT
ALTER TABLE public.device_requests DROP CONSTRAINT IF EXISTS dr_status_check;
ALTER TABLE public.device_requests ADD CONSTRAINT dr_status_check CHECK (
  approval_status IN ('Requested', 'Pending', 'Approved', 'Rejected', 'Fulfilled')
);

-- AUDIT LOG TABLE (stores all changes, splits, deletes)
CREATE TABLE IF NOT EXISTS public.device_request_audit_log (
  log_id         SERIAL PRIMARY KEY,
  request_id     INT NOT NULL REFERENCES public.device_requests(request_id) ON DELETE CASCADE,
  action         VARCHAR(50) NOT NULL,
  previous_value TEXT,
  new_value      TEXT,
  performed_by   INT REFERENCES public.users(user_id),
  performed_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  notes          TEXT
);

CREATE INDEX IF NOT EXISTS idx_audit_log_request_id
  ON public.device_request_audit_log(request_id);

-- OPTIONAL CLEANUP (uncomment if you want to remove unused experimental tables)
-- DROP TABLE IF EXISTS public.device_request_history;
-- DROP TABLE IF EXISTS public.device_request_fulfillments;

-- =====================================================================
-- VERIFICATION QUERIES (run after migration to confirm)
-- =====================================================================
-- SELECT column_name FROM information_schema.columns
-- WHERE table_schema='public' AND table_name='device_requests'
--   AND column_name IN ('is_deleted','deleted_at','original_request_id','split_info','planned_fulfilled_qty');

-- SELECT to_regclass('public.device_request_audit_log');

-- =====================================================================
-- OPERATIONAL QUERIES (to find deleted/split entries in DBeaver)
-- =====================================================================
-- All soft-deleted entries:
-- SELECT * FROM public.device_requests WHERE is_deleted = TRUE ORDER BY request_id DESC;

-- Original + split children:
-- SELECT o.request_id AS original_id, o.quantity AS original_qty, o.split_info,
--        f.request_id AS fulfilled_id,  f.quantity AS fulfilled_qty,
--        r.request_id AS remaining_id,  r.quantity AS remaining_qty,
--        TO_CHAR(o.updated_at,'YYYY-MM-DD HH24:MI:SS') AS deleted_at
-- FROM public.device_requests o
-- LEFT JOIN public.device_requests f ON f.original_request_id = o.request_id AND f.approval_status='Fulfilled'
-- LEFT JOIN public.device_requests r ON r.original_request_id = o.request_id AND r.approval_status='Approved'
-- WHERE o.is_deleted = TRUE
-- ORDER BY o.request_id DESC;