import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Avatar,
  Divider,
  Alert,
  IconButton,
} from "@mui/material";
import { X, User, Mail, Phone, Percent } from "lucide-react";
import TextInput from "../../components/textInput";
import CustomButton from "../../components/customButton";

const EditUserDialog = ({ open, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    joinedDate: "",
    interest_rate: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form data when user prop changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        joinedDate: user.joinedDate || "",
        interest_rate: user.interest_rate || "",
      });
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate user info
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    // Validate password fields if any password field is filled
    const hasPasswordData = Object.values(passwordData).some((value) =>
      value.trim()
    );

    if (hasPasswordData) {
      if (!passwordData.currentPassword.trim()) {
        newErrors.currentPassword = "Current password is required";
      }

      if (!passwordData.newPassword.trim()) {
        newErrors.newPassword = "New password is required";
      } else if (passwordData.newPassword.length < 6) {
        newErrors.newPassword = "Password must be at least 6 characters";
      }

      if (!passwordData.confirmPassword.trim()) {
        newErrors.confirmPassword = "Please confirm your new password";
      } else if (passwordData.newPassword !== passwordData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const dataToSave = {
        ...formData,
        id: user.id,
      };

      // Only include password data if user wants to change password
      const hasPasswordData = Object.values(passwordData).some((value) =>
        value.trim()
      );
      if (hasPasswordData) {
        dataToSave.passwordData = passwordData;
      }

      if (onSave) {
        await onSave(dataToSave);
      }

      // Reset password fields
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      onClose();
    } catch (error) {
      console.error("Error saving user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      joinedDate: user?.joinedDate || "",
      interest_rate: user?.interest_rate || "",
    });
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setErrors({});
    onClose();
  };

  if (!user) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        },
      }}
    >
      <DialogTitle
        sx={{
          pb: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #667eea 0%, rgb(23, 4, 81) 100%)",
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: "rgba(255,255,255,0.2)",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            {user.name?.charAt(0) || "U"}
          </Avatar>
          <Typography variant="h6" color="white" sx={{ fontWeight: "600" }}>
            Edit User: {user.name}
          </Typography>
        </Box>
        <IconButton onClick={handleClose} sx={{ color: "white" }}>
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* User Information Section */}
          <Box mt={3}>
            <Typography
              variant="h6"
              sx={{ mb: 2, color: "#333", fontWeight: "600" }}
            >
              User Information
            </Typography>

            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
            >
              <TextInput
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                InputStartIcon={<User size={18} color="#666" />}
                fullWidth
              />

              <TextInput
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                InputStartIcon={<Mail size={18} color="#666" />}
                fullWidth
              />

              <TextInput
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                InputStartIcon={<Phone size={18} color="#666" />}
                fullWidth
              />

              <TextInput
                value={formData.interest_rate}
                onChange={(e) =>
                  handleInputChange("interest_rate", e.target.value)
                }
                InputStartIcon={<Percent size={18} color="#666" />}
                placeholder="interest Rate"
                fullWidth
              />
            </Box>
          </Box>

          <Divider />

          {/* Password Change Section */}
          <Box>
            <Typography
              variant="h6"
              sx={{ mb: 2, color: "#333", fontWeight: "600" }}
            >
              Change Password
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: "#666" }}>
              Leave password fields empty if you don't want to change the
              password
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextInput
                showLabel="Current Password"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  handlePasswordChange("currentPassword", e.target.value)
                }
                showPassIcon={true}
                fullWidth
              />

              <TextInput
                showLabel="New Password"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  handlePasswordChange("newPassword", e.target.value)
                }
                showPassIcon={true}
                fullWidth
              />

              <TextInput
                showLabel="Confirm New Password"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  handlePasswordChange("confirmPassword", e.target.value)
                }
                showPassIcon={true}
                fullWidth
              />
            </Box>
          </Box>

          {/* Error Alert */}
          {Object.keys(errors).length > 0 && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Please fix the errors above before saving.
            </Alert>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <CustomButton
          btnLabel="Cancel"
          handlePressBtn={handleClose}
          variant="outlined"
          borderColor="#E5E7EB"
          btnTextColor="#374151"
          btnBgColor="transparent"
          btnHoverColor="#F3F4F6"
          borderRadius="8px"
          width="120px"
          height="40px"
        />

        <CustomButton
          btnLabel={isLoading ? "Saving..." : "Saved"}
          handlePressBtn={handleSave}
          disabled={isLoading}
          variant={"authbutton"}
          width="140px"
          height="40px"
          btnTextSize="14px"
          textWeight="500"
        />
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
