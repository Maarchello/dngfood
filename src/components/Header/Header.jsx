import React from 'react';
import {AppBar, IconButton, Toolbar, Typography} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useLocation, useNavigate} from 'react-router-dom';

const getTitleFromPath = (pathname) => {
    if (pathname.includes('/menu')) return 'Меню';
    if (pathname === '/' || pathname.startsWith('/restaurants')) return 'Заведения';
    return '';
};

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const title = getTitleFromPath(location.pathname);

    const handleBack = () => navigate(-1);

    const hideBack = location.pathname === '/' || location.pathname === '/restaurants';

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                {!hideBack && (
                    <IconButton edge="start" color="inherit" onClick={handleBack}>
                        <ArrowBackIcon />
                    </IconButton>
                )}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
