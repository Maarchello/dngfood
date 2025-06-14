import React from "react";
import {Box, Typography, useTheme} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import {useNavigate} from "react-router-dom";
import {filesUrl} from "../../service/ApiService";

const RestaurantItem = ({ restaurant }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const rating = restaurant.rating;

    return (
        <Box
            onClick={() => navigate(`/restaurants/${restaurant.id}/menu`)}
            sx={{
                display: "flex",
                gap: 2,
                p: 2,
                borderRadius: 2,
                boxShadow: 1,
            }}
        >
            {/* Картинка */}
            <Box
                component="img"
                src={filesUrl + restaurant.photo}
                alt={restaurant.name}
                onError={(e) => { e.target.onerror = null; }}
                sx={{
                    width: 88,
                    height: 88,
                    borderRadius: 1,
                    objectFit: "cover",
                    flexShrink: 0,
                }}
            />

            {/* Инфо */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 0.5,
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        noWrap
                        sx={{ fontWeight: 600 }}
                    >
                        {restaurant.name}
                    </Typography>

                    {rating ? (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                typography: "body2",
                                gap: 0.5,
                            }}
                        >
                            <StarIcon fontSize="small" />
                            {rating.toFixed(1)}
                        </Box>
                    ) : (
                        <Typography
                            variant="caption"
                            sx={{ fontWeight: 700 }}
                        >
                            NEW
                        </Typography>
                    )}
                </Box>

                <Typography variant="body2" noWrap>
                    {restaurant.description}
                </Typography>
            </Box>
        </Box>
    );
};

export default RestaurantItem;
