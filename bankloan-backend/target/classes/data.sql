-- =============================================
-- Test Data for Loan Application Workflow
-- =============================================

-- Clear existing data (be careful in production!)
DELETE FROM notifications;
DELETE FROM loan_applications;
DELETE FROM users;

-- Reset sequences if using PostgreSQL
-- ALTER SEQUENCE users_id_seq RESTART WITH 1;
-- ALTER SEQUENCE loan_applications_id_seq RESTART WITH 1;
-- ALTER SEQUENCE notifications_id_seq RESTART WITH 1;

-- =============================================
-- 1. Create Test Users
-- =============================================
INSERT INTO users (email, password_hash, role, full_name, created_at) VALUES 
-- Password for all users: Test@123 (hashed with BCrypt)
('customer1@example.com', '$2a$10$XptfskLsT1l/bRTLRiiCgejHqOpgXFreUnNUa35gJdCr2v2QbVFzu', 'CUSTOMER', 'John Doe', '2024-01-01 10:00:00'),
('maker1@example.com', '$2a$10$XptfskLsT1l/bRTLRiiCgejHqOpgXFreUnNUa35gJdCr2v2QbVFzu', 'MAKER', 'Alice Johnson', '2024-01-01 10:00:00'),
('checker1@example.com', '$2a$10$XptfskLsT1l/bRTLRiiCgejHqOpgXFreUnNUa35gJdCr2v2QbVFzu', 'CHECKER', 'Robert Smith', '2024-01-01 10:00:00');

-- =============================================
-- 2. Create Test Loan Applications
-- =============================================
-- Status values: SUBMITTED, UNDER_REVIEW_MAKER, REJECTED_BY_MAKER, APPROVED_BY_MAKER, UNDER_REVIEW_CHECKER, REJECTED_BY_CHECKER, APPROVED_FINAL

-- Application 1: Newly submitted by customer (for maker to review)
INSERT INTO loan_applications (
    application_number, customer_id, full_name, phone, email, address, date_of_birth, age, 
    marital_status, gender, aadhar_number, pan_number, occupation_type, employer, 
    designation, loan_type, amount, tenure_months, annual_interest_rate, status, 
    created_at, updated_at
) VALUES (
    'APP-2024-001', 1, 'John Doe', '9876543210', 'customer1@example.com', '123 Main St, Bangalore, KA', 
    '1990-05-15', 34, 'Married', 'Male', '1234 5678 9012', 'ABCDE1234F', 
    'SALARIED', 'Tech Solutions Inc', 'Senior Developer', 'PERSONAL_LOAN', 
    500000, 36, 12.5, 'SUBMITTED', 
    '2024-03-20 14:30:00', '2024-03-20 14:30:00'
);

-- Application 2: Approved by maker (for checker to review)
INSERT INTO loan_applications (
    application_number, customer_id, full_name, phone, email, address, date_of_birth, age, 
    marital_status, gender, aadhar_number, pan_number, occupation_type, employer, 
    designation, loan_type, amount, tenure_months, annual_interest_rate, status, 
    maker_remarks, maker_id, maker_reviewed_at,
    created_at, updated_at
) VALUES (
    'APP-2024-002', 1, 'John Doe', '9876543210', 'customer1@example.com', '123 Main St, Bangalore, KA', 
    '1990-05-15', 34, 'Married', 'Male', '1234 5678 9012', 'ABCDE1234F', 
    'SALARIED', 'Tech Solutions Inc', 'Senior Developer', 'HOME_LOAN', 
    5000000, 240, 8.5, 'APPROVED_BY_MAKER',
    'Documents verified. Income documents are in order. Recommended for approval.', 2, '2024-03-21 11:15:00',
    '2024-03-19 10:15:00', '2024-03-21 11:15:00'
);

-- Application 3: Rejected by maker (for customer to see)
INSERT INTO loan_applications (
    application_number, customer_id, full_name, phone, email, address, date_of_birth, age, 
    marital_status, gender, aadhar_number, pan_number, occupation_type, employer, 
    designation, loan_type, amount, tenure_months, annual_interest_rate, status, 
    maker_remarks, rejection_reason, rejected_by, rejection_date,
    created_at, updated_at
) VALUES (
    'APP-2024-003', 1, 'John Doe', '9876543210', 'customer1@example.com', '123 Main St, Bangalore, KA', 
    '1990-05-15', 34, 'Married', 'Male', '1234 5678 9012', 'ABCDE1234F', 
    'SALARIED', 'Tech Solutions Inc', 'Senior Developer', 'PERSONAL_LOAN', 
    1000000, 60, 14.0, 'REJECTED_BY_MAKER',
    'Insufficient income documentation and high debt-to-income ratio.',
    'Insufficient income documentation and high debt-to-income ratio.',
    'maker1@example.com', '2024-03-18',
    '2024-03-17 09:20:00', '2024-03-18 16:45:00'
);

-- =============================================
-- 3. Create Test Notifications
-- =============================================
-- For Customer 1 (John Doe)
INSERT INTO notifications (user_id, type, message, read_flag, created_at) VALUES
(1, 'APPLICATION_SUBMITTED', 'Your loan application APP-2024-001 has been submitted successfully.', false, '2024-03-20 14:30:00'),
(1, 'APPLICATION_SUBMITTED', 'Your loan application APP-2024-002 has been submitted successfully.', true, '2024-03-19 10:15:00'),
(1, 'APPLICATION_REJECTED', 'Your loan application APP-2024-003 has been rejected. Reason: Insufficient income documentation.', true, '2024-03-18 16:45:00');

-- For Maker 1 (Alice Johnson)
INSERT INTO notifications (user_id, type, message, read_flag, created_at) VALUES
(2, 'WORK_ITEM_ASSIGNED', 'New loan application APP-2024-001 requires your review.', false, '2024-03-20 14:30:00'),
(2, 'WORK_ITEM_ASSIGNED', 'New loan application APP-2024-002 requires your review.', true, '2024-03-19 10:15:00');

-- For Checker 1 (Robert Smith)
INSERT INTO notifications (user_id, type, message, read_flag, created_at) VALUES
(3, 'WORK_ITEM_ASSIGNED', 'New loan application APP-2024-002 has been approved by maker and requires your review.', false, '2024-03-21 11:15:00');

-- =============================================
-- 4. Test Data for Different Scenarios
-- =============================================
-- Add more test data as needed for different scenarios

-- Example of a fully approved loan
INSERT INTO loan_applications (
    application_number, customer_id, full_name, phone, email, address, date_of_birth, age, 
    marital_status, gender, aadhar_number, pan_number, occupation_type, employer, 
    designation, loan_type, amount, tenure_months, annual_interest_rate, status, 
    maker_remarks, checker_remarks, maker_id, approved_by, approval_date,
    created_at, updated_at
) VALUES (
    'APP-2024-100', 1, 'John Doe', '9876543210', 'customer1@example.com', '123 Main St, Bangalore, KA', 
    '1990-05-15', 34, 'Married', 'Male', '1234 5678 9012', 'ABCDE1234F', 
    'SALARIED', 'Tech Solutions Inc', 'Senior Developer', 'CAR_LOAN', 
    1500000, 60, 9.5, 'APPROVED_FINAL',
    'All documents verified. Income and credit score are good.',
    'Application approved after thorough verification.',
    2, 'checker1@example.com', '2024-03-10',
    '2024-03-05 11:30:00', '2024-03-10 15:20:00'
);

-- Add notification for approved loan
INSERT INTO notifications (user_id, type, message, read_flag, created_at) VALUES
(1, 'APPLICATION_APPROVED', 'Congratulations! Your loan application APP-2024-100 has been approved. Loan amount: ₹1,500,000 will be disbursed shortly.', true, '2024-03-10 15:20:00');

-- =============================================
-- 5. Additional Test Data for Different Loan Types
-- =============================================
-- Home Loan Application
INSERT INTO loan_applications (
    application_number, customer_id, full_name, phone, email, address, date_of_birth, age, 
    marital_status, gender, aadhar_number, pan_number, occupation_type, employer, 
    designation, loan_type, amount, tenure_months, annual_interest_rate, status, 
    property_address, property_value, property_document, 
    created_at, updated_at
) VALUES (
    'APP-2024-101', 1, 'John Doe', '9876543210', 'customer1@example.com', '123 Main St, Bangalore, KA', 
    '1990-05-15', 34, 'Married', 'Male', '1234 5678 9012', 'ABCDE1234F', 
    'SALARIED', 'Tech Solutions Inc', 'Senior Developer', 'HOME_LOAN', 
    7500000, 240, 8.25, 'SUBMITTED',
    '456 Oak Avenue, Bangalore, KA', 10000000, 'doc_property_101.pdf',
    '2024-03-22 09:15:00', '2024-03-22 09:15:00'
);

-- Add notification for new home loan application
INSERT INTO notifications (user_id, type, message, read_flag, created_at) VALUES
(1, 'APPLICATION_SUBMITTED', 'Your home loan application APP-2024-101 has been submitted successfully.', false, '2024-03-22 09:15:00'),
(2, 'WORK_ITEM_ASSIGNED', 'New home loan application APP-2024-101 requires your review.', false, '2024-03-22 09:15:00');

-- =============================================
-- End of Test Data
-- =============================================
