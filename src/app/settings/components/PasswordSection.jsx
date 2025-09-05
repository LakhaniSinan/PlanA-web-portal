import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { LockOutlined, SecurityOutlined } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import TextInput from "../../../components/textInput";
import CustomButton from "../../../components/customButton";
import { adminChangePassword } from "../../../api/Modules/auth";

const PasswordSection = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePassword = async () => {
    if (
      !passwordData.oldPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmNewPassword
    ) {
      enqueueSnackbar("Please fill all password fields", {
        variant: "error",
      });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      enqueueSnackbar("New password and confirm password do not match", {
        variant: "error",
      });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      enqueueSnackbar("Password must be at least 8 characters long", {
        variant: "error",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await adminChangePassword({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
        confirmNewPassword: passwordData.confirmNewPassword,
      });
      
      if (response.status === 200 || response.status === 201) {
        enqueueSnackbar("Password changed successfully!", {
          variant: "success",
        });
        // Reset password fields
        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      } else {
        enqueueSnackbar(response.message || "Failed to change password", {
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Error changing password:", error);
      enqueueSnackbar("Failed to change password", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card 
      elevation={3}
      maxWidth={1200}
      sx={{ 
        borderRadius: 3,
        overflow: "hidden"
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 4,
            justifyContent: "center",
            flexDirection: { xs: "column", sm: "row" },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Avatar
            sx={{
              width: 70,
              height: 70,
              bgcolor: "primary.main",
              mr: { xs: 0, sm: 2 },
              mb: { xs: 2, sm: 0 },
              boxShadow: 2,
            }}
          >
            <LockOutlined sx={{ fontSize: 35 }} />
          </Avatar>
          <Box>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700,
                color: "primary.main",
                mb: 1
              }}
            >
              Update Password
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ fontSize: "1rem" }}
            >
              Change your password securely
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <TextInput
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              placeholder="Enter current password"
              type="password"
              InputStartIcon={<LockOutlined />}
              showPassIcon={true}
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              placeholder="Enter new password"
              type="password"
              InputStartIcon={<SecurityOutlined />}
              showPassIcon={true}
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              name="confirmNewPassword"
              value={passwordData.confirmNewPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm new password"
              type="password"
              InputStartIcon={<SecurityOutlined />}
              showPassIcon={true}
              fullWidth={true}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <CustomButton
            btnLabel={loading ? "Changing Password..." : "Change Password"}
            handlePressBtn={handleChangePassword}
            btnBgColor="primary.main"
            btnTextColor="white"
            btnHoverColor="primary.dark"
            width="100%"
            height="50px"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LockOutlined />}
            disabled={loading}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PasswordSection;
