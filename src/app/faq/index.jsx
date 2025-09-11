import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CustomButton from "../../components/customButton";
import { getAllFaqs, updateFaq } from "../../api/Modules/faq";
import { useSnackbar } from "notistack";
import DynamicTable from "../../components/dynamicTable";
import FaqDialog from "./faqDialog";

// Table headers for loan management
const tableHeaders = [
  { id: "createdAt", title: "Created At", align: "left" },
  { id: "question", title: "Question", align: "left" },
  { id: "answer", title: "Answer", align: "left" },
  { id: "order", title: "Order", align: "left" },
  { id: "status", title: "Status", align: "left" },
  { id: "actions", title: "Actions", align: "left" },
];

// Display rows configuration
const displayRows = [
  "createdAt",
  "question",
  "answer",
  "order",
  "status",
  "actions",
];

const FaqPage = () => {
  const faqDialogRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [faqData, setFaqData] = useState([]);

  const fetchAllFaqs = async () => {
    try {
      setIsLoading(true);
      const response = await getAllFaqs();
      if ([200, 201].includes(response?.status)) {
        setFaqData(response.data.data);
      } else {
        enqueueSnackbar(response?.data?.message || "Something went wrong", {
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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllFaqs();
  }, []);

  const handleStatusChange = async (row, newStatus) => {
    console.log(newStatus,"newStatusnewStatusnewStatus")
    try {
      setIsLoading(true);
      const response = await updateFaq(row._id, { status: newStatus});
      if ([200, 201].includes(response?.status)) {
        enqueueSnackbar(response?.data?.message || "Something went wrong", {
          variant: "success",
        });
        fetchAllFaqs();
      } else {
        enqueueSnackbar(response?.data?.message || "Something went wrong", {
          variant: "error",
        });
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Stack
        direction={{ sm: "row" }}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={3}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "600" }}>
            FAQ
          </Typography>
          <Typography variant="body1" sx={{ color: "#666" }}>
            Manage all FAQ
          </Typography>
        </Box>
        <CustomButton
          btnLabel={"Create FAQ"}
          handlePressBtn={() => {
            faqDialogRef.current?.openDialog({ type: "add", data: null });
          }}
          variant="webbutton"
        />
      </Stack>

      <Paper elevation={1} sx={{ borderRadius: "8px" }}>
        <DynamicTable
          tableHeader={tableHeaders}
          tableData={faqData}
          displayRows={displayRows}
          isLoading={isLoading}
          showPagination={true}
          onEdit={(row) => {
            faqDialogRef.current?.openDialog({ type: "edit", data: row });
          }}
          onStatusChange={handleStatusChange}
          // showDelete={true}
        />
      </Paper>
      <FaqDialog ref={faqDialogRef} onRefresh={fetchAllFaqs} />
    </>
  );
};

export default FaqPage;
