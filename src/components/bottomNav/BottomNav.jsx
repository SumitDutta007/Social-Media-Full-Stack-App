import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import * as React from "react";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./bottomNav.css";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [value, setValue] = React.useState(0);

  // Update the active tab based on current route
  React.useEffect(() => {
    if (location.pathname === "/") {
      setValue(0);
    } else if (location.pathname.includes("/profile")) {
      setValue(1);
    } else if (location.pathname === "/friends") {
      setValue(2);
    }
  }, [location]);

  const handleNavigation = (event, newValue) => {
    setValue(newValue);

    switch (newValue) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate(`/profile/${user?.username}`);
        break;
      case 2:
        navigate("/friends");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999 }}
      className="bottom-nav-container"
      elevation={3}
    >
      <BottomNavigation showLabels value={value} onChange={handleNavigation}>
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
        <BottomNavigationAction label="Friends" icon={<PeopleIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
