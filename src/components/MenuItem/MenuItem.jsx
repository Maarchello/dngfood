import React, {useState} from "react";
import "./MenuItem.css";
import Button from "../Button/Button";
import {filesUrl} from "../../service/ApiService";

function MenuItem({ food, onAdd, onRemove }) {
    const [count, setCount] = useState(0);
    const { name, photo, price, id } = food;

    const handleIncrement = () => {
        setCount(count + 1);
        onAdd(food);
    };
    const handleDecrement = () => {
        setCount(count - 1);
        onRemove(food);
    };

    return (
        <div className="card">
      <span
          className={`${count !== 0 ? "card__badge" : "card__badge--hidden"}`}
      >
        {count}
      </span>
            <div className="image__container">
                <img src={filesUrl + photo} alt={name} />
            </div>
            <h4 className="card__title">
                {name} . <span className="card__price">VND {price}</span>
            </h4>

            <div className="btn-container">
                <Button title={"+"} type={"add"} onClick={handleIncrement} />
                {count !== 0 ? (
                    <Button title={"-"} type={"remove"} onClick={handleDecrement} />
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}

export default MenuItem;