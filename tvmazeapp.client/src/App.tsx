import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { Outlet } from "react-router";
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import AppBar from './components/AppBar';




function App() {
    const [children, setChildren] = useState<JSX.Element[]>([]);
    const [darkMode, setDarkMode] = useState(false);
    const setAppBarChildren = useCallback((childrenArray: JSX.Element[]) => {
        setChildren(childrenArray);
    }, []);
    

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    const lightTheme = createTheme({
        palette: {
            mode: 'light',
        },
    })
    const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDarkMode(event.target.checked);
        localStorage.setItem('darkMode', event.target.checked.toString());
    };
    useEffect(() => {
        setDarkMode(localStorage.getItem('darkMode') === 'true');
    }, [])

    // Render the app with the appropriate theme based on the darkMode state. This is the layout, and the content is rendered inside the Outlet component.
    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <AppBar children={children} darkMode={darkMode} handleThemeChange={handleThemeChange} />
            <Container fixed>
                <Outlet context={{ setAppBarChildren }} />
            </Container>
        </ThemeProvider>
    );
}


export default App;


