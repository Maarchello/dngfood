import React, {useEffect, useState} from 'react';
import './RestaurantList.css'
import '../../Common.css'
import RestaurantItem from "../RestaurantItem/RestaurantItem";
import {CircularProgress} from "@mui/material";
import {getRestaurants} from "../../service/ApiService";

const RestaurantList = () => {

    const [restaurants, setRestaurants] = useState([]);


    useEffect(() => {
        getRestaurants((data) => {
            setRestaurants(data.content);
        })
    }, []);

    return (
        <div className={'main'}>

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
    );
};

export default RestaurantList;