import React, {useEffect, useState} from 'react';
import './RestaurantList.css'
import '../../Common.css'
import RestaurantItem from "../RestaurantItem/RestaurantItem";
import {Box, CircularProgress, Tab, Tabs, Typography} from "@mui/material";
import {getRestaurants} from "../../service/ApiService";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            className={'pad'}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && (
                <Box sx={{ p: 0 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const RestaurantList = () => {

    const [restaurants, setRestaurants] = useState([]);
    const [value, setValue] = useState(0);


    useEffect(() => {
        getRestaurants((data) => {
            setRestaurants(data.content);
        })
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={'main'}>

            <div>
                {restaurants.length === 0 ? (
                    <CircularProgress />
                ) : (
                    <div className="list">
                        {restaurants.map(item => (
                            <RestaurantItem key={item.id} restaurant={item} />
                        ))}
                    </div>
                )}
            </div>


        </div>
    );
};

export default RestaurantList;