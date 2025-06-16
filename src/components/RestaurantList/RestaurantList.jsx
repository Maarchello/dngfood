import React, {useEffect, useState} from "react";
import {Box, CircularProgress, InputAdornment, TextField, Typography, useTheme,} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RestaurantItem from "../RestaurantItem/RestaurantItem";

import {filesUrl, getRestaurants} from "../../service/ApiService";

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [query, setQuery] = useState("");
    const theme = useTheme();

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
        <Box
            sx={{
                bgcolor: "background.default",
                minHeight: "100vh",
                p: 2,
            }}
        >
            {/* Search bar */}
            <Box
                sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    mb: 2,
                    background: "background.default",
                }}
            >
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Найти заведение…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                        sx: {
                            bgcolor: "background.paper",
                        },
                    }}
                />
            </Box>

            {/* Top carousel */}
            {topRestaurants.length > 0 && (
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        overflowX: "auto",
                        mb: 3,
                        pb: 1,
                        "&::-webkit-scrollbar": { display: "none" },
                    }}
                >
                    {topRestaurants.map((r) => (
                        <Box
                            key={r.id}
                            sx={{
                                flex: "0 0 110px",
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                                cursor: "pointer",
                            }}
                            onClick={() =>
                                window.open(`/restaurants/${r.id}/menu`, "_self")
                            }
                        >
                            <Box
                                component="img"
                                src={r.photo ? filesUrl + r.photo : "/logo512.png"}
                                alt={r.name}
                                sx={{
                                    width: 88,
                                    height: 88,
                                    borderRadius: 1,
                                    objectFit: "cover",
                                    mb: 0.5,
                                }}
                            />
                            <Typography
                                variant="caption"
                                noWrap
                                sx={{ color: "text.primary", textAlign: "center" }}
                            >
                                {r.name}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}

            {/* Loader or list */}
            {restaurants.length === 0 ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 4,
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {filtered.map((item) => (
                        <RestaurantItem key={item.id} restaurant={item} />
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default RestaurantList;
