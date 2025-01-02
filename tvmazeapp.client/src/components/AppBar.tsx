import { AppBar as MUIAppBar, Toolbar, Typography, Box, FormControlLabel, Switch, Button, Menu, MenuItem, Divider, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router";
import { Fragment, useState } from "react";

interface AppBarProps {
    children: JSX.Element[];
    darkMode: boolean;
    handleThemeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

type LinkButtonInfo = {
    text: string;
    link: string;
};

type MenuItemInfo = {
    field: LinkButtonInfo;
    optionalField?: MenuItemInfo[];
};
const menuItems: MenuItemInfo[] = [
    { field: { text: "search", link: "search" } },
    { field: { text: "favorites", link: "favorites" } },
];

export default function AppBar({ children, darkMode, handleThemeChange }: AppBarProps) {

    const [menuAnchors, setMenuAnchors] = useState<{ [key: number]: HTMLElement | null }>({});
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

    const handleMenuOpen = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuAnchors((prev) => ({ ...prev, [index]: event.currentTarget }));
    };

    const handleMenuClose = (index: number) => {
        setMenuAnchors((prev) => ({ ...prev, [index]: null }));
    };

    const toggleDrawer = (open: boolean) => () => {
        setMobileDrawerOpen(open);
    };

    return (
        <>
            <MUIAppBar position='static'>
                <Toolbar>
                    {/* Mobile Drawer Button */}
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={toggleDrawer(true)}
                        sx={{ display: { xs: "flex", md: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Logo */}
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            textAlign: "right",
                            marginRight: 1,
                        }}
                        color="textPrimary"
                        component={Link}
                        to="/"
                    >
                        TVmate
                    </Typography>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex", alignItems: "flex-start" } }}>
                        {menuItems.map((item, index) =>
                            item.optionalField ? (
                                <Box key={index}>
                                    <Button
                                        color="inherit"
                                        onClick={(event) => handleMenuOpen(index, event)}
                                    >
                                        {item.field.text}
                                    </Button>
                                    <Menu
                                        anchorEl={menuAnchors[index] || null}
                                        open={Boolean(menuAnchors[index])}
                                        onClose={() => handleMenuClose(index)}
                                    >
                                        {item.optionalField.map((subItem, subIndex) => (
                                            <MenuItem
                                                key={subIndex}
                                                onClick={() => handleMenuClose(index)}
                                                component={Link}
                                                to={subItem.field.link}
                                            >
                                                {subItem.field.text}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
                            ) : (
                                <Button
                                    key={index}
                                    color="inherit"
                                    component={Link}
                                    to={item.field.link}
                                >
                                    {item.field.text}
                                </Button>
                            )
                        )}
                    </Box>

                    <Box>
                        {children}
                    </Box>
                    <Box sx={{ ml: 2, flexGrow: 0 }}>
                        <FormControlLabel sx={{ display: 'flex', flexDirection: 'column-reverse' }} control={<Switch checked={darkMode} onChange={handleThemeChange} />} label="dark mode" />
                    </Box>
                </Toolbar>
            </MUIAppBar>
            <Drawer
                anchor="left"
                open={mobileDrawerOpen}
                onClose={toggleDrawer(false)}
                sx={{ display: { xs: "flex", md: "none" } }}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        {menuItems.map((item, index) => (
                            <Fragment key={index}>
                                <ListItem component={Link} to={item.field.link}>
                                    <ListItemText primary={item.field.text} />
                                </ListItem>
                                {/* Render Submenu in Drawer */}
                                {item.optionalField &&
                                    item.optionalField.map((subItem, subIndex) => (
                                        <ListItem
                                            key={subIndex}
                                            sx={{ pl: 4 }}
                                            component={Link}
                                            to={subItem.field.link}
                                        >
                                            <ListItemText primary={subItem.field.text} />
                                        </ListItem>
                                    ))}
                            </Fragment>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    )
}