import React from "react";
import "./Cart.css";
import Button from "../Button/Button";
function Cart({ cartItems, onCheckout }) {
    const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);

    return (
        <div className="cart__container">
            <br /> <span className="">Стоимость: {totalPrice.toFixed(2)} VND</span>
            <Button
                title={`${cartItems.length === 0 ? "Выберите еду" : "Заказать!"} `}
                type={"checkout"}
                disable={cartItems.length === 0}
                onClick={onCheckout}
            />
        </div>
    );
}

export default Cart;