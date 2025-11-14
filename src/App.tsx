import {
    AppBar,
    Box,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    useColorScheme,
} from '@mui/material';
import { MyGroup } from './components/Group';
import { useEffect, useState } from 'react';
import type { HomeLabData } from './index';
import dummyData from './dummy';

import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import BrightnessLowIcon from '@mui/icons-material/BrightnessLow';
import BrightnessMediumIcon from '@mui/icons-material/BrightnessMedium';

export interface AppData {
    title: string;
    name: string;
    icon: string;
    data: HomeLabData[];
}

function App() {
    const [themeMode, setThemeMode] = useState<null | HTMLElement>(null);
    const { mode, setMode } = useColorScheme();
    const [data, setData] = useState<HomeLabData>();
    const themeModes = [
        {
            title: 'Dark',
            key: 'dark',
            icon: <BrightnessLowIcon></BrightnessLowIcon>,
        },
        {
            title: 'Light',
            key: 'light',
            icon: <BrightnessHighIcon></BrightnessHighIcon>,
        },
        {
            title: 'System',
            key: 'system',
            icon: <BrightnessMediumIcon></BrightnessMediumIcon>,
        },
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

    const ThemeItem = (item: {
        title: string;
        key: string;
        icon: React.ReactElement;
    }) => {
        const isSelected =
            mode === item.key || (item.key === 'system' && mode === 'system');
        return (
            <MenuItem
                onClick={() => {
                    setMode(item.key as 'light' | 'dark' | 'system');
                    handleClose();
                }}
                selected={isSelected}
                sx={{
                    gap: 1.5,
                    borderRadius: 1,
                    margin: 0.5,
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(25, 118, 210, 0.12)',
                    },
                }}
            >
                {item.icon}
                {item.title}
            </MenuItem>
        );
    };

    const getData = async () => {
        try {
            return await fetch('data/data.json').then((response) =>
                response.json()
            );
        } catch (error) {
            console.error(error);
            return dummyData;
        }
    };

    useEffect(() => {
        getData()
            .then((json) => {
                setData(json);
                setTitle(json?.name);
            })
            .catch((error) => {
                console.error(error);
                setData(dummyData);
                setTitle(dummyData?.name);
            });
    }, []);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                position: 'relative',
                overflow: 'hidden',
                background:
                    'linear-gradient(135deg, #0f2027 0%, #203a43 25%, #2c5364 50%, #1e3c72 75%, #2a5298 100%)',
                backgroundSize: '400% 400%',
                backgroundAttachment: 'fixed',
                animation: 'gradientShift 20s ease infinite',
                '@keyframes gradientShift': {
                    '0%': {
                        backgroundPosition: '0% 50%',
                    },
                    '50%': {
                        backgroundPosition: '100% 50%',
                    },
                    '100%': {
                        backgroundPosition: '0% 50%',
                    },
                },
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                        'radial-gradient(circle at 20% 50%, rgba(100, 150, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(150, 100, 255, 0.1) 0%, transparent 50%)',
                    pointerEvents: 'none',
                    zIndex: 0,
                },
            }}
        >
            <AppBar
                position="sticky"
                sx={{
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                }}
            >
                <Toolbar sx={{ backgroundColor: 'transparent' }}>
                    {data?.icon ? (
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{
                                mr: 2,
                                width: 48,
                                height: 48,
                                borderRadius: 2,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                            onClick={() => {
                                window.open('/', '_self');
                            }}
                        >
                            <img
                                src={data?.icon}
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 8,
                                    objectFit: 'cover',
                                }}
                                alt="Home"
                            />
                        </IconButton>
                    ) : (
                        <></>
                    )}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
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
                            {mode === 'light' ? (
                                <BrightnessHighIcon />
                            ) : mode === 'dark' ? (
                                <BrightnessLowIcon />
                            ) : (
                                <BrightnessMediumIcon />
                            )}
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={themeMode}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(themeMode)}
                            onClose={handleClose}
                        >
                            {themeModes.map((item) => ThemeItem(item))}
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <Container
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    marginTop: 4,
                    marginBottom: 6,
                    paddingX: { xs: 2, sm: 3, md: 4 },
                }}
            >
                {data?.data.map((item, i) => (
                    <MyGroup
                        key={i}
                        title={item.group.title}
                        links={item.links}
                        icon={item.group?.icon}
                    ></MyGroup>
                ))}
            </Container>
        </Box>
    );
}

export default App;
