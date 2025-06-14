// src/components/RestaurantItem/RestaurantItem.jsx
import React from "react";
import {useNavigate} from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import "./RestaurantItem.css";
import {filesUrl} from "../../service/ApiService";

const RestaurantItem = ({ restaurant }) => {
    const navigate = useNavigate();
    const openMenu = () => navigate(`/restaurants/${restaurant.id}/menu`);

    // заглушка рейтинга (если поля нет — показываем «NEW»)
    const rating = restaurant.rating ?? null;

    return (
        <div className="rest-item" onClick={openMenu}>
            <img
                src={filesUrl + restaurant.photo}
                alt={restaurant.name}
                onError={(e) => {
                    e.target.onerror = null;
                }}
            />

            <div className="rest-info">
                <div className="rest-top">
                    <h4 className="rest-name">{restaurant.name}</h4>

                    {rating ? (
                        <span className="rest-rating">
              <StarIcon fontSize="inherit" />
                            {rating.toFixed(1)}
            </span>
                    ) : (
                        <span className="rest-new">NEW</span>
                    )}
                </div>

                <p className="rest-desc">{restaurant.description}</p>

                {/* при необходимости сюда можно добавить «from 30 mins • 12 000đ» */}
            </div>
        </div>
    );
};

export default RestaurantItem;
