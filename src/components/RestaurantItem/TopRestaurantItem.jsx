// src/components/TopRestaurantItem/TopRestaurantItem.jsx
import React from "react";
import {useNavigate} from "react-router-dom";
import "./TopRestaurantItem.css";
import {filesUrl} from "../../service/ApiService";

const TopRestaurantItem = ({ restaurant }) => {
    const navigate = useNavigate();
    return (
        <div className="top-card" onClick={() =>
            navigate(`/restaurants/${restaurant.id}/menu`)
        }>
            <img
                src={filesUrl + restaurant.photo}
                alt={restaurant.name}
                onError={(e) => {
                    e.target.onerror = null;
                }}
            />
            <p>{restaurant.name}</p>
        </div>
    );
};

export default TopRestaurantItem;
