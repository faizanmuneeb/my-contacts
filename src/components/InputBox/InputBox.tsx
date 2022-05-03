import { alpha, InputAdornment, InputBase, styled } from "@mui/material";
import React, { ReactNode } from "react";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  width: "100%",
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 20,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#f3f5f9" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const InputBox = ({
  startIcon,
  placeholder,
  value,
  type,
  onChange,
}: {
  startIcon?: ReactNode;
  placeholder: string;
  value?: string | number | undefined;
  onChange: Function;
  type?: string;
}) => {
  return (
    <BootstrapInput
      placeholder={placeholder}
      type={type || "text"}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      startAdornment={
        <InputAdornment position='start'>{startIcon}</InputAdornment>
      }
    />
  );
};

export default InputBox;
