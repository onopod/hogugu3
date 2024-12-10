import MenuIcon from '@mui/icons-material/Menu';
import SpaIcon from '@mui/icons-material/Spa';
import { AppBar, Avatar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import * as React from 'react';


function MyAppBar() {
  const router = useRouter();
  const { data: session } = useSession();

  const [anchorEl, setAnchorEl] = React.useState(null);
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
            <IconButton
              size="large"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <SpaIcon sx={{ display: "flex", mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              display: "flex",
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
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
              <Avatar alt={session?.user?.name ? session.user.name[0] : "profile"}>
                {session?.user?.name ? session.user.name[0].toUpperCase() : ""}
              </Avatar>
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
              {session ? (
                <div key={1}>
                  <MenuItem onClick={() => router.push("/profile")}>プロフィール</MenuItem>
                  <MenuItem onClick={() => signOut()}>ログアウト</MenuItem>
                </div>
              )
                :
                <MenuItem onClick={() => signIn()}>ログイン</MenuItem>
              }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  );
}
export default MyAppBar;
