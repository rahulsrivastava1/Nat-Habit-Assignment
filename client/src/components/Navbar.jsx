import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar variant="dense">
        <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ m: 2 }}
          >
            Weather Forecast
          </Typography>
        </a>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
