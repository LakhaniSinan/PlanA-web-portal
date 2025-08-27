import { Box, Card, CardContent, Typography, Avatar } from "@mui/material";
import { TrendingUp, People, AccountBalance, CalendarMonth } from "@mui/icons-material";

const StatsCard = ({ title, value, subtitle, icon, color = "primary.main" }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case "trending":
        return <TrendingUp />;
      case "users":
        return <People />;
      case "amount":
        return <AccountBalance />;
      case "monthly":
        return <CalendarMonth />;
      default:
        return <TrendingUp />;
    }
  };

  return (
    <Card sx={{ 
      height: "100%",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      transition: "transform 0.2s ease-in-out",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 8px 15px rgba(0,0,0,0.15)"
      }
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar 
            sx={{ 
              bgcolor: color, 
              width: 56, 
              height: 56,
              mr: 2,
              flexShrink: 0
            }}
          >
            {getIcon(icon)}
          </Avatar>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom noWrap>
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: "bold" }} noWrap>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary" noWrap>
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
