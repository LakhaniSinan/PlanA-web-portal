import React from "react";
import { Box, Skeleton, Paper, Stack, Grid } from "@mui/material";

const SkeletonLoader = ({ 
  count = 1,
  showTitle = true,
  showButton = true,
  showGrid = false,
  gridItems = 2,
}) => {
  const skeletonProps = {
    animation: "wave",
    sx: { borderRadius: 1 }
  };

  return (
    <Paper sx={{ p: 2, borderRadius: 3 }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        {showTitle && (
          <Skeleton variant="text" width={200} height={40} {...skeletonProps} />
        )}
        {showButton && (
          <Skeleton variant="rectangular" width={100} height={36} {...skeletonProps} />
        )}
      </Stack>

      {/* Content */}
      <Stack spacing={2}>
        {showGrid ? (
          <Grid container spacing={2}>
            {Array.from({ length: gridItems }).map((_, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Skeleton variant="rectangular" width="100%" height={200} {...skeletonProps} />
              </Grid>
            ))}
          </Grid>
        ) : (
          Array.from({ length: count }).map((_, index) => (
            <Box key={index}>
              <Skeleton variant="text" width="30%" height={24} animation="wave" sx={{ mb: 1 }} />
              <Skeleton variant="rectangular" width="100%" height={200} {...skeletonProps} />
            </Box>
          ))
        )}
      </Stack>
    </Paper>
  );
};

// Additional Settings specific skeleton
export const AdditionalSettingsSkeleton = () => {
  const skeletonProps = {
    animation: "wave",
    sx: { borderRadius: 1 }
  };

  const SectionSkeleton = ({ titleWidth = "40%" }) => (
    <Box>
      <Skeleton variant="text" width={titleWidth} height={24} animation="wave" sx={{ mb: 1 }} />
      <Skeleton variant="rectangular" width="100%" height={200} {...skeletonProps} />
    </Box>
  );

  return (
    <Paper sx={{ p: 2, borderRadius: 3 }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Skeleton variant="text" width={200} height={40} {...skeletonProps} />
        <Skeleton variant="rectangular" width={100} height={36} {...skeletonProps} />
      </Stack>

      {/* Content Sections */}
      <Stack spacing={4}>
        <SectionSkeleton titleWidth="40%" />
        <SectionSkeleton titleWidth="35%" />
        <SectionSkeleton titleWidth="25%" />
        <SectionSkeleton titleWidth="45%" />
        
        {/* Social Media Links */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" width="30%" height={24} animation="wave" sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" width="100%" height={40} {...skeletonProps} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" width="35%" height={24} animation="wave" sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" width="100%" height={40} {...skeletonProps} />
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
};

export default SkeletonLoader;
