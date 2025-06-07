import React, {useEffect, useState} from 'react';
import './MenuList.css'
import '../../Common.css'

import MenuItem from "../MenuItem/MenuItem";
import {useParams} from 'react-router-dom';
import {getMenuItems, makeOrder} from "../../service/ApiService";
import {
    Box, Tab, Tabs, Typography, Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel, Button
} from "@mui/material";
import MenuItem2 from "../MenuItem/MenuItem2";
import Cart from "../Cart/Cart";
import {} from '@mui/material';

function CustomTabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 0}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const MenuList = () => {
    const {restId} = useParams();

    const [cartItems, setCartItems] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [value, setValue] = useState(0);

    const [openDialog, setOpenDialog] = useState(false);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('qr');

    useEffect(() => {
        getMenuItems(restId, (data) => {
            setMenuItems(data);
        })
    }, []);

    const onAdd = (food) => {
        const exist = cartItems.find((x) => x.id === food.id);
        if (exist) {
            setCartItems(
                cartItems.map((x) =>
                    x.id === food.id ? {...exist, quantity: exist.quantity + 1} : x
                )
            );
        } else {
            setCartItems([...cartItems, {...food, quantity: 1}]);
        }
    }
    const onRemove = (food) => {
        const exist = cartItems.find((x) => x.id === food.id);
        if (exist.quantity === 1) {
            setCartItems(cartItems.filter((x) => x.id !== food.id));
        } else {
            setCartItems(
                cartItems.map((x) =>
                    x.id === food.id ? {...exist, quantity: exist.quantity - 1} : x
                )
            );
        }
    }

    const onCheckout = () => {
        setOpenDialog(true);
    }

    const handleSubmitOrder = () => {

        const positions = Object.fromEntries(
            cartItems.map(({ id, quantity }) => [id, quantity])
        );

        setOpenDialog(false);

        let payload = {
            deliveryAddress: address,
            clientContactPhone: phone,
            paymentMethod: paymentMethod,
            positions: positions

        }
        makeOrder(payload, () => {
            console.log('success')
        })
    };


    return (
        <>
            <h1 className="heading" align="center">Меню на сегодня</h1>
            <Cart cartItems={cartItems} onCheckout={onCheckout}/>
            <div className="menu_items_container">
                {menuItems.map((menuItem) => {
                    return (
                        <MenuItem2 food={menuItem} key={menuItem.id} onAdd={onAdd} onRemove={onRemove}/>
                    );
                })}
            </div>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Оформление заказа</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Адрес доставки"
                        fullWidth
                        margin="normal"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <TextField
                        label="Номер телефона"
                        fullWidth
                        margin="normal"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <FormLabel component="legend" sx={{mt: 2}}>Способ оплаты</FormLabel>
                    <RadioGroup
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <FormControlLabel value="QR" control={<Radio/>} label="QR"/>
                        <FormControlLabel value="CASH" control={<Radio/>} label="Наличные"/>
                    </RadioGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmitOrder} variant="contained" fullWidth>
                        Подтвердить
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );

};

export default MenuList;