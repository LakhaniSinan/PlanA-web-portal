import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
} from "@mui/material";
import { LockOutlined, SecurityOutlined } from "@mui/icons-material";
import TextInput from "../../../components/textInput";
import CustomButton from "../../../components/customButton";

const PasswordSection = ({ onShowNotification }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePassword = () => {
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      onShowNotification("Please fill all password fields", "error");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      onShowNotification("New password and confirm password do not match", "error");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      onShowNotification("Password must be at least 8 characters long", "error");
      return;
    }

    // Here you would typically make an API call to change the password
    console.log("Changing password:", passwordData);
    onShowNotification("Password changed successfully!");

    // Reset password fields
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
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
              name="currentPassword"
              value={passwordData.currentPassword}
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
              name="confirmPassword"
              value={passwordData.confirmPassword}
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
            btnLabel="Change Password"
            handlePressBtn={handleChangePassword}
            btnBgColor="primary.main"
            btnTextColor="white"
            btnHoverColor="primary.dark"
            width="100%"
            height="50px"
            startIcon={<LockOutlined />}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PasswordSection;
