import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid"; // ✅ use this in v7
import {
  Banknote,
  BanknoteArrowDown,
  BanknoteArrowUp,
  BanknoteX,
  CalendarCheck,
  CircleDollarSign,
  UserCheck,
  Users,
  UserX,
} from "lucide-react";
import { StatsCard } from "../../components/cards";
import { getDashboard } from "../../api/Modules/dashboard";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import ApexBarChart from "./barChart";

const Dashboard = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await getDashboard();
      if ([200, 201].includes(response?.status)) {
        setDashboardData(response.data.data);
      } else {
        enqueueSnackbar(
          response?.data?.message || "Failed to fetch dashboard data",
          {
            variant: "error",
          }
        );
      }
    } catch (error) {
      enqueueSnackbar(
        response?.data?.message || "Failed to fetch dashboard data",
        {
          variant: "error",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const dashboardStats = [
    {
      title: "Total Loan",
      value: dashboardData?.totalLoansAmount || 0,
      subtitle: "Total loans given",
      icon: <Banknote />,
    },
    {
      title: "Disbursed Loans",
      value: dashboardData?.totalBursedAmount || 0,
      subtitle: "Total pending loans",
      icon: <BanknoteArrowUp />,
    },
    {
      title: "Incoming Amount",
      value: dashboardData?.currentMonthRepayments || 0,
      subtitle: "This month incoming amount",
      icon: <BanknoteArrowUp />,
    },
    {
      title: "Pending Loans",
      value: dashboardData?.pendingLoans || 0,
      subtitle: "Total pending loans",
      icon: <BanknoteArrowDown />,
    },
    {
      title: "Rejected Loans",
      value: dashboardData?.rejectedLoans || 0,
      subtitle: "Total rejected loans",
      icon: <BanknoteX />,
    },
    {
      title: "Users",
      value: dashboardData?.totalUsers || 0,
      subtitle: "Total users",
      icon: <Users />,
    },
    {
      title: "Active Users",
      value: dashboardData?.activeUsers || 0,
      subtitle: "Total active users",
      icon: <UserCheck />,
    },
    {
      title: "Inactive Users",
      value: dashboardData?.inactiveUsers || 0,
      subtitle: "Total inactive users",
      icon: <UserX />,
    },
  ];

  return (
    <Box>
      <Typography
        variant="h3"
        sx={{ mb: 4, fontWeight: "bold", color: "text.primary" }}
      >
        Dashboard
      </Typography>

      <Grid container spacing={1}>
        {dashboardStats.map((stat, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
            <StatsCard {...stat} isLoading={loading} />
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 2, mt: 2 }}>
        {dashboardData?.barChartData && (
          <ApexBarChart barChartData={dashboardData?.barChartData} />
        )}
      </Paper>
    </Box>
  );
};

export default Dashboard;
