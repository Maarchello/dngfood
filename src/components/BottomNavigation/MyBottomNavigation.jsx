import React from 'react';
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HistoryIcon from '@mui/icons-material/History';
import {useLocation, useNavigate} from "react-router-dom";


const pathToValueMap = {
    '/orders': 'Orders',
    '/restaurants': 'Restaurants',
    '/': 'Restaurants',
};

const valueToPathMap = {
    Orders: '/orders',
    Restaurants: '/restaurants'
};

const MyBottomNavigation = () => {

    let navigate = useNavigate();
    let location = useLocation();

    const currentValue = pathToValueMap[location.pathname] || null;

    return (
        <BottomNavigation
            sx={{width: "100%", position: "fixed", bottom: 0, zIndex: 10}}
            value={currentValue}
            onChange={(event, newValue) => {
                const path = valueToPathMap[newValue];
                if (path) {
                    navigate(path);
                }
            }}
        >
            <BottomNavigationAction value="Restaurants" label="Заведения" icon={<RestaurantIcon/>}
                                    onClick={() => navigate("/restaurants")} />

            <BottomNavigationAction value="Orders" label="Заказы" icon={<HistoryIcon/>}
                                    onClick={() => navigate("/orders")}/>

        </BottomNavigation>
    );
}

export default MyBottomNavigation;