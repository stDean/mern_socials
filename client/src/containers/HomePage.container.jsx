import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

import { NavBar, UserWidget } from "components";

const HomePage = () => {

  const { _id, picturePath } = useSelector(({ auth }) => auth.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <NavBar />

      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>

        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        ></Box>

        {
          isNonMobileScreens && (
            <Box flexBasis="26%"></Box>
          )
        }
      </Box>
    </Box>
  )
}

export default HomePage