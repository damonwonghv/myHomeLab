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
    Snackbar,
    Alert,
} from '@mui/material';
import type { LinkType } from '../..';
import { useState, type FC } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LinkIcon from '@mui/icons-material/Link';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import './index.less';

export const MyLink: FC<LinkType> = (props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { mode, systemMode } = useColorScheme();
    const { title, icon, textColor, bgColor, url, subtitle, more } = props;
    const [openMore, setOpenMore] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    const goTo = (url: string) => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    const handleCopyUrl = async () => {
        if (url) {
            try {
                await navigator.clipboard.writeText(url);
                setCopySuccess(true);
            } catch (err) {
                console.error('Failed to copy URL:', err);
            }
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent, action: () => void) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            action();
        }
    };

    const Icon = (iconUrl: string | undefined) => {
        if (!iconUrl) return null;

        if (imageError) {
            return (
                <Box
                    className="link-icon-fallback"
                    sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        color: 'text.secondary',
                        fontSize: '1.5rem',
                        fontWeight: 600,
                    }}
                >
                    {title.charAt(0).toUpperCase()}
                </Box>
            );
        }

        return (
            <img
                className="link-icon-style"
                style={{ width: 50, height: 50, objectFit: 'cover' }}
                src={iconUrl}
                alt={`${title} icon`}
                onError={() => setImageError(true)}
                loading="lazy"
            />
        );
    };
    const isLightMode =
        mode === 'light' || (mode === 'system' && systemMode === 'light');

    return (
        <>
            <Tooltip
                title={subtitle ? `${title} - ${subtitle}` : title}
                arrow
                placement="top"
            >
                <Box
                    className={`link ${isLightMode ? 'link-light' : ''}`}
                    sx={{
                        width: '100%',
                        minHeight: 100,
                        backgroundColor: bgColor,
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open ${title}`}
                    onKeyDown={(e) => handleKeyPress(e, () => goTo(url))}
                >
                    <Box
                        className="link-content"
                        onClick={() => goTo(url)}
                        onKeyDown={(e) => handleKeyPress(e, () => goTo(url))}
                    >
                        {icon && <Box className="link-icon">{Icon(icon)}</Box>}

                        <Box className="link-title">
                            <Typography
                                className="link-title-text"
                                variant="body1"
                                sx={{
                                    color: textColor || 'text.primary',
                                    fontWeight: 600,
                                }}
                            >
                                {title}
                            </Typography>
                            {subtitle && (
                                <Typography
                                    className="link-subtitle-text"
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        opacity: 0.8,
                                    }}
                                >
                                    {subtitle}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                    {more && (
                        <Box className="link-more">
                            <IconButton
                                size="small"
                                edge="end"
                                color="inherit"
                                aria-label="more options"
                                aria-haspopup="true"
                                sx={{
                                    opacity: 0.7,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        opacity: 1,
                                        backgroundColor:
                                            'rgba(255, 255, 255, 0.15)',
                                        transform: 'scale(1.1)',
                                    },
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenMore(true);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.stopPropagation();
                                        setOpenMore(true);
                                    }
                                }}
                            >
                                <MoreVertIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    )}
                </Box>
            </Tooltip>
            <Dialog
                open={openMore}
                fullScreen={fullScreen}
                onClose={() => setOpenMore(false)}
                PaperProps={{
                    sx: {
                        borderRadius: fullScreen ? 0 : 3,
                        background: isLightMode
                            ? 'rgba(255, 255, 255, 0.95)'
                            : 'rgba(18, 18, 18, 0.95)',
                        backdropFilter: 'blur(20px)',
                        maxWidth: { xs: '100%', sm: '500px' },
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        fontWeight: 600,
                        fontSize: '1.5rem',
                        paddingBottom: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    {icon && !imageError && (
                        <Box
                            component="img"
                            src={icon}
                            alt=""
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: 1,
                                objectFit: 'cover',
                            }}
                            onError={() => setImageError(true)}
                        />
                    )}
                    {title}
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={3} sx={{ marginTop: 1 }}>
                        <Box>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 600,
                                    marginBottom: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                <LinkIcon fontSize="small" />
                                URL
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    flexWrap: 'wrap',
                                }}
                            >
                                <Link
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        wordBreak: 'break-all',
                                        color: 'primary.main',
                                        textDecoration: 'none',
                                        flex: 1,
                                        minWidth: 0,
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    {url}
                                </Link>
                                <Tooltip title="Copy URL" arrow>
                                    <IconButton
                                        size="small"
                                        onClick={handleCopyUrl}
                                        sx={{
                                            flexShrink: 0,
                                        }}
                                    >
                                        <ContentCopyIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Open in new tab" arrow>
                                    <IconButton
                                        size="small"
                                        onClick={() => goTo(url)}
                                        sx={{
                                            flexShrink: 0,
                                        }}
                                    >
                                        <OpenInNewIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                        {subtitle && (
                            <Box>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 600,
                                        marginBottom: 1,
                                    }}
                                >
                                    Description
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {subtitle}
                                </Typography>
                            </Box>
                        )}
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ padding: 3, gap: 1 }}>
                    <Button
                        onClick={() => setOpenMore(false)}
                        variant="outlined"
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            paddingX: 3,
                        }}
                    >
                        Close
                    </Button>
                    <Button
                        onClick={() => {
                            goTo(url);
                            setOpenMore(false);
                        }}
                        variant="contained"
                        startIcon={<OpenInNewIcon />}
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            paddingX: 3,
                        }}
                    >
                        Open Link
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={copySuccess}
                autoHideDuration={2000}
                onClose={() => setCopySuccess(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setCopySuccess(false)}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    URL copied to clipboard!
                </Alert>
            </Snackbar>
        </>
    );
};
