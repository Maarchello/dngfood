import React from 'react';
import './MenuItem.css';
import {Card, CardContent, CardMedia, Typography} from "@mui/material";

const MenuItem = ({menuItem, className}) => {

    return (
        <div>

            <Card sx={{ minWidth: 350 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={menuItem.photo}
                    alt="menuItem.name"
                />
                <CardContent>
                    <Typography variant="h6" color="text.primary">
                        {menuItem.name}
                    </Typography>

                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {menuItem.description}
                    </Typography>

                    <Typography variant="body1" className={'price'}>
                        {menuItem.price} ₽
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default MenuItem;