import { Box, Typography, Paper } from "@mui/material";
import DynamicTable from "../../components/dynamicTable";
import EditUserDialog from "./editUserDialog";
import { useState } from "react";

const UsersManagement = () => {
  // State for edit dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Simple dummy data for 5 users
  const [usersData, setUsersData] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 202 555 0147",
      interest_rate: "10%",
      status: "Active",
      joinedDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      phone: "+1 202 555 0182",
      interest_rate: "10%",
      status: "Inactive",
      joinedDate: "2024-02-20",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "+1 202 555 0195",
      interest_rate: "10%",
      status: "Active",
      joinedDate: "2024-03-10",
    },
    {
      id: 4,
      name: "Sophia Davis",
      email: "sophia.davis@example.com",
      phone: "+1 202 555 0123",
      interest_rate: "10%",
      status: "Pending",
      joinedDate: "2024-04-05",
    },
    {
      id: 5,
      name: "James Wilson",
      email: "james.wilson@example.com",
      phone: "+1 202 555 0174",
      interest_rate: "10%",
      status: "Active",
      joinedDate: "2024-05-12",
    },
  ]);

  // Updated table headers for new structure
  const tableHeaders = [
    { id: "id", title: "ID", align: "center" },
    { id: "userInfo", title: "User Info", align: "left" },
    { id: "phone", title: "Phone", align: "center" },
    { id: "interest_rate", title: "Interest Rate", align: "center" },
    { id: "status", title: "Status", align: "center" },
    { id: "joinedDate", title: "Joined Date", align: "center" },
    { id: "actions", title: "Actions", align: "center" },
  ];

  // Updated columns to display
  const displayRows = [
    "id",
    "userInfo",
    "phone",
    "interest_rate",
    "status",
    "joinedDate",
    "actions",
  ];

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
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    console.log(`User ${userId} status changed to: ${newStatus}`);
  };

  // Handle save user changes
  const handleSaveUser = (updatedUserData) => {
    setUsersData((prevData) =>
      prevData.map((user) =>
        user.id === updatedUserData.id ? { ...user, ...updatedUserData } : user
      )
    );
    console.log("User updated:", updatedUserData);
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
          isLoading={false}
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
        onSave={handleSaveUser}
      />
    </Box>
  );
};

export default UsersManagement;
