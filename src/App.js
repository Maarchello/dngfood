import './App.css';
import React, {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from 'react-router-dom'
import MenuList from "./components/MenuList/MenuList";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import MyBottomNavigation from "./components/BottomNavigation/MyBottomNavigation";
import RestaurantList from "./components/RestaurantList/RestaurantList";
import {useTelegramBackButton} from "./hooks/useTelegramBackButton";
import OrderDetails from "./components/OrderDetails/OrderDetails";

function App() {
    const {tg, onToggleButton} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, []);



    const theme = createTheme({
        palette: {
            mode: tg.colorScheme,
        },
    })

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
                <Route path={'orders/:orderId/details'} element={<OrderDetails />} />

            </Routes>

        </ThemeProvider>

    </div>
  );
}

export default App;
