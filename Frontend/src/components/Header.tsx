import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo";
import NavigationLink from "./shared/NavigationLink";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const auth = useAuth();

  return (
    <AppBar sx={{ bgcolor: "transparent", boxShadow: "none" }}>
      <Toolbar>
        <Logo />

        {auth?.isLoggedIn ? (
          <>
            <NavigationLink
              to="/home2"
              text="Dashboard"
              bg="#00fffc"
              textColor="black"
            />
            <NavigationLink
              to="/"
              text="Logout"
              bg="#51538f"
              textColor="white"
              onClick={auth.logout}
            />
          </>
        ) : (
          <>
            <NavigationLink
              to="/login"
              text="Login"
              bg="#00fffc"
              textColor="black"
            />
            <NavigationLink
              to="/signup"
              text="Signup"
              bg="#51538f"
              textColor="white"
            />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
