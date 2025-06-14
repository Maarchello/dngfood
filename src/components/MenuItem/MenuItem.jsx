import React, {useState} from "react";
import "./MenuItem.css";
import {filesUrl} from "../../service/ApiService";

function MenuItem({ food, onAdd, onRemove }) {
    const [count, setCount] = useState(0);
    const { name, photo, price } = food;

    const add = () => {
        setCount((c) => c + 1);
        onAdd(food);
    };
    const remove = () => {
        setCount((c) => c - 1);
        onRemove(food);
    };

    return (
        <div className="card">
            {count > 0 && <span className="card__badge">{count}</span>}

            <div className="image">
                <img src={filesUrl + photo} alt={name} />
            </div>

            <div className="info">
                <p className="info__name">{name}</p>
                <p className="info__price">VND {price}</p>
            </div>

            <button className="btn-add" onClick={add}>+</button>
            {count > 0 && (
                <button className="btn-remove" onClick={remove}>−</button>
            )}
        </div>
    );
}

export default MenuItem;
