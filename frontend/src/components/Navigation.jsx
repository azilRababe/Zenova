import React, { useState, useEffect } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

import logo from "../assets/images/logo.svg"; //logo

import { useSelector } from "react-redux"; //user

// topbar
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { CiCircleMore } from "react-icons/ci";
import { Divider } from "@mui/material";
// modal
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const Navigation = () => {
  const [value, setValue] = React.useState(0);
  // Auth user
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  // modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <BottomNavigation>
          <Link align="center" alignSelf={"center"} href="/">
            <img src={logo} alt="" size={"sm"} />
          </Link>
        </BottomNavigation>
      </Box>
      <Divider />
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Search"
          icon={<BsSearch size="23px" />}
          onClick={handleOpen}
        />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TextField
              id="Search"
              label="Search"
              variant="outlined"
              fullWidth
            />
          </Box>
        </Modal>
        <BottomNavigationAction
          label="Cart"
          icon={<AiOutlineShoppingCart size="23px" />}
        />
        <BottomNavigationAction
          label="Sign in"
          icon={<BiUserCircle size="23px" />}
          href="/signin"
        />
        <BottomNavigationAction
          label="Explore"
          icon={<CiCircleMore size="23px" />}
        />
      </BottomNavigation>
    </>
  );
};
