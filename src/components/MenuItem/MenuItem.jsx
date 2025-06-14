import React, {useState} from "react";
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {filesUrl} from "../../service/ApiService";

const MenuItem = ({ food, onAdd, onRemove }) => {
    const theme = useTheme();
    const [count, setCount] = useState(0);
    const { name, photo, price } = food;

    const inc = () => {
        setCount((q) => q + 1);
        onAdd(food);
    };
    const dec = () => {
        if (count > 0) {
            setCount((q) => q - 1);
            onRemove(food);
        }
    };

    return (
        <Box
            sx={{
                position: "relative",
                bgcolor: theme.palette.cardBg,
                borderRadius: 2,
                boxShadow: 1,
                overflow: "hidden",
            }}
        >
            {/* ── Вот здесь рисуем кружок с количеством ── */}
            {count > 0 && (
                <Box
                    sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        minWidth: 30,
                        height: 30,
                        px: 0.5,
                        borderRadius: "50%",
                        bgcolor: theme.palette.primary.light,
                        // color: "#fff",
                        color: theme.palette.primary.contrastText,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 2,
                    }}
                >
                    {count}
                </Box>
            )}

            {/* картинка */}
            <Box
                component="img"
                src={filesUrl + photo}
                alt={name}
                onError={(e) => (e.target.src = "/no-image.png")}
                sx={{
                    width: "100%",
                    height: 140,
                    objectFit: "cover",
                }}
            />

            {/* контент */}
            <Box sx={{ p: 2, pt: 1 }}>
                <Typography
                    variant="subtitle2"
                    noWrap
                    sx={{ fontWeight: 600, color: "text.primary" }}
                >
                    {name}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mt: 0.5 }}
                >
                    VND {price.toLocaleString("vi-VN")}
                </Typography>
            </Box>

            {/* кнопка «+» */}
            <IconButton
                onClick={inc}
                size="small"
                sx={{
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                    bgcolor: theme.palette.success.main,
                    color: "#fff",
                    "&:hover": { bgcolor: theme.palette.success.dark },
                }}
            >
                <AddIcon />
            </IconButton>

            {/* кнопка «−» */}
            {count > 0 && (
                <IconButton
                    onClick={dec}
                    size="small"
                    sx={{
                        position: "absolute",
                        bottom: 8,
                        right: 56,
                        bgcolor: theme.palette.error.main,
                        color: "#fff",
                        "&:hover": { bgcolor: theme.palette.error.dark },
                    }}
                >
                    <RemoveIcon />
                </IconButton>
            )}
        </Box>
    );
};

export default MenuItem;
