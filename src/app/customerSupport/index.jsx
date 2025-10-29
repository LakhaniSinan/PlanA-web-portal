import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getUsers } from "../../api/Modules/user";
import AllUsers from "./AllUsers";
import ChatBox from "./ChatBox";

const MAX_HEIGHT = "70vh";

const CustomerSupport = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getUsers();
      if ([200, 201].includes(response.status)) {
        const users = response?.data?.data ?? [];
        setAllUsers(users);
      } else {
        console.error("Unexpected API response:", response.status);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const usersList = useMemo(
    () => <AllUsers users={allUsers} onSelectUser={setSelectedUser} />,
    [allUsers]
  );

  const chatSection = useMemo(() => {
    if (selectedUser) {
      return <ChatBox user={selectedUser} />;
    }
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "text.secondary",
        }}
      >
        <Typography>Select a user to start chatting 💬</Typography>
      </Box>
    );
  }, [selectedUser]);

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Customer Support
      </Typography>

      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={MAX_HEIGHT}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid
          container
          spacing={2}
          sx={{
            height: MAX_HEIGHT,
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
            sx={{
              height: MAX_HEIGHT,
              overflowY: "auto",
              backgroundColor: "#fff",
              borderRight: { md: "1px solid #ddd" },
            }}
          >
            {usersList}
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 8,
            }}
            sx={{
              height: MAX_HEIGHT,
              backgroundColor: "#fff",
            }}
          >
            {chatSection}
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default CustomerSupport;
