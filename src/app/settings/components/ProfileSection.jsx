import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
} from "@mui/material";
import { PersonOutlined } from "@mui/icons-material";
import TextInput from "../../../components/textInput";
import CustomButton from "../../../components/customButton";

const ProfileSection = ({ onShowNotification }) => {
  const [profileData, setProfileData] = useState({
    username: "John Doe",
    email: "john.doe@example.com",
  });

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileUpdate = () => {
    if (!profileData.username || !profileData.email) {
      onShowNotification("Please fill all profile fields", "error");
      return;
    }

    // Here you would typically make an API call to update the profile
    console.log("Updating profile:", profileData);
    onShowNotification("Profile updated successfully!");
  };

  return (
    <Card 
      elevation={3}
      maxWidth={1200}
      sx={{ 
        borderRadius: 3,
        overflow: "hidden",
        mb: 3
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
            <PersonOutlined sx={{ fontSize: 35 }} />
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
              Profile Information
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ fontSize: "1rem" }}
            >
              Update your profile details
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <TextInput
              name="username"
              value={profileData.username}
              onChange={handleProfileChange}
              placeholder="Enter username"
              InputStartIcon={<PersonOutlined />}
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              name="email"
              value={profileData.email}
              onChange={handleProfileChange}
              placeholder="Enter email"
              type="email"
              InputStartIcon={<PersonOutlined />}
              fullWidth={true}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <CustomButton
            btnLabel="Update Profile"
            handlePressBtn={handleProfileUpdate}
            btnBgColor="primary.main"
            btnTextColor="white"
            btnHoverColor="secondary.dark"
            width="100%"
            height="50px"
            startIcon={<PersonOutlined />}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
