import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllLoanRequests,
  getUsersByUserId,
  updateLoanStatus,
} from "../../api/Modules/user";
import DynamicTable from "../../components/dynamicTable";

// Updated table headers for API data structure
const tableHeaders1 = [
  { id: "createdAt", title: "Created At", align: "left" },
  { id: "message", title: "Message", align: "left" },
];

// Updated columns to display
const displayRows1 = ["createdAt", "message"];

// Table headers for loan management
const tableHeaders2 = [
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
const displayRows2 = [
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

const Userhistory = () => {
  const { id: UserId } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [loanData, setLoanData] = useState([]);
  const [isLoading, setIsLoading] = useState({
    fetchLoan: false,
    fetchUsers: false,
    updateLoanStatus: false,
  });

  const fetchUsersByUserId = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, fetchUsers: true }));
      const response = await getUsersByUserId(UserId);
      if (response.status === 200 || response.status === 201) {
        setUsersData(response.data.data);
      } else {
        setError(true);
        enqueueSnackbar(response.data.message, {
          variant: "error",
        });
      }
    } catch (error) {
      setError(true);
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, fetchUsers: false }));
    }
  };

  const fetchAllLoanRequest = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, fetchLoan: true }));
      const response = await getAllLoanRequests({ userId: UserId });
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
      setIsLoading((prev) => ({ ...prev, fetchLoan: false }));
    }
  };

  useEffect(() => {
    if (UserId) {
      fetchAllLoanRequest();
      fetchUsersByUserId();
    }
  }, [UserId]);

  const handleLoanStatusChange = async (row, status, index) => {
    try {
      setIsLoading((prev) => ({ ...prev, updateLoanStatus: true }));
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
      setIsLoading((prev) => ({ ...prev, updateLoanStatus: false }));
    }
  };

  const handleView = (row) => {
    navigate(`/loan-detail/${row._id}/user/${row.userId}`);
  };

  if (error) {
    return (
      <Typography variant="body1" sx={{ color: "red" }}>
        Error fetching users
      </Typography>
    );
  }

  return (
    <Box>
      {/* Simple Header */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{ mr: 2, bgcolor: "#f5f5f5" }}
        >
          <ArrowLeft size={20} />
        </IconButton>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "600" }}>
            Users history
          </Typography>
          <Typography variant="body1" sx={{ color: "#666" }}>
            Manage your users history here
          </Typography>
        </Box>
      </Stack>

      {/* Simple Table */}
      <Paper elevation={1} sx={{ borderRadius: "8px" }}>
        <DynamicTable
          tableWidth={1600}
          tableHeader={tableHeaders2}
          tableData={loanData || []}
          displayRows={displayRows2}
          showPagination={true}
          isLoading={isLoading.fetchLoan}
          statusLoading={isLoading.updateLoanStatus}
          onView={handleView}
          handleLoanStatusChange={handleLoanStatusChange}
        />
      </Paper>

      <Paper elevation={1} sx={{ borderRadius: "8px", mt: 3 }}>
        <DynamicTable
          tableHeader={tableHeaders1}
          tableData={usersData?.history || []}
          displayRows={displayRows1}
          showPagination={true}
          isLoading={isLoading.fetchUsers}
        />
      </Paper>
    </Box>
  );
};

export default Userhistory;
