import React, {useState} from 'react';
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HistoryIcon from '@mui/icons-material/History';
import {useNavigate} from "react-router-dom";

const MyBottomNavigation = () => {
    const [value, setValue] = useState('Lotteries');

    let navigate = useNavigate();

    return (
        <BottomNavigation
            sx={{width: "100%", position: "fixed", bottom: 0, zIndex: 10}}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        >
            <BottomNavigationAction value="Restaurants" label="Restaurants" icon={<RestaurantIcon/>}
                                    onClick={() => navigate("/restaurants")} />

            <BottomNavigationAction value="Bookings" label="Bookings" icon={<HistoryIcon/>}
                                    onClick={() => navigate("/bookings")}/>

            {/*<BottomNavigationAction value="Profile" label="Profile" icon={<AccountCircleIcon/>}*/}
            {/*                        onClick={() => navigate("/profile")}/>*/}
        </BottomNavigation>
    );
}

export default MyBottomNavigation;