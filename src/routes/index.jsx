import {
  CreditCard,
  FileText,
  History,
  LayoutDashboard,
  Settings,
  Users,
  HandCoins,
  TableOfContents,
  Handshake,
  ShieldCheck,
  ShieldHalf,
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
import Userhistory from "../app/users/history";
import FaqPage from "../app/faq";
import TermsPage from "../app/terms";
import PrivacyPage from "../app/privacy";
import AccountNumberPage from "../app/accountNumber";
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
    id: 3,
    name: "Faq",
    component: <FaqPage />,
    exact: "exact",
    path: "/faq",
    activeIcon: <TableOfContents size={20} color="#ffffff" />,
    inActiveIcon: <TableOfContents size={20} color="#64748b" />,
  },
  {
    id: 3,
    name: "Terms and Conditions",
    component: <TermsPage />,
    exact: "exact",
    path: "/terms-conditions",
    activeIcon: <Handshake size={20} color="#ffffff" />,
    inActiveIcon: <Handshake size={20} color="#64748b" />,
  },
  {
    id: 3,
    name: "Privacy Policy",
    component: <PrivacyPage />,
    exact: "exact",
    path: "/privacy-policy",
    activeIcon: <ShieldCheck size={20} color="#ffffff" />,
    inActiveIcon: <ShieldCheck size={20} color="#64748b" />,
  },
  {
    id: 3,
    name: "Account Number",
    component: <AccountNumberPage />,
    exact: "exact",
    path: "/account-number",
    activeIcon: <ShieldHalf size={20} color="#ffffff" />,
    inActiveIcon: <ShieldHalf size={20} color="#64748b" />,
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
    path: "/loan-detail/:id/user/:userId",
    activeIcon: <HandCoins size={20} color="#ffffff" />,
    inActiveIcon: <HandCoins size={20} color="#64748b" />,
    isHideMenu: true,
  },
  {
    id: 5,
    name: "User History",
    component: <Userhistory />,
    exact: "exact",
    path: "/user-history/:id",
    activeIcon: <HandCoins size={20} color="#ffffff" />,
    inActiveIcon: <HandCoins size={20} color="#64748b" />,
    isHideMenu: true,
  },
];

export { ADMIN_ROUTES, AUTH_ROUTES };
