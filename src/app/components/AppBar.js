"use client"

import { DrawerListContainer } from '@/app/components';
import { SpaIcon } from '@/app/icons';
import { AppBar, Avatar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useState } from "react";


function MyAppBar() {
  const router = useRouter();
  const { data: session } = useSession();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="static">
      <Container maxWidth="sm">
        <Toolbar disableGutters>

          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <DrawerListContainer />
          </Box>
          <SpaIcon sx={{ display: "flex", mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            onClick={() => router.push("/")}
            sx={{
              display: "flex",
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: "pointer",
            }}
          >Hogugu</Typography>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton sx={{ p: 0 }}
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              {session?.user?.role == "user" ? (
                <Avatar alt={session.user.name[0]}
                  src={session.user.image ? `/userImg/${session.user.id}/${session.user.image}` : ""}>
                  {session.user.name[0].toUpperCase()}
                </Avatar>
              )
                :
                <Avatar alt="profile" />
              }
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              {session?.user?.role == "user" ? (
                <div key={1}>
                  <MenuItem onClick={() => router.push("/profile")}>プロフィール</MenuItem>
                  <MenuItem onClick={() => signOut("user")}>ログアウト</MenuItem>
                </div>
              )
                :
                <div key={2}>
                  <MenuItem onClick={() => router.push("/register")}>新規登録</MenuItem>
                  <MenuItem onClick={() => signIn("user")}>ログイン</MenuItem>
                </div>
              }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  );
}
export default MyAppBar;