import React, { useState, useEffect } from "react";
import {
  Paper,
  Stack,
  Box,
  Typography,
  CircularProgress,
  Grid,
  Divider,
} from "@mui/material";
import { useSnackbar } from "notistack";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import CustomButton from "../../components/customButton";
import TextInput from "../../components/textInput";
import { AdditionalSettingsSkeleton } from "../../components/skeletonLoader";
import { getSetting, updateSetting } from "../../api/Modules/setting";

const AdditionalSettings = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState({
    fetch: false,
    update: false,
  });

  // Sab fields ke liye state
  const [settings, setSettings] = useState({
    term: "",
    privacy: "",
    aboutUs: "",
    fbLink: "",
    instaLink: "",
    helpInstruction: "",
  });
  const [objectId, setObjectId] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const fetchSettings = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, fetch: true }));
      const response = await getSetting();
      if (response.data.status === "success") {
        const data = response.data.data;
        setSettings({
          term: data.term || "",
          privacy: data.privacy || "",
          aboutUs: data.aboutUs || "",
          fbLink: data.fbLink || "",
          instaLink: data.instaLink || "",
          helpInstruction: data.helpInstruction || "",
        });
        setObjectId(data._id);
      } else {
        enqueueSnackbar(response.data.message, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message || "Error fetching settings",
        { variant: "error" }
      );
    } finally {
      setIsLoading((prev) => ({ ...prev, fetch: false }));
    }
  };

  const handleUpdateSettings = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, update: true }));
      const response = await updateSetting(objectId, settings);
      if (response.data.status === "success") {
        enqueueSnackbar(response.data.message, { variant: "success" });
        fetchSettings();
      } else {
        enqueueSnackbar(response.data.message, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message || "Error updating settings",
        { variant: "error" }
      );
    } finally {
      setIsLoading((prev) => ({ ...prev, update: false }));
    }
  };

  const handleRichTextChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTextChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Show skeleton while loading
  if (isLoading.fetch) {
    return <AdditionalSettingsSkeleton />;
  }

  return (
    <Paper sx={{ height: "auto", p: 2, borderRadius: 3 }}>
      <Stack
        mb={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h4" fontWeight={600}>
            Settings
          </Typography>
          {isLoading.update && <CircularProgress size={20} />}
        </Box>

        <CustomButton
          variant="webbutton"
          btnLabel={isLoading.update ? "Updating..." : "Update All"}
          handlePressBtn={handleUpdateSettings}
          disabled={isLoading.update}
          width="auto"
        />
      </Stack>

      <Grid container spacing={3}>
        <Grid item size={{ xs: 12, md: 6 }}>
          <Typography variant="body1" fontWeight={500} mb={1}>
            Facebook Link
          </Typography>
          <TextInput
            placeholder="Enter Facebook URL"
            value={settings.fbLink}
            onChange={(e) => handleTextChange("fbLink", e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 6 }}>
          <Typography variant="body1" fontWeight={500} mb={1}>
            Instagram Link
          </Typography>
          <TextInput
            placeholder="Enter Instagram URL"
            value={settings.instaLink}
            onChange={(e) => handleTextChange("instaLink", e.target.value)}
            fullWidth
          />
        </Grid>
        {/* Terms & Conditions */}
        <Grid item size={{ xs: 12, md: 6 }}>
          <Stack height="270px">
            <Typography variant="body1" fontWeight={500} mb={1}>
              Terms & Conditions
            </Typography>
            <ReactQuill
              theme="snow"
              value={settings.term}
              onChange={(value) => handleRichTextChange("term", value)}
              modules={modules}
              style={{ height: "200px" }}
            />
          </Stack>
        </Grid>

        {/* Privacy Policy */}
        <Grid item size={{ xs: 12, md: 6 }}>
          <Stack height="270px">
            <Typography variant="body1" fontWeight={500} mb={1}>
              Privacy Policy
            </Typography>
            <ReactQuill
              theme="snow"
              value={settings.privacy}
              onChange={(value) => handleRichTextChange("privacy", value)}
              modules={modules}
              style={{ height: "200px" }}
            />
          </Stack>
        </Grid>

        {/* About Us */}
        <Grid item size={{ xs: 12, md: 6 }}>
          <Stack height="270px">
            <Typography variant="body1" fontWeight={500} mb={1}>
              About Us
            </Typography>
            <ReactQuill
              theme="snow"
              value={settings.aboutUs}
              onChange={(value) => handleRichTextChange("aboutUs", value)}
              modules={modules}
              style={{ height: "200px" }}
            />
          </Stack>
        </Grid>

        {/* Help Instructions */}
        <Grid item size={{ xs: 12, md: 6 }}>
          <Stack height="270px">
            <Typography variant="body1" fontWeight={500} mb={1}>
              Help Instructions
            </Typography>
            <ReactQuill
              theme="snow"
              value={settings.helpInstruction}
              onChange={(value) =>
                handleRichTextChange("helpInstruction", value)
              }
              modules={modules}
              style={{ height: "200px" }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AdditionalSettings;
