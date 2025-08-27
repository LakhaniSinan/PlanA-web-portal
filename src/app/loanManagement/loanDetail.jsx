import React, { useState } from "react";
import { Box, Typography, Paper, Tabs, Tab, IconButton } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import DynamicTable from "../../components/dynamicTable";

// Mock data for current loans
const currentLoansData = [
  {
    id: 1,
    totalAmountTaken: "$50,000",
    totalAmountPaid: "$33,336",
    interestRate: "8.5%",
    totalMonths: "12 months",
    startDate: "2024-01-15",
    completionDate: "-"
  },
  {
    id: 2,
    totalAmountTaken: "$75,000",
    totalAmountPaid: "$37,500",
    interestRate: "7.2%",
    totalMonths: "12 months",
    startDate: "2024-02-20",
    completionDate: "-"
  },
  {
    id: 3,
    totalAmountTaken: "$30,000",
    totalAmountPaid: "$7,500",
    interestRate: "9.0%",
    totalMonths: "12 months",
    startDate: "2024-04-05",
    completionDate: "-"
  },
];

// Mock data for previous loans
const previousLoansData = [
  {
    id: 1,
    totalAmountTaken: "$100,000",
    totalAmountPaid: "$100,000",
    interestRate: "6.8%",
    totalMonths: "12 months",
    startDate: "2023-12-10",
    completionDate: "2024-12-10"
  },
  {
    id: 2,
    totalAmountTaken: "$60,000",
    totalAmountPaid: "$60,000",
    interestRate: "7.5%",
    totalMonths: "12 months",
    startDate: "2023-11-15",
    completionDate: "2024-11-15"
  },
];

const LoanDetail = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const loanData = location.state?.loanData;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleBack = () => {
    navigate("/loan-management");
  };

  // Table headers for loan details
  const tableHeaders = [
    { id: "id", title: "ID", align: "center" },
    {
      id: "totalAmountTaken",
      title: "Total Amount Taken ($)",
      align: "center",
    },
    { id: "totalAmountPaid", title: "Total Amount Paid ($)", align: "center" },
    { id: "interestRate", title: "Interest Rate (%)", align: "center" },
    { id: "totalMonths", title: "Total Months", align: "center" },
    { id: "startDate", title: "Start Date", align: "center" },
    { id: "completionDate", title: "Completion Date", align: "center" },
  ];

  // Display rows configuration
  const displayRows = [
    "id",
    "totalAmountTaken",
    "totalAmountPaid",
    "interestRate",
    "totalMonths",
    "startDate",
    "completionDate",
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header with back button */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton onClick={handleBack} sx={{ mr: 2, bgcolor: "#f5f5f5" }}>
          <ArrowLeft size={20} />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: "600" }}>
          Loan Details
        </Typography>
      </Box>

      {/* Tabs */}
      <Paper
        elevation={1}
        sx={{
          borderRadius: "8px",
          mb: 3,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            width: "100%",
            display: "flex",
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: "500",
            },
          }}
        >
          <Tab label="Current Loans" sx={{ width: "50%" }} />
          <Tab label="Previous Loans" sx={{ width: "50%" }} />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      <Paper elevation={1} sx={{ borderRadius: "8px" }}>
        {activeTab === 0 && (
          <Box>
            <Box sx={{ p: 3, borderBottom: "1px solid #f0f0f0" }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "600", color: "#1976d2" }}
              >
                Current Active Loans
              </Typography>
            </Box>
            <DynamicTable
              tableHeader={tableHeaders}
              tableData={currentLoansData}
              displayRows={displayRows}
              showPagination={true}
              isLoading={false}
              showDelete={false}
            />
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            <Box sx={{ p: 3, borderBottom: "1px solid #f0f0f0" }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "600", color: "#388e3c" }}
              >
                Completed Loans
              </Typography>
            </Box>
            <DynamicTable
              tableHeader={tableHeaders}
              tableData={previousLoansData}
              displayRows={displayRows}
              showPagination={true}
              isLoading={false}
              showDelete={false}
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default LoanDetail;
