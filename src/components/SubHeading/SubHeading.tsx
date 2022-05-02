import styled from "@emotion/styled";
import { Typography, TypographyProps } from "@mui/material";

const SubHeading = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: "900",
  fontSize: 14,
}));

export default SubHeading;
