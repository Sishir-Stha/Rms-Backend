
-- 1. Add expense columns to device_requests
ALTER TABLE public.device_requests
ADD COLUMN IF NOT EXISTS expense_without_vat NUMERIC(10, 2) DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS expense_with_vat NUMERIC(10, 2) DEFAULT 0.00;

-- 2. Recreate get_repairs function with reported_date
DROP FUNCTION IF EXISTS public.get_repairs(text, text);

CREATE OR REPLACE FUNCTION public.get_repairs(p_status text DEFAULT NULL::text, p_device_name text DEFAULT NULL::text)
 RETURNS TABLE(
     repair_id integer,
     device_name text,
     category_name text,
     serial_no text,
     department_name text,
     issue text,
     notes text,
     user_name text,
     vendor_name text,
     status text,
     priority text,
     expected_completion timestamp without time zone,
     resolved_date timestamp without time zone,
     reported_date timestamp without time zone,
     costs numeric
 )
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        r.repair_id,
        r.device_name::TEXT,
        dc.category_name::TEXT,
        r.serial_no::TEXT,
        d.department_name::TEXT,
        r.issue::TEXT,
        r.notes::TEXT,
        u.user_name::TEXT,
        v.vendor_name::TEXT,
        r.status::TEXT,
        r.priority::TEXT,
        r.expected_completion::TIMESTAMP,
        r.resolved_date::TIMESTAMP,
        r.reported_date::TIMESTAMP,
        r.costs
    FROM repairs r
    INNER JOIN device_categories dc ON r.category_id = dc.category_id
    INNER JOIN vendors v ON r.vendor_id = v.vendor_id
    INNER JOIN departments d ON r.department_id = d.department_id
    INNER JOIN users u ON u.user_id = r.reported_by
    WHERE
        (p_status IS NULL OR p_status = '' OR r.status = p_status)
    AND
        (p_device_name IS NULL OR p_device_name = '' OR r.device_name like p_device_name);
END;
$function$;

-- 3. Fill empty reported_date on old repairs
UPDATE public.repairs
SET reported_date = COALESCE(created_at::date, CURRENT_DATE)
WHERE reported_date IS NULL;

-- 4. Fill empty resolved_date on Resolved/Closed repairs
UPDATE public.repairs
SET resolved_date = COALESCE(updated_at::date, reported_date)
WHERE status IN ('Resolved', 'Closed')
  AND resolved_date IS NULL;

-- 5. Performance indexes (optional)
CREATE INDEX IF NOT EXISTS idx_repairs_status_date
ON public.repairs(status, resolved_date);

CREATE INDEX IF NOT EXISTS idx_device_requests_status_date
ON public.device_requests(approval_status, request_date);