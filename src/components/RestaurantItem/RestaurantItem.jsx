import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Typography,} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {filesUrl} from "../../service/ApiService";

const RestaurantItem = ({ restaurant }) => {
    const navigate = useNavigate();
    const onMenu = () => navigate(`/restaurants/${restaurant.id}/menu`);

    return (
        <Card
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '20px'
            }}
            elevation={3}
        >
            <CardMedia
                component="img"
                height="160"
                image={filesUrl + restaurant.photo || '/no-image.png'}
                alt={restaurant.name}
                onError={(e) => { e.target.onerror = null; e.target.src = '/no-image.png'; }}
                sx={{ objectFit: 'cover' }}
            />

            <CardContent sx={{ flexGrow: 1, pt: 2 }}>
                <Typography variant="h5" gutterBottom noWrap>
                    {restaurant.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                    {restaurant.description}
                </Typography>
            </CardContent>

            <CardActions>
                <Button fullWidth variant="contained" onClick={onMenu}>
                    Меню
                </Button>
            </CardActions>
        </Card>
    );
};

export default RestaurantItem;
