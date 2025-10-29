import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { getDatabase, off, onValue, ref } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import { receiveMessage, sendMessage } from "./SendMessage";

const styles = {
  outgoing: {
    p: "8px 10px",
    backgroundColor: "#F1F1F1",
    borderRadius: "12px",
    alignSelf: "flex-start",
    maxWidth: "70%",
    mb: 1,
    wordBreak: "break-word",
  },
  incoming: {
    p: "8px 10px",
    backgroundColor: "#E3F2FD",
    borderRadius: "12px",
    alignSelf: "flex-end",
    maxWidth: "70%",
    mb: 1,
    wordBreak: "break-word",
  },
  inputField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      "& .MuiOutlinedInput-notchedOutline": {
        border: `2px solid #F3F3F3`,
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        border: `2px solid #F3F3F3`,
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: `2px solid #F3F3F3`,
      },
    },
  },
};

const ChatBox = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [msgValue, setMsgValue] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const ADMIN_ID = "68fa324d213c0e118c380ded";

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!user?._id) return;

    const db = getDatabase();
    const messagesRef = ref(db, `messages/${ADMIN_ID}/${user._id}`);

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsed = Object.keys(data).map((key) => ({
          id: key,
          sendBy: data[key].sender,
          receivedBy: data[key].receiver,
          msg: data[key].msg,
          time: data[key].time,
          attachmentUrl: data[key]?.attachmentUrl || null,
        }));
        setMessages(parsed);
      } else {
        setMessages([]);
      }
      setTimeout(scrollToBottom, 200);
    });

    return () => off(messagesRef);
  }, [user]);

  // 🔹 Send message
  const handleSend = async () => {
    if (!msgValue.trim() && !imgUrl) return;
    try {
      await sendMessage(msgValue, ADMIN_ID, user._id, imgUrl);
      await receiveMessage(msgValue, ADMIN_ID, user._id, imgUrl);
      setMsgValue("");
      setImgUrl(null);
      scrollToBottom();
    } catch (err) {
      console.error("Send failed:", err);
    }
  };

  // 🔹 Upload image to Cloudinary
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "tuytnefv");
    formData.append("cloud_name", "dgooan4ix");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dgooan4ix/upload",
        formData
      );
      setImgUrl(res?.data?.secure_url);
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const displayName = user?.name || user?.fullName || "Customer";

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid #ddd",
          backgroundColor: "#1976d2",
          color: "#fff",
        }}
      >
        <Avatar
          src={user?.image}
          alt={displayName}
          sx={{ width: 45, height: 45, mr: 2 }}
        />
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ color: "#e3f2fd" }}
          >
            {displayName}
          </Typography>
          <Typography variant="caption" sx={{ color: "#e3f2fd" }}>
            Online
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          p: 2,
          overflowY: "auto",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((msg, i) => (
          <Box
            key={msg.id || i}
            sx={msg.sendBy !== user._id ? styles.incoming : styles.outgoing}
          >
            {msg.attachmentUrl && (
              <img
                src={msg.attachmentUrl}
                alt="attachment"
                style={{
                  height: "250px",
                  width: "100%",
                  borderRadius: "10px",
                  marginBottom: "5px",
                  objectFit: "contain",
                }}
              />
            )}
            <Typography variant="body2">{msg.msg}</Typography>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* 🔹 Message Input */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          borderTop: "1px solid #eee",
        }}
      >
        <TextField
          fullWidth
          placeholder="Type a message"
          value={msgValue}
          onChange={(e) => setMsgValue(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && handleSend()}
          sx={styles.inputField}
          InputProps={{
            startAdornment: (
              <>
                <IconButton
                  onClick={() => fileInputRef.current.click()}
                  disabled={isLoading}
                >
                  <AttachFileIcon sx={{ transform: "rotate(45deg)" }} />
                </IconButton>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </>
            ),
            endAdornment: (
              <IconButton color="primary" onClick={handleSend}>
                <SendIcon />
              </IconButton>
            ),
          }}
        />
        {isLoading && <CircularProgress size={20} sx={{ ml: 2 }} />}
      </Box>
    </Box>
  );
};

export default ChatBox;
