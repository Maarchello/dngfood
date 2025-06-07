import './App.css';
import React, {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from 'react-router-dom'
import MenuList from "./components/MenuList/MenuList";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import MyBottomNavigation from "./components/BottomNavigation/MyBottomNavigation";
import RestaurantList from "./components/RestaurantList/RestaurantList";

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

  return (
    <div className="App">
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <MyBottomNavigation />

            {/*<Header/>*/}
            <Routes>
                <Route index element={<RestaurantList/>} />
                <Route path={'restaurants'} element={<RestaurantList />} />
                <Route path={'restaurants/:restId/menu'} element={<MenuList />} />

            </Routes>

        </ThemeProvider>

    </div>
  );
}

export default App;
