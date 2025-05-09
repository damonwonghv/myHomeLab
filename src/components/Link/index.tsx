import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Link,
    Stack,
    Tooltip,
    Typography,
    useColorScheme,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import type { LinkType } from '../..';
import { useState, type FC } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LinkIcon from '@mui/icons-material/Link';
import './index.less';

export const MyLink: FC<LinkType> = (props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { mode, systemMode } = useColorScheme();
    const { title, icon, textColor, bgColor, url, subtitle, more } = props;
    const [openMore, setOpenMore] = useState(false);
    const goTo = (url: string) => {
        window.open(url, '_blank');
    };
    const Icon = (url: string | undefined) => {
        if (url) return <img className="link-icon-style" src={url}></img>;
        else return <></>;
    };
    return (
        <>
            <Tooltip title={title} arrow>
                <Box
                    className={`link ${mode === 'light' ? 'link-light' : mode === 'system' ? (systemMode === 'light' ? 'link-light' : '') : ''}`}
                    sx={{ width: '100%', backgroundColor: bgColor }}
                >
                    <Box
                        className="link-content"
                        onClick={() => {
                            goTo(url);
                        }}
                    >
                        {icon ? (
                            <Box className="link-icon">{Icon(icon)}</Box>
                        ) : (
                            <></>
                        )}

                        <Box className="link-title">
                            <Typography
                                noWrap
                                className="link-title-text"
                                variant="body1"
                                sx={{ color: textColor || 'text.secondary' }}
                            >
                                {title}
                            </Typography>
                            <Typography
                                className="link-subtitle-text"
                                variant="body2"
                                sx={{ color: 'text.secondary' }}
                            >
                                {subtitle}
                            </Typography>
                        </Box>
                    </Box>
                    {more ? (
                        <Box className="link-more">
                            <IconButton
                                size="large"
                                edge="end"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={() => {
                                    setOpenMore(true);
                                }}
                            >
                                <MoreVertIcon />
                            </IconButton>
                        </Box>
                    ) : (
                        <></>
                    )}
                </Box>
            </Tooltip>
            <Dialog open={openMore} fullScreen={fullScreen}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <Box className="link-more-url">
                            <Box className="link-more-url-icon">
                                <LinkIcon></LinkIcon>
                            </Box>
                            <Box className="link-more-url-title">URL: </Box>
                            <Link href={url} target="_blank">
                                {url}
                            </Link>
                        </Box>
                        <Box className="link-more-subtitle">
                            <Box className="link-more-subtitle-title">
                                Subtitle:{' '}
                            </Box>
                            <p>{subtitle}</p>
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenMore(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
