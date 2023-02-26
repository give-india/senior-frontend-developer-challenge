import { Container } from "@mui/material";

//@ts-ignore
export default function Layout({ children, home }) {
  return (
    <Container maxWidth="sm">
      {children}
    </Container>
  );
}
