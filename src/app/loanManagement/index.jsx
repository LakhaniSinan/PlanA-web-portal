import { Box, Typography, Paper } from "@mui/material";
import DynamicTable from "../../components/dynamicTable";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoanManagement = () => {
  const navigate = useNavigate();
  
  // Loan data for 5 users with proper structure
  const [loanData, setLoanData] = useState([
    {
      id: 1,
      userInfo: {
        name: "John Smith",
        email: "john.smith@example.com",
        avatar: "JS"
      },
      loanAmount: 50000,
      totalMonths: 12,
      paidMonths: 8,
      remainingMonths: 4,
      monthlyPayment: 4167,
      totalPaid: 33336,
      remainingAmount: 16664,
      status: "Active",
      startDate: "2024-01-15",
      nextPaymentDate: "2024-10-15"
    },
    {
      id: 2,
      userInfo: {
        name: "Emily Johnson",
        email: "emily.johnson@example.com",
        avatar: "EJ"
      },
      loanAmount: 75000,
      totalMonths: 12,
      paidMonths: 6,
      remainingMonths: 6,
      monthlyPayment: 6250,
      totalPaid: 37500,
      remainingAmount: 37500,
      status: "Active",
      startDate: "2024-02-20",
      nextPaymentDate: "2024-09-20"
    },
    {
      id: 3,
      userInfo: {
        name: "Michael Brown",
        email: "michael.brown@example.com",
        avatar: "MB"
      },
      loanAmount: 100000,
      totalMonths: 12,
      paidMonths: 12,
      remainingMonths: 0,
      monthlyPayment: 8333,
      totalPaid: 100000,
      remainingAmount: 0,
      status: "Completed",
      startDate: "2023-12-10",
      nextPaymentDate: "N/A"
    },
    {
      id: 4,
      userInfo: {
        name: "Sophia Davis",
        email: "sophia.davis@example.com",
        avatar: "SD"
      },
      loanAmount: 30000,
      totalMonths: 12,
      paidMonths: 3,
      remainingMonths: 9,
      monthlyPayment: 2500,
      totalPaid: 7500,
      remainingAmount: 22500,
      status: "Active",
      startDate: "2024-04-05",
      nextPaymentDate: "2024-08-05"
    },
    {
      id: 5,
      userInfo: {
        name: "James Wilson",
        email: "james.wilson@example.com",
        avatar: "JW"
      },
      loanAmount: 60000,
      totalMonths: 12,
      paidMonths: 9,
      remainingMonths: 3,
      monthlyPayment: 5000,
      totalPaid: 45000,
      remainingAmount: 15000,
      status: "Active",
      startDate: "2024-01-20",
      nextPaymentDate: "2024-11-20"
    }
  ]);

  // Table headers for loan management
  const tableHeaders = [
    { id: "id", title: "ID", align: "center" },
    { id: "userInfo", title: "User Info", align: "left" },
    { id: "loanAmount", title: "Loan Amount", align: "center" },
    { id: "totalMonths", title: "Total Months", align: "center" },
    { id: "paidMonths", title: "Paid Months", align: "center" },
    { id: "remainingMonths", title: "Remaining Months", align: "center" },
    // { id: "monthlyPayment", title: "Monthly Payment", align: "center" },
    // { id: "totalPaid", title: "Total Paid", align: "center" },
    // { id: "remainingAmount", title: "Remaining Amount", align: "center" },
    // { id: "status", title: "Status", align: "center" },
    // { id: "nextPaymentDate", title: "Next Payment", align: "center" },
    { id: "actionsLoan", title: "Actions", align: "center" }
  ];

  // Display rows configuration
  const displayRows = [
    "id",
    "userInfo",
    "loanAmount",
    "totalMonths",
    "paidMonths",
    "remainingMonths",
    // "monthlyPayment",
    // "totalPaid",
    // "remainingAmount",
    // "status",
    // "nextPaymentDate",
    "actionsLoan"
  ];

  // Action handlers
  const handleView = (loan) => {
    navigate('/loan-detail', { state: { loanData: loan } });
  };

  const handleEdit = (loan) => {
    console.log("Edit loan:", loan);
  };

  const handleDelete = (loan) => {
    console.log("Delete loan:", loan);
  };

  // Status change handler
  const handleStatusChange = (loanId, newStatus) => {
    setLoanData((prevData) =>
      prevData.map((loan) =>
        loan.id === loanId ? { ...loan, status: newStatus } : loan
      )
    );
    console.log(`Loan ${loanId} status changed to: ${newStatus}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "600", mb: 1 }}>
          Loan Management
        </Typography>
        <Typography variant="body1" sx={{ color: "#666" }}>
          Manage loan applications and track payment progress
        </Typography>
      </Box>

      {/* Loan Table */}
      <Paper elevation={1} sx={{ borderRadius: "8px" }}>
        <DynamicTable
          tableHeader={tableHeaders}
          tableData={loanData}
          displayRows={displayRows}
          showPagination={true}
          isLoading={false}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewClick={handleView}
          showDelete={true}
          onStatusChange={handleStatusChange}
        />
      </Paper>
    </Box>
  );
};

export default LoanManagement;
