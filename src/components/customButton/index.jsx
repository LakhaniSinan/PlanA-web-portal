import { Button } from "@mui/material";
import React from "react";

const CustomButton = ({
  btnLabel,
  handlePressBtn,
  btnBgColor,
  btnTextColor,
  btnHoverColor,
  btnTextTransform,
  endIcon,
  textWeight,
  borderColor,
  variant,
  width,
  height,
  btnTextSize,
  borderRadius,
  isBorder,
  sx,
  startIcon,
  disabled,
}) => {
  return (
    <Button
      sx={{
        borderColor: borderColor,
        border: isBorder ? isBorder : "none",
        width: width ? width : "auto",
        height: height ? height : "100%",
        backgroundColor: btnBgColor,
        color: btnTextColor ? btnTextColor : "#fff", // Text color fix
        fontWeight: textWeight ? textWeight : "300",
        borderRadius: borderRadius ? borderRadius : "50px",
        fontSize: btnTextSize ? btnTextSize : "14px",
        padding: "5px 20px",
        textTransform: btnTextTransform ? btnTextTransform : "capitalize",
        opacity: disabled ? 0.5 : 1, // Opacity change on disable
        "&:hover": {
          backgroundColor: btnHoverColor,
          borderColor: borderColor,
          color: "#fff",
        },
        "&.Mui-disabled": {
          color: btnTextColor ? btnTextColor : "#fff", // Force text color on disable
          opacity: 0.7, // Keep opacity low
        },
        ...sx,
      }}
      onClick={handlePressBtn}
      endIcon={endIcon}
      startIcon={startIcon}
      variant={variant ? variant : ""}
      disabled={disabled}
    >
      {btnLabel}
    </Button>
  );
};

export default CustomButton;
