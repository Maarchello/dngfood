import './App.css';
import React, {useEffect, useMemo, useState} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from 'react-router-dom'
import MenuList from "./components/MenuList/MenuList";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import MyBottomNavigation from "./components/BottomNavigation/MyBottomNavigation";
import RestaurantList from "./components/RestaurantList/RestaurantList";
import {useTelegramBackButton} from "./hooks/useTelegramBackButton";
import OrderDetails from "./components/OrderDetails/OrderDetails";
import OrderList from "./components/OrderList/OrderList";
import {useAuth} from "./hooks/useAuth";

import {lighten} from "@mui/material/styles";

function App() {
    const {tg, onToggleButton} = useTelegram();

    const {token} = useAuth();

    const [mode, setMode] = useState(tg.colorScheme);

    useEffect(() => {
        tg.ready();
    }, []);

    // при смене темы в клиенте — обновляем mode
    useEffect(() => {
        tg.onEvent("themeChanged", () => {
            setMode(tg.colorScheme);
        });
    }, [tg]);

    // создаём тему уже на лету, когда mode меняется
    const theme = useMemo(() => {
        const base = createTheme({
            palette: {
                mode,
                background: {
                    paper: mode === "dark" ? "#151515" : "#fff",
                    default: mode === "dark" ? "#000"    : "#f5f5f5",
                },
            },
        });
        return createTheme({
            ...base,
            palette: {
                ...base.palette,
                cardBg:
                    mode === "dark"
                        ? lighten(base.palette.background.paper, 0.08)
                        : base.palette.background.paper,
            },
        });
    }, [mode]);

    useTelegramBackButton();

  return (
    <div className="App">
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <MyBottomNavigation />
            <Routes>
                <Route index element={<RestaurantList/>} />
                <Route path={'restaurants'} element={<RestaurantList />} />
                <Route path={'restaurants/:restId/menu'} element={<MenuList />} />
                <Route path={'orders'} element={<OrderList />} />
                <Route path={'orders/:orderId/details'} element={<OrderDetails />} />

            </Routes>

        </ThemeProvider>

    </div>
  );
}

export default App;
