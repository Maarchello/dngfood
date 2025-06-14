import React, {useEffect, useState} from "react";
import "./RestaurantList.css";
import "../../Common.css";
import RestaurantItem from "../RestaurantItem/RestaurantItem";
import TopRestaurantItem from "../RestaurantItem/TopRestaurantItem";
import {CircularProgress, InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {getRestaurants} from "../../service/ApiService";

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        getRestaurants((data) => setRestaurants(data.content));
    }, []);

    const filtered = restaurants.filter((r) =>
        (r.name + " " + r.description)
            .toLowerCase()
            .includes(query.trim().toLowerCase())
    );

    const topRestaurants = restaurants.slice(0, 5);

    return (
        <div className="main">
            {/* ── шапка поиска ───────────────────────────────────────────── */}
            <div className="search-bar">
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Найти заведение…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ fontSize: 20 }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>

            {/* ── карусель топов ── */}
            {topRestaurants.length > 0 && (
                <div className="top-scroll">
                    {topRestaurants.map((r) => (
                        <TopRestaurantItem key={r.id} restaurant={r} />
                    ))}
                </div>
            )}

            {/* ── список заведений ──────────────────────────────────────── */}
            {restaurants.length === 0 ? (
                <div className="loader">
                    <CircularProgress />
                </div>
            ) : (
                <div className="list">
                    {filtered.map((item) => (
                        <RestaurantItem key={item.id} restaurant={item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default RestaurantList;
