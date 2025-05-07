import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useColorScheme
} from "@mui/material";
import { MyGroup } from "./components/Group";
import { useEffect, useState } from "react";
import type { HomeLabData } from "./index";
import dummyData from "./dummy";

import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
import BrightnessLowIcon from "@mui/icons-material/BrightnessLow";
import BrightnessMediumIcon from "@mui/icons-material/BrightnessMedium";

function App() {
  const [themeMode, setThemeMode] = useState<null | HTMLElement>(null);
  const { mode, setMode } = useColorScheme();
  const [data, setData] = useState<HomeLabData>();
  const themeModes = [
    {
      title: "Dark",
      key: "dark",
      icon: <BrightnessLowIcon></BrightnessLowIcon>
    },
    {
      title: "Light",
      key: "light",
      icon: <BrightnessHighIcon></BrightnessHighIcon>
    },
    {
      title: "System",
      key: "system",
      icon: <BrightnessMediumIcon></BrightnessMediumIcon>
    }
  ];

  const setTitle = (val: string) => {
    document.title = val;
  };
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setThemeMode(event.currentTarget);
  };

  const handleClose = () => {
    setThemeMode(null);
  };

  const ThemeItem = (item: any) => {
    return (
      <MenuItem
        onClick={() => {
          setMode(item.key);
          handleClose();
        }}
      >
        {item.icon}
        {item.title}
      </MenuItem>
    );
  };

  const getData = () => {
    fetch("data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then((json) => {
        setData(json);
        setTitle(json?.name);
      })
      .catch(function () {
        console.log("load dummy");
        setData(dummyData);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          {data?.icon ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <img src={data?.icon}></img>
            </IconButton>
          ) : (
            <></>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {data?.name}
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="theme setting"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              {mode === "light" ? (
                <BrightnessHighIcon />
              ) : mode === "dark" ? (
                <BrightnessLowIcon />
              ) : (
                <BrightnessMediumIcon />
              )}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={themeMode}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={Boolean(themeMode)}
              onClose={handleClose}
            >
              {themeModes.map((item) => ThemeItem(item))}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 2, marginBottom: 5 }}>
        {data?.data.map((item, i) => (
          <MyGroup
            key={i}
            title={item.group.title}
            links={item.links}
          ></MyGroup>
        ))}
      </Container>
    </Box>
  );
}

export default App;
