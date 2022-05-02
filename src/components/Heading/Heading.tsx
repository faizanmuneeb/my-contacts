import styled from "@emotion/styled";
import { Typography, TypographyProps } from "@mui/material";

const Heading = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: "900",
  fontSize: 22,
}));

export default Heading;
