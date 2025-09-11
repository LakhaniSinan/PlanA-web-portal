import { Box, Typography, Paper } from "@mui/material";
import DynamicTable from "../../components/dynamicTable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllLoanRequests, updateLoanStatus } from "../../api/Modules/user";
import { useSnackbar } from "notistack";



// Table headers for loan management
const tableHeaders = [
  { id: "createdAt", title: "Created At", align: "left" },
  { id: "userInfo", title: "User", align: "left" },
  { id: "loanAmount", title: "Loan Amount", align: "left" },
  { id: "interestRate", title: "Interest Rate", align: "left" },
  { id: "totalPayableAmount", title: "Payable Amount", align: "left" },
  { id: "totalMonths", title: "Tenure", align: "left" },
  { id: "paidAmount", title: "Paid Amount", align: "left" },
  { id: "remainingBalance", title: "Remaining Balance", align: "left" },
  { id: "status", title: "Status", align: "left" },
  { id: "actions", title: "Actions", align: "left" },
];

// Display rows configuration
const displayRows = [
  "createdAt",
  "userInfo",
  "requestedAmount",
  "interestRate",
  "totalPayableAmount",
  "loan_tenure",
  "totalPaidAmount",
  "remainingBalance",
  "loan_status",
  "actions",
];

const LoanManagement = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [loanData, setLoanData] = useState([]);
  const [statusLoading, setStatusLoading] = useState(false);

  console.log("loanData", loanData);

  const fetchAllLoanRequest = async () => {
    try {
      setIsLoading(true);
      const response = await getAllLoanRequests({});
      if ([200, 201].includes(response?.status)) {
        setLoanData(response.data.data.loanRequests);
      } else {
        enqueueSnackbar(response?.data?.message, {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllLoanRequest();
  }, []);

  const handleLoanStatusChange = async (row, status, index) => {
    try {
      setStatusLoading(true);
      const response = await updateLoanStatus(row._id, { status });
      if ([200, 201].includes(response?.status)) {
        fetchAllLoanRequest();
        enqueueSnackbar(response?.data?.message, {
          variant: "success",
        });
      } else {
        enqueueSnackbar(response?.data?.message, {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || "Something went wrong",
        {
          variant: "error",
        }
      );
    } finally {
      setStatusLoading(false);
    }
  };

  const handleView = (row) => {
    console.log("row", row);
    navigate(`/loan-detail/${row._id}/user/${row.userId}`);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "600" }}>
          Loan Management
        </Typography>
        <Typography variant="body1" sx={{ color: "#666" }}>
          Manage loan applications and track payment progress
        </Typography>
      </Box>

      {/* Loan Table */}
      <Paper elevation={1} sx={{ borderRadius: "8px" }}>
        <DynamicTable
          tableWidth={1600}
          tableHeader={tableHeaders}
          tableData={loanData}
          displayRows={displayRows}
          isLoading={isLoading}
          showPagination={true}
          handleLoanStatusChange={handleLoanStatusChange}
          statusLoading={statusLoading}
          onView={handleView}

          // onEdit={handleEdit}
          // onDelete={handleDelete}
          // onViewClick={handleView}
          // showDelete={true}
          // onStatusChange={handleStatusChange}
        />
      </Paper>
    </Box>
  );
};

export default LoanManagement;
