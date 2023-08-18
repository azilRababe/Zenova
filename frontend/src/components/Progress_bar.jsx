import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export const Progress_bar = () => {
  return (
    <Stack
      sx={{
        color: "grey.500",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      spacing={2}
      direction="row"
    >
      <CircularProgress color="inherit" />
    </Stack>
  );
};
