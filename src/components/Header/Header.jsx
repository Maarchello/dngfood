import React from 'react';
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css'
import {useLocation, useNavigate} from "react-router-dom";

const Header = () => {

    const {onClose} = useTelegram();
    const location = useLocation();
    const navigate = useNavigate();
    const onBack = () => {
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
        } else {
            navigate('/', {replace: true})
        }
    }

    let isMainLocation = location.pathname === `/`;

    return (
        <div className={'header'}>
            <Button onClick={isMainLocation ? onClose : onBack}>{isMainLocation ? 'Закрыть' : 'Назад'}</Button>
        </div>
    );
};

export default Header;