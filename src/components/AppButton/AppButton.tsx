import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import * as React from "react";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText("#49a091"),
  backgroundColor: "#49a091",
  "&:hover": {
    backgroundColor: "#49a091",
  },
}));

const AppButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: React.MouseEventHandler;
}) => {
  return (
    <ColorButton
      variant='contained'
      onClick={onClick}
      sx={{
        width: "100%",
        position: "relative",
        bottom: 0,
      }}
    >
      {label}
    </ColorButton>
  );
};

export default AppButton;
