export const teacherMajorMajorOptions = [
    { label: 'Civil engineering', value: 'Civil engineering' },
    { label: 'Mechanical engineering ', value: 'Mechanical engineering ' },
    { label: 'Computer engineering', value: 'Computer engineering' },
    { label: 'Electrical engineering ', value: 'Electrical engineering ' },
    { label: 'Mechatronics engineering', value: 'Mechatronics engineering' },

    { label: 'Accounting', value: 'Accounting' },
    { label: 'Marketing', value: 'Marketing' },
    { label: 'Statistics', value: 'Statistics' },
    { label: 'International Business', value: 'International Business' },
    { label: 'Finance', value: 'Finance' },
    { label: 'Business Management and Administration', value: 'Business Management and Administration' },
];

export const courseStatus = [
    { label: "Open", value: "Open" },
    { label: "Closed", value: "Closed" }
];

export const currencyOptions = [
    { label: "L.L", value: "L.L" },
    { label: "$", value: "$" }
];

export const roomStatusOptions = [
    { Available: "Available", label: "Available", value: "Available", "roomHoldUntil": false },
    { ClosedPermanently: "Closed Permanently", label: "Closed Permanently", value: "Closed Permanently", "roomHoldUntil": false },
    { Closedtemporarily: "Closed temporarily", label: "Closed temporarily", value: "Closed temporarily", "roomHoldUntil": true },
    { ClosedForMaintenance: "Closed For Maintenance", label: "Closed For Maintenance", value: "For Maintenance", "roomHoldUntil": true },
];

export const availableCourses = [
    { cours_Code: 'NFP121', cours_Name: 'Java 1', cours_Credit: 6, cours_Hours: 60, cours_Price: 240000, cours_Semestre: '1', cours_Status: 'Open', currency: '$' },
    { cours_Code: 'NFP136', cours_Name: 'Operating System', cours_Credit: 4, cours_Hours: 40, cours_Price: 200000, cours_Semestre: '2', cours_Status: 'Closed', currency: '$' },
    { cours_Code: 'NFP122', cours_Name: 'Java 3', cours_Credit: 8, cours_Hours: 70, cours_Price: 360000, cours_Semestre: '1', cours_Status: 'Open', currency: 'L.L' },
    { cours_Code: 'MFP140', cours_Name: 'Analyse Et Mathematique', cours_Credit: 6, cours_Hours: 60, cours_Price: 200, cours_Semestre: '1', cours_Status: 'Closed', currency: 'L.L' },
];






