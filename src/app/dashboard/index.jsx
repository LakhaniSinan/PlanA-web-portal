import { Box, Typography, Container } from "@mui/material";
import Grid from "@mui/material/Grid"; // ✅ use this in v7
import { StatsCard } from "../../components/cards";

const Dashboard = () => {
  const dashboardStats = [
    {
      title: "Total Amount Disbursed",
      value: "$2,45,67,890",
      subtitle: "Total loans given",
      icon: "amount",
      color: "#2196f3",
    },
    {
      title: "Monthly Disbursed",
      value: "$34,56,789",
      subtitle: "This month",
      icon: "monthly",
      color: "#4caf50",
    },
    {
      title: "Total Users",
      value: "1,234",
      subtitle: "Active users",
      icon: "users",
      color: "#ff9800",
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 3 }}>
        <Typography
          variant="h3"
          sx={{ mb: 4, fontWeight: "bold", color: "text.primary" }}
        >
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          {dashboardStats.map((stat, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
              <StatsCard {...stat} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
