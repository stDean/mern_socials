import { useState } from "react";
import {
  Box, IconButton, InputBase, Typography, Select,
  MenuItem, FormControl, useTheme, useMediaQuery,
} from "@mui/material";
import {
  Search, Message, DarkMode, LightMode,
  Notifications, Help, Menu, Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { SET_MODE, SET_LOGOUT } from "redux/auth.slice";
import FlexBetween from "./FlexBetween.component";

const NavBar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const user = useSelector(({ auth }) => auth.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Sociopedia
        </Typography>
      </FlexBetween>
    </FlexBetween>
  )
}

export default NavBar