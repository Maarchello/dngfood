import React, {useState} from 'react';
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HistoryIcon from '@mui/icons-material/History';
import WalletIcon from '@mui/icons-material/Wallet';
import StoreIcon from '@mui/icons-material/Store';
import BackpackIcon from '@mui/icons-material/Backpack';
import {useNavigate} from "react-router-dom";
import {LeaderboardOutlined} from "@mui/icons-material";
import ScoreIcon from '@mui/icons-material/Score';

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