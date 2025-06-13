import {useCallback, useEffect, useState} from 'react';
import {authenticate, getToken, introspect, setToken} from '../service/AuthService';
import {useTelegram} from "./useTelegram";

// import { useTelegram } from '../hooks/useTelegram';

export function useAuth() {
    const {tg} = useTelegram();
    const [token, setTok] = useState(getToken());

    // ── первичная инициализация ────────────────────────────
    useEffect(() => {
        (async () => {
            if (!token) {
                await authenticate(tg.initData, (t) => {
                    setTok(t);
                });
            } else {
                await introspect(token, async (ok) => {
                    if (!ok) {
                        await authenticate(tg.initData, (t) => {
                            setTok(t);
                        });
                    }
                });

            }
        })();
    }, [token]);

    // сохраняем в LS при изменении
    useEffect(() => {
        if (token) setToken(token);
    }, [token]);

    // принудительное обновление, пригодится интерсептору 401
    const refreshToken = useCallback(async () => {
        await authenticate(tg.initData, (t) => {
            setTok(t)
        });
    }, [tg.initData]);

    return {token, refreshToken};
}
