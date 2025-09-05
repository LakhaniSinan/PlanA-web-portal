import { Box, Typography, Paper } from "@mui/material";
import DynamicTable from "../../components/dynamicTable";
import EditUserDialog from "./editUserDialog";
import { useState, useEffect } from "react";
import { getUsers } from "../../api/Modules/user";
import { useSnackbar } from "notistack";

const UsersManagement = () => {
  // State for edit dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // State for users data from API
  const [usersData, setUsersData] = useState([]);
  
  // Notistack hook for notifications
  const { enqueueSnackbar } = useSnackbar();

  // Updated table headers for API data structure
  const tableHeaders = [
    { id: "id", title: "ID", align: "center" },
    { id: "userInfo", title: "User Info", align: "left" },
    { id: "phone", title: "Phone", align: "center" },
    { id: "completeAddress", title: "Complete Address", align: "left" },
    { id: "interestRate", title: "Interest Rate", align: "center" },
    { id: "status", title: "Status", align: "center" },
    { id: "createdAt", title: "Joined Date", align: "center" },
    { id: "actions", title: "Actions", align: "center" },
  ];

  // Updated columns to display
  const displayRows = [
    "id",
    "userInfo",
    "phone",
    "completeAddress",
    "interestRate",
    "status",
    "createdAt",
    "actions",
  ];

  const fetchAllUsers = async () => {
    setLoading(true);

    try {
      const response = await getUsers();
      if (response.status === 200 || response.status === 201) {
        // Transform API data to match table structure
        const transformedData = response.data.data.map((user, index) => ({
          id: index + 1, // Use index as display ID
          _id: user._id, // Keep original ID for operations
          name: user.fullName || user.name || "N/A",
          email: user.email,
          phone: user.phoneNumber || user.contactNumber || "N/A",
          address: user.address || "N/A",
          city: user.city || "",
          state: user.state || "",
          country: user.country || "",
          postalCode: user.postalCode || "",
          interestRate: `${user.interestRate}%`,
          emailVerified: user.emailVerified,
          status: user.status ? "Active" : "Inactive",
          createdAt: user.createdAt,
          // Include all original data for edit functionality
          ...user
        }));
        setUsersData(transformedData);
        console.log("Users fetched successfully:", transformedData);
      } else {
        console.error("Failed to fetch users:", response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      enqueueSnackbar("Failed to fetch users. Please try again.", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Action handlers
  const handleView = (user) => {
    console.log("View user:", user);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleDelete = (user) => {
    console.log("Delete user:", user);
  };

  // Status change handler
  const handleStatusChange = (userId, newStatus) => {
    setUsersData((prevData) =>
      prevData.map((user) =>
        (user._id === userId || user.id === userId) ? { ...user, status: newStatus } : user
      )
    );
    console.log(`User ${userId} status changed to: ${newStatus}`);
  };


  return (
    <Box sx={{ p: 3 }}>
      {/* Simple Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "600", mb: 1 }}>
          Users Management
        </Typography>
        <Typography variant="body1" sx={{ color: "#666" }}>
          Manage your users here
        </Typography>
      </Box>

      {/* Simple Table */}
      <Paper elevation={1} sx={{ borderRadius: "8px" }}>
        <DynamicTable
          tableHeader={tableHeaders}
          tableData={usersData}
          displayRows={displayRows}
          showPagination={true}
          isLoading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewClick={handleView}
          showDelete={true}
          onStatusChange={handleStatusChange}
        />
      </Paper>

      {/* Edit User Dialog */}
      <EditUserDialog
        open={editDialogOpen}
        onClose={() => {
          setEditDialogOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onRefresh={fetchAllUsers}
      />

    </Box>
  );
};

export default UsersManagement;
