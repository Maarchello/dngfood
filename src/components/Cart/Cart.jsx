// import React from "react";
// import "./Cart.css";
// import Button from "../Button/Button";
// function Cart({ cartItems, onCheckout }) {
//     const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
//
//     return (
//         <div className="cart__container">
//             <br /> <span className="">Стоимость: {totalPrice.toFixed(2)} VND</span>
//             <Button
//                 title={`${cartItems.length === 0 ? "Выберите еду" : "Заказать!"} `}
//                 type={"checkout"}
//                 disable={cartItems.length === 0}
//                 onClick={onCheckout}
//             />
//         </div>
//     );
// }
//
// export default Cart;


// src/components/Cart/Cart.jsx
import React from "react";
import "./Cart.css";

const Cart = ({ cartItems, onCheckout }) => {
    if (!cartItems.length) return null;        // ничего не выбрано — ничего не рендерим

    const totalQty   = cartItems.reduce((s, p) => s + p.quantity, 0);
    const totalPrice = cartItems.reduce((s, p) => s + p.quantity * p.price, 0);

    return (
        <div className="basket-bar" onClick={onCheckout}>
      <span className="basket-title">
        Корзина • {totalQty} {totalQty === 1 ? "item" : "items"}
      </span>
            <span className="basket-price">
        {totalPrice.toLocaleString("vi-VN")}đ
      </span>
        </div>
    );
};

export default Cart;
