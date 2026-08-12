BEGIN;

ALTER TABLE public.device_requests 
DROP CONSTRAINT IF EXISTS dr_status_check;

ALTER TABLE public.device_requests 
ADD CONSTRAINT dr_status_check 
CHECK (
    ((approval_status)::text = ANY (
        (ARRAY[
            'Requested'::character varying, 
            'Pending'::character varying, 
            'Approved'::character varying, 
            'Rejected'::character varying,
            'Fulfilled'::character varying
        ])::text[]
    ))
);

COMMIT;