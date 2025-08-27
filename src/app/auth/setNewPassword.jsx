import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Paper, Typography, Container, Link } from "@mui/material";
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import TextInput from "../../components/textInput";
import CustomButton from "../../components/customButton";
import loanImage from "../../assets/loan-vector-5.png";
import { AUTH_STYLES } from "./styles";

const SetNewPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      navigate("/forgot-password");
    }
  }, [location, navigate]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setError("");
  };

  const validatePassword = (password) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    return requirements;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.newPassword || !formData.confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const passwordRequirements = validatePassword(formData.newPassword);
    const allRequirementsMet =
      Object.values(passwordRequirements).every(Boolean);

    if (!allRequirementsMet) {
      setError("Password does not meet all requirements");
      return;
    }

    console.log("Password reset for:", email);

    setSuccess("Password successfully reset! Redirecting to login...");
    setError("");

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const handleBackToForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <Container maxWidth="lg" sx={AUTH_STYLES.container}>
      <Paper elevation={3} sx={AUTH_STYLES.paper}>
        {/* Right Section - Illustration (Top on mobile) */}
        <Box sx={AUTH_STYLES.rightSection}>
          <img src={loanImage} alt="login" style={{ width: "100%" }} />
        </Box>

        {/* Left Section - Form (Bottom on mobile) */}
        <Box sx={AUTH_STYLES.leftSection}>
          {/* Back to Forgot Password */}
          <Link onClick={handleBackToForgotPassword} sx={AUTH_STYLES.backLink}>
            <ArrowLeft size={16} />
            Back to Forgot Password
          </Link>

          {/* Title */}
          <Typography variant="h3" sx={AUTH_STYLES.title}>
            Set New Password
          </Typography>
          <Typography variant="subtitle2" sx={AUTH_STYLES.subtitle}>
            Create a strong password for your account. Make sure it's secure and
            easy to remember.
          </Typography>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={AUTH_STYLES.form}>
            {/* New Password Input */}
            <TextInput
              type={showPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange("newPassword")}
              placeholder="Enter new password"
              InputStartIcon={<Lock size={20} style={{ color: "#1F3C88" }} />}
              InputEndIcon={
                <Box
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </Box>
              }
              sx={{ mb: 2 }}
            />

            {/* Confirm Password Input */}
            <TextInput
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange("confirmPassword")}
              placeholder="Confirm new password"
              InputStartIcon={<Lock size={20} style={{ color: "#1F3C88" }} />}
              InputEndIcon={
                <Box
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ cursor: "pointer" }}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </Box>
              }
              sx={{ mb: 2 }}
            />

            {/* Error Message */}
            {error && (
              <Typography variant="caption" sx={AUTH_STYLES.errorText}>
                {error}
              </Typography>
            )}

            {/* Success Message */}
            {success && (
              <Typography variant="caption" sx={AUTH_STYLES.successText}>
                {success}
              </Typography>
            )}

            {/* Submit Button */}
            <CustomButton
              btnLabel="Reset Password"
              handlePressBtn={handleSubmit}
              variant="authbutton"
              width="100%"
              height="50px"
              borderRadius={3}
              btnTextColor="#fff"
              isBorder={"1px solid #fff"}
            />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default SetNewPassword;
