import { useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  TextField,
} from "@mui/material";

const AllUsers = ({ users = [], onSelectUser }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user?.name?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          backgroundColor: "#1976d2",
          color: "white",
          p: 2,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Chat List
      </Typography>

      <Box sx={{ p: 2, backgroundColor: "#f9f9f9" }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Search user by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => {
              const lastMessage =
                user.history?.length > 0
                  ? user.history[user.history.length - 1].message
                  : "No messages yet";

              const lastTime =
                user.history?.length > 0
                  ? new Date(
                      user.history[user.history.length - 1].createdAt
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "";

              return (
                <Box key={user._id}>
                  <ListItem
                    button
                    alignItems="flex-start"
                    onClick={() => onSelectUser && onSelectUser(user)}
                    sx={{
                      "&:hover": { backgroundColor: "#f5f5f5" },
                      cursor: "pointer",
                      px: 2,
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={user.image || "/default-avatar.png"}
                        alt={user.name}
                        sx={{ width: 50, height: 50 }}
                      />
                    </ListItemAvatar>

                    <ListItemText
                      primary={
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="subtitle1" fontWeight="bold">
                            {user.name}
                          </Typography>
                          {lastTime && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {lastTime}
                            </Typography>
                          )}
                        </Box>
                      }
                      secondary={
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                          sx={{ maxWidth: "90%" }}
                        >
                          {lastMessage}
                        </Typography>
                      }
                    />
                  </ListItem>

                  {index < filteredUsers.length - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </Box>
              );
            })
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              sx={{ py: 3 }}
            >
              No users found
            </Typography>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default AllUsers;
