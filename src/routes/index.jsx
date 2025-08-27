import {
  CreditCard,
  FileText,
  History,
  LayoutDashboard,
  Settings,
  Users,
  HandCoins,
} from "lucide-react";
import Login from "../app/auth/login";
import ForgotPassword from "../app/auth/forgotPassword";
import OTPVerification from "../app/auth/otpVerification";
import SetNewPassword from "../app/auth/setNewPassword";
import Dashboard from "../app/dashboard";
import UsersManagement from "../app/users";
import LoanManagement from "../app/loanManagement";
import SettingsManagement from "../app/settings";
import LoanDetails from "../app/loanManagement/loanDetail";
const AUTH_ROUTES = [
  {
    id: 1,
    name: "Login",
    component: <Login />,
    exact: "exact",
    path: "login",
  },
  {
    id: 2,
    name: "Register",
    component: <ForgotPassword />,
    exact: "exact",
    path: "forgot-password",
  },
  {
    id: 3,
    name: "OTP Verification",
    component: <OTPVerification />,
    exact: "exact",
    path: "otp-verification",
  },
  {
    id: 4,
    name: "Reset Password",
    component: <SetNewPassword />,
    exact: "exact",
    path: "set-new-password",
  },
];

const ADMIN_ROUTES = [
  {
    id: 1,
    name: "Dashboard",
    component: <Dashboard />,
    exact: "exact",
    path: "/",
    activeIcon: <LayoutDashboard size={20} color="#ffffff" />,
    inActiveIcon: <LayoutDashboard size={20} color="#64748b" />,
  },

  {
    id: 2,
    name: "Users",
    component: <UsersManagement />,
    exact: "exact",
    path: "/users",
    activeIcon: <Users size={20} color="#ffffff" />,
    inActiveIcon: <Users size={20} color="#64748b" />,
  },
    {
    id: 3,
    name: "Loan Management",
    component: <LoanManagement />,
    exact: "exact",
    path: "/loan-management",
    activeIcon: <HandCoins size={20} color="#ffffff" />,
    inActiveIcon: <HandCoins size={20} color="#64748b" />,
  },
  {
    id: 4,
    name: "Settings",
    component: <SettingsManagement />,
    exact: "exact",
    path: "/settings",
    activeIcon: <Settings size={20} color="#ffffff" />,
    inActiveIcon: <Settings size={20} color="#64748b" />,
  },
  {
    id: 5,
    name: "Loan Details",
    component: <LoanDetails />,
    exact: "exact",
    path: "/loan-detail",
    activeIcon: <HandCoins size={20} color="#ffffff" />,
    inActiveIcon: <HandCoins size={20} color="#64748b" />,
    isHideMenu: true,
  },
];

export { ADMIN_ROUTES, AUTH_ROUTES };
