// src/data/mockData.js
export const staticApplications = [
  {
    id: 'LA2025001',
    customerName: 'Rajesh Kumar Sharma',
    email: 'rajesh.sharma@email.com',
    phone: '+91 9876543210',
    age: 40,
    submittedDate: '2025-10-10T16:00:00',
    loanAmount: 5000000,
    tenure: 240,
    loanType: 'Home Loan',
    purpose: 'Purchase of 3BHK apartment in Bangalore',
    cibilScore: 785,
    cibilLastUpdated: '2025-10-01',
    status: 'Reading Review',
    
    // Personal Details
    personalDetails: {
      firstName: 'Rajesh',
      middleName: 'Kumar',
      lastName: 'Sharma',
      dateOfBirth: '1985-05-15',
      gender: 'Male',
      maritalStatus: 'Married',
      aadhaarNumber: '1234-5678-9012',
      panNumber: 'ABCDE1234F',
      passportNumber: 'A1234567',
      fatherName: 'Mohan Sharma',
      education: 'MBA',
      currentAddress: '123, MG Road, Bangalore, Karnataka - 560001',
      permanentAddress: '123, MG Road, Bangalore, Karnataka - 560001'
    },
    
    // Personal Documents
    personalDocuments: [
      { name: 'Aadhaar Card', verified: true, file: 'aadhaar.pdf', type: 'identity' },
      { name: 'PAN Card', verified: true, file: 'pan_card.pdf', type: 'identity' },
      { name: 'Passport', verified: true, file: 'passport.pdf', type: 'identity' },
      { name: 'Photograph', verified: true, file: 'photo.jpg', type: 'photo' },
      { name: 'Address Proof - Current', verified: true, file: 'current_address.pdf', type: 'address' }
    ],
    
    // Employment Details
    employmentDetails: {
      occupationType: 'Salaried',
      companyName: 'Tech Solutions Pvt Ltd',
      designation: 'Senior Manager',
      workExperience: 15,
      officeAddress: '456, Electronic City, Bangalore - 560100',
      monthlyIncome: 180000,
      employeeId: 'TS789456',
      workEmail: 'rajesh.sharma@techsolutions.com',
      department: 'IT',
      employmentType: 'Permanent',
      joiningDate: '2018-06-15',
      industry: 'Information Technology',
      salaryAccount: 'HDFC Bank',
      basicSalary: 120000,
      houseRentAllowance: 36000,
      specialAllowance: 24000
    },
    
    // Employment Documents
    employmentDocuments: [
      { name: 'Salary Slip - Oct 2025', verified: true, file: 'salary_oct_2025.pdf', type: 'salary' },
      { name: 'Salary Slip - Sep 2025', verified: true, file: 'salary_sep_2025.pdf', type: 'salary' },
      { name: 'ITR 2024-25', verified: true, file: 'itr_2024.pdf', type: 'itr' },
      { name: 'Bank Statements - 6 Months', verified: true, file: 'bank_statements.pdf', type: 'bank' }
    ],
    
    // Loan Details
    loanDetails: {
      propertyValue: 8000000,
      downPayment: 3000000,
      interestRate: 8.5,
      emi: 43000,
      processingFee: 15000,
      insuranceRequired: true,
      propertyType: 'Apartment',
      builderName: 'Prestige Group',
      projectName: 'Prestige Lakeside Habitat',
      propertyLocation: 'Whitefield, Bangalore',
      propertyArea: '1200 sq.ft.',
      ownershipType: 'Freehold'
    },
    
    // Loan Documents
    loanDocuments: [
      { name: 'Sale Agreement', verified: false, file: 'sale_agreement.pdf', type: 'property' },
      { name: 'EC Certificate', verified: false, file: 'ec_certificate.pdf', type: 'property' },
      { name: 'Property Tax Receipt', verified: true, file: 'property_tax.pdf', type: 'property' }
    ],
    
    // Existing Loans
    existingLoans: [
      {
        type: 'Car Loan',
        lender: 'HDFC Bank',
        outstandingAmount: 350000,
        emi: 12500,
        tenureRemaining: 28,
        interestRate: 9.2,
        startDate: '2023-01-15'
      }
    ],
    
    // References
    references: [
      {
        name: 'Ravi Mehta',
        relationship: 'Friend',
        phone: '+91 9876543211',
        address: '789, Koramangala, Bangalore, Karnataka - 560034',
        email: 'ravi.mehta@email.com',
        
      },
      {
        name: 'Sunita Patel',
        relationship: 'Colleague',
        phone: '+91 9876543212',
        address: '456, HSR Layout, Bangalore, Karnataka - 560102',
        email: 'sunita.patel@email.com',
        
      }
    ]
  },
  {
    id: 'LA2025002',
    customerName: 'Priya Menon',
    email: 'priya.menon@email.com',
    phone: '+91 9876543211',
    age: 35,
    submittedDate: '2025-10-11T19:50:00',
    loanAmount: 1200000,
    tenure: 60,
    loanType: 'Vehicle Loan',
    purpose: 'Purchase of Honda City Car',
    cibilScore: 720,
    cibilLastUpdated: '2025-09-28',
    status: 'With Checker',
    
    personalDetails: {
      firstName: 'Priya',
      middleName: '',
      lastName: 'Menon',
      dateOfBirth: '1990-08-22',
      gender: 'Female',
      maritalStatus: 'Single',
      aadhaarNumber: '2345-6789-0123',
      panNumber: 'FGHIJ5678K',
      passportNumber: 'B7654321',
      fatherName: 'Ravi Menon',
      education: 'B.Tech',
      currentAddress: '456, Koramangala, Bangalore, Karnataka - 560034',
      permanentAddress: '123, Chennai, Tamil Nadu - 600001'
    },
    
    personalDocuments: [
      { name: 'Aadhaar Card', verified: true, file: 'aadhaar.pdf', type: 'identity' },
      { name: 'PAN Card', verified: true, file: 'pan_card.pdf', type: 'identity' },
      { name: 'Photograph', verified: true, file: 'photo.jpg', type: 'photo' }
    ],
    
    employmentDetails: {
      occupationType: 'Salaried',
      companyName: 'Global Software Inc',
      designation: 'Team Lead',
      workExperience: 8,
      officeAddress: '789, Whitefield, Bangalore - 560066',
      monthlyIncome: 120000,
      employeeId: 'GSI123456',
      workEmail: 'priya.menon@globalsoftware.com',
      department: 'Development',
      employmentType: 'Permanent',
      joiningDate: '2017-03-10',
      industry: 'Information Technology',
      salaryAccount: 'ICICI Bank',
      basicSalary: 80000,
      houseRentAllowance: 24000,
      specialAllowance: 16000
    },
    
    employmentDocuments: [
      { name: 'Salary Slip - Oct 2025', verified: true, file: 'salary_oct_2025.pdf', type: 'salary' },
      { name: 'ITR 2024-25', verified: true, file: 'itr_2024.pdf', type: 'itr' }
    ],
    
    loanDetails: {
      vehicleType: 'Honda City',
      dealerName: 'Honda Cars Bangalore',
      invoiceAmount: 1350000,
      downPayment: 150000,
      interestRate: 9.2,
      emi: 25000,
      processingFee: 5000,
      insuranceRequired: true,
      vehicleModel: 'Honda City ZX CVT',
      registrationYear: '2025'
    },
    
    loanDocuments: [
      { name: 'Dealer Invoice', verified: false, file: 'dealer_invoice.pdf', type: 'vehicle' },
      { name: 'Quotation', verified: true, file: 'quotation.pdf', type: 'vehicle' }
    ],
    
    existingLoans: [],
    
    references: [
      {
        name: 'Arun Kumar',
        relationship: 'Friend',
        phone: '+91 9876543213',
        address: '555, HSR Layout, Bangalore, Karnataka - 560102',
        email: 'arun.kumar@email.com',
        occupation: 'Business Analyst',
        company: 'Deloitte',
        yearsKnown: 6,
        phoneVerified: true,
        emailVerified: true,
        addressVerified: true,
        fullyVerified: true
      }
    ]
  },
  {
    id: 'LA2025003',
    customerName: 'Amit Verma',
    email: 'amit.verma@email.com',
    phone: '+91 9876543212',
    age: 28,
    submittedDate: '2025-10-09T14:45:00',
    loanAmount: 500000,
    tenure: 36,
    loanType: 'Personal Loan',
    purpose: 'Home Renovation',
    cibilScore: 690,
    cibilLastUpdated: '2025-09-25',
    status: 'Approved',
    
    personalDetails: {
      firstName: 'Amit',
      middleName: '',
      lastName: 'Verma',
      dateOfBirth: '1997-03-10',
      gender: 'Male',
      maritalStatus: 'Married',
      aadhaarNumber: '3456-7890-1234',
      panNumber: 'KLMNO9012P',
      fatherName: 'Sanjay Verma',
      education: 'B.Com',
      currentAddress: '789, Indiranagar, Bangalore, Karnataka - 560038',
      permanentAddress: '789, Indiranagar, Bangalore, Karnataka - 560038'
    },
    
    personalDocuments: [
      { name: 'Aadhaar Card', verified: true, file: 'aadhaar.pdf', type: 'identity' },
      { name: 'PAN Card', verified: true, file: 'pan_card.pdf', type: 'identity' }
    ],
    
    employmentDetails: {
      occupationType: 'Self Employed',
      businessName: 'Verma Traders',
      designation: 'Proprietor',
      workExperience: 5,
      officeAddress: '222, Commercial Street, Bangalore - 560001',
      monthlyIncome: 80000,
      businessRegistration: 'Proprietorship',
      gstNumber: '29ABCDE1234F1Z5',
      annualTurnover: 1200000,
      businessType: 'Retail Trading',
      businessAge: 5
    },
    
    employmentDocuments: [
      { name: 'ITR 2024-25', verified: true, file: 'itr_2024.pdf', type: 'itr' },
      { name: 'Bank Statements', verified: true, file: 'bank_statements.pdf', type: 'bank' },
      { name: 'GST Certificate', verified: true, file: 'gst_certificate.pdf', type: 'gst' }
    ],
    
    loanDetails: {
      purpose: 'Home Renovation',
      interestRate: 12.5,
      emi: 16700,
      processingFee: 10000,
      endUse: 'Home renovation and furniture purchase',
      repaymentSource: 'Business income'
    },
    
    loanDocuments: [
      { name: 'Loan Application', verified: true, file: 'loan_application.pdf', type: 'application' }
    ],
    
    existingLoans: [],
    
    references: [
      {
        name: 'Neha Singh',
        relationship: 'Friend',
        phone: '+91 9876543214',
        address: '333, JP Nagar, Bangalore, Karnataka - 560078',
        email: 'neha.singh@email.com',
        occupation: 'Teacher',
        company: 'Delhi Public School',
        yearsKnown: 4,
        phoneVerified: true,
        emailVerified: false,
        addressVerified: true,
        fullyVerified: false
      }
    ]
  }
];

export const staticNotifications = [
  { 
    id: 1, 
    message: 'New application LA2025001 submitted by Rajesh Kumar Sharma', 
    type: 'info', 
    read: false, 
    timestamp: '2025-10-13T10:30:00' 
  },
  { 
    id: 2, 
    message: 'Application LA2025002 sent to checker for review', 
    type: 'info', 
    read: false, 
    timestamp: '2025-10-13T09:15:00' 
  },
  { 
    id: 3, 
    message: 'Application LA2024008 approved by checker', 
    type: 'success', 
    read: true, 
    timestamp: '2025-10-12T16:45:00' 
  },
  { 
    id: 4, 
    message: 'Document verification required for LA2025001', 
    type: 'warning', 
    read: false, 
    timestamp: '2025-10-12T14:20:00' 
  }
];