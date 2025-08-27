import React, { useState } from "react";
import { Box, Alert, Snackbar } from "@mui/material";
import ProfileSection from "./components/ProfileSection";
import PasswordSection from "./components/PasswordSection";

const SettingsManagement = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showNotification = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto", minHeight: "100vh" }}>
      <ProfileSection onShowNotification={showNotification} />
      <PasswordSection onShowNotification={showNotification} />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SettingsManagement;
