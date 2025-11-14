import { useState, type FC } from 'react';
import type { LinkType } from '../../index.d';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Collapse,
    Grid,
    IconButton,
    styled,
    Typography,
    useColorScheme,
    type IconButtonProps,
} from '@mui/material';
import { MyLink } from '../Link';
import './index.less';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface GroupProps {
    title: string;
    links: LinkType[];
    icon?: string;
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));

export const MyGroup: FC<GroupProps> = (props) => {
    const { mode, systemMode } = useColorScheme();
    const { title, links, icon } = props;
    const [expanded, setExpanded] = useState(true);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Box className="group">
            <Card
                className={`group-card ${mode === 'light' ? 'group-card-light' : mode === 'system' ? (systemMode === 'light' ? 'group-card-light' : '') : ''}`}
            >
                <CardHeader
                    sx={{ backgroundColor: 'transparent', minHeight: 50 }}
                    avatar={
                        icon ? (
                            <Box
                                sx={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    padding: 1,
                                }}
                            >
                                <img
                                    src={icon}
                                    width={48}
                                    height={48}
                                    style={{
                                        objectFit: 'contain',
                                        borderRadius: 8,
                                    }}
                                    alt={title}
                                />
                            </Box>
                        ) : (
                            ''
                        )
                    }
                    title={
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                fontWeight: 600,
                                fontSize: { xs: '1.25rem', md: '1.5rem' },
                            }}
                        >
                            {title}
                        </Typography>
                    }
                    action={
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            sx={{
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    }
                ></CardHeader>
                <Collapse
                    in={expanded}
                    timeout="auto"
                    unmountOnExit
                    sx={{ backgroundColor: 'transparent', minHeight: 50 }}
                >
                    <CardContent
                        sx={{
                            paddingTop: 0,
                            backgroundColor: 'transparent',
                            minHeight: 50,
                        }}
                    >
                        <Grid
                            container
                            spacing={{ xs: 2, sm: 2.5, md: 3 }}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                            {links.map((item, i) => (
                                <Grid size={{ xs: 4, sm: 4, md: 4 }} key={i}>
                                    <MyLink
                                        title={item.title}
                                        url={item.url}
                                        bgColor={item.bgColor}
                                        icon={item.icon}
                                        subtitle={item.subtitle}
                                        textColor={item.textColor}
                                        more={item.more}
                                    ></MyLink>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Collapse>
            </Card>
        </Box>
    );
};
