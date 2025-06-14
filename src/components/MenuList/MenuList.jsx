import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import MenuItem from "../MenuItem/MenuItem";
import Cart from "../Cart/Cart";
import {useTelegram} from "../../hooks/useTelegram";
import {getMenuItems, makeOrder} from "../../service/ApiService";

const MenuList = () => {
    const {restId} = useParams();
    const {onClose} = useTelegram();

    const [menuItems, setMenuItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("QR");

    useEffect(() => {
        getMenuItems(restId, (data) => setMenuItems(data));
    }, [restId]);

    const onAdd = (food) => {
        const exist = cartItems.find((x) => x.id === food.id);
        if (exist) {
            setCartItems(
                cartItems.map((x) =>
                    x.id === food.id ? {...x, quantity: x.quantity + 1} : x
                )
            );
        } else {
            setCartItems([...cartItems, {...food, quantity: 1}]);
        }
    };

    const onRemove = (food) => {
        const exist = cartItems.find((x) => x.id === food.id);
        if (!exist) return;
        if (exist.quantity === 1) {
            setCartItems(cartItems.filter((x) => x.id !== food.id));
        } else {
            setCartItems(
                cartItems.map((x) =>
                    x.id === food.id ? {...x, quantity: x.quantity - 1} : x
                )
            );
        }
    };

    const handleCheckout = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault(); // чтобы не перезагружалась страница
        console.log("Форма отправилась!");
        // если поля пустые, браузер не вызовет onSubmit
        // и покажет красные подсказки под полями

        const positions = Object.fromEntries(
            cartItems.map(({id, quantity}) => [id, quantity])
        );
        makeOrder({deliveryAddress: address, clientContactPhone: phone, paymentMethod, positions}, () => {
            onClose();
        });
    };

    // const handleSubmit = () => {
    //     const positions = Object.fromEntries(
    //         cartItems.map(({id, quantity}) => [id, quantity])
    //     );
    //     setOpen(false);
    //     makeOrder(
    //         {
    //             deliveryAddress: address,
    //             clientContactPhone: phone,
    //             paymentMethod,
    //             positions
    //         },
    //         () => onClose()
    //     );
    // };

    return (
        <Box sx={{p: 2, bgcolor: "background.default", minHeight: "100vh"}}>
            <Box sx={{p: 2, bgcolor: "background.default", minHeight: "100vh"}}>
                <Typography variant="h5" align="center" gutterBottom>
                    Меню на сегодня
                </Typography>

                {/*────── Сетка CSS Grid ──────*/}
                <Box
                    sx={{
                        display: "grid",
                        gap: 2,
                        // repeat(2,1fr) — 2 одинаковых колонки
                        gridTemplateColumns: {
                            xs: "repeat(2, 1fr)",  // от 0 до 600px — 2 колонки
                            sm: "repeat(3, 1fr)",  // от 600 до 900px — 3
                            md: "repeat(4, 1fr)",  // от 900px и выше — 4
                        },
                    }}
                >
                    {menuItems.map((food) => (
                        <MenuItem
                            key={food.id}
                            food={food}
                            onAdd={onAdd}
                            onRemove={onRemove}
                        />
                    ))}
                </Box>

                <Cart cartItems={cartItems} onCheckout={handleCheckout}/>
            </Box>

            {/*<Cart cartItems={cartItems} onCheckout={handleCheckout}/>*/}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Оформление заказа</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent dividers>
                        <TextField
                            required
                            label="Адрес доставки"
                            name="address"
                            fullWidth
                            margin="normal"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <TextField
                            required
                            label="Номер телефона"
                            name="phone"
                            fullWidth
                            margin="normal"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <FormLabel sx={{mt: 2}}>Способ оплаты</FormLabel>
                        <RadioGroup
                            row
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <FormControlLabel
                                value="QR"
                                control={<Radio/>}
                                label="QR"
                            />
                            <FormControlLabel
                                value="CASH"
                                control={<Radio/>}
                                label="Наличные"
                            />
                        </RadioGroup>
                    </DialogContent>

                    <DialogActions sx={{ p: 2 }}>
                        <Button type="submit" variant="contained" fullWidth>
                            Подтвердить
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
};

export default MenuList;
