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

        const hasHistory = (window.history.state?.idx ?? 0) > 0;

        const isMainPage = location.pathname === '/' || location.pathname === '/restaurants';
        const canGoBack = !isMainPage && hasHistory;
        if (canGoBack) {
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
