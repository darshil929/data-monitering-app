import * as React from 'react';
import { Routes, Route } from "react-router-dom";

import PropTypes from 'prop-types';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

import MenuIcon from '@mui/icons-material/Menu';

import criton from '../images/criton.png';
import Database1 from './Column/Columns';
import Sidebar from './Sidebar';
import config2 from "../config2.json";
import Database from '../components/Testing/Database';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
    const [selectedValue, setSelectedValue] = React.useState('');
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={criton} alt="" />
            </Toolbar>
            <Divider />
            <div>
                <Sidebar></Sidebar>
            </div>

        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    const routes = Object.entries(config2.databases).flatMap(([key, database]) => {
        const { db_name, db_columns } = database;

        // Add route for the database itself
        const databaseRoute = (<Route key={key} path={`/${db_name}`} element={<Database databaseName={db_name} />} />);

        // Add routes for each column within the database
        const columnRoutes = Object.entries(db_columns).map(([columnKey, columnName]) => (
        <Route key={columnKey} path={`/${db_name}/${columnName}`} element={<Database databaseName={db_name} columnName={columnName} />}/>
        ));

        return [databaseRoute, ...columnRoutes];
    });

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar className='nav-toolbar'>
                    <IconButton
                        color="black"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className='navContent flex'>
                        <img src={criton} alt="" />
                        {/* <img src={logo} alt="" /> */}
                    </div>
                    {/* <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography> */}
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Routes>
                    <Route path="/" Component={Database1} />
                    {/* <Route path="/SPF_F1_DAY" Component={Database1} />
                    <Route path="/SPF_F1_SHIFT" Component={Database1} />
                    <Route path="/KREENA" Component={Database} /> */}
                    {routes}
                </Routes>
            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;
