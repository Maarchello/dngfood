import React, {useState} from 'react';
import './RestaurantItem.css'
import '../../Common.css'

import {useNavigate} from 'react-router-dom';
import {useTelegram} from "../../hooks/useTelegram";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia, Collapse,
    IconButton,
    IconButtonProps,
    styled,
    Typography
} from "@mui/material";
import {getRestaurantLocation} from "../../service/ApiService";


const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const RestaurantItem = ({restaurant, className}) => {

    const navigate = useNavigate();

    const onMenuHandler = () => {
        navigate(`/restaurants/${restaurant.id}/menu`);
    }

    return (

        <div>
            <Card sx={{ minWidth: 350 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={restaurant.photo}
                        alt={restaurant.name}
                    />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {restaurant.name}
                    </Typography>
                    <Typography sx={{mb: 1.5}} variant="h7" color="text.secondary">
                        {restaurant.description}<br/>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button fullWidth={true} onClick={onMenuHandler}>Меню</Button>
                </CardActions>

            </Card>

        </div>
    );
};

export default RestaurantItem;