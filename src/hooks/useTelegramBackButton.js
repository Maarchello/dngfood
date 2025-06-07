import {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

export const useTelegramBackButton = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const tg = window.Telegram?.WebApp;

        if (!tg?.BackButton) return;

        const handleBack = () => {
            navigate(-1); // вернуть на предыдущую страницу
        };

        // показать кнопку, если не на главной
        const isMainPage =
            location.pathname === '/' || location.pathname === '/restaurants';
        if (!isMainPage) {
            tg.BackButton.onClick(handleBack);
            tg.BackButton.show();
        } else {
            tg.BackButton.hide();
            tg.BackButton.offClick(handleBack);
        }

        return () => {
            tg.BackButton.offClick(handleBack);
        };
    }, [location, navigate]);
};
