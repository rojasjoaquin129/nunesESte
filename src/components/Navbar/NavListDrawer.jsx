import { Box } from "@mui/system";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/InBox";
import { NavLink } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./NavbarStyle";
import productos from "../../../products";

export default function NavListDrawer({ setOpen }) {
  const genres = productos.reduce((acc, producto) => {
    const { genre } = producto;
    if (!acc[genre]) {
      acc[genre] = {
        title: genre,
        path: `/category/${genre}`,
      };
    }
    return acc;
  }, {});
  genres["Home"] = {
    title: "Todos",
    path: "/home",
  };

  return (
    <Box sx={{ width: 250 }}>
      <ThemeProvider theme={theme}>
        <nav>
          <List>
            <Divider />
            {Object.values(genres).map((item) => (
              <ListItem disablePadding key={item.title}>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  onClick={() => setOpen(false)}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText>{item.title}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </nav>
        <Divider />
      </ThemeProvider>
    </Box>
  );
}
