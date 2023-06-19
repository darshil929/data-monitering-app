import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { AiFillDatabase } from "react-icons/ai";
// import { FaBeer } from 'react-icons/fa';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import criton from '../images/criton.png';
import Database1 from './Databases/Database1';
import Database2 from './Databases/Database2';
import Database3 from './Databases/Database3';
import Database4 from './Databases/Database4';
import * as ReactDOM from "react-dom";
import { Routes, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Select, MenuItem } from '@mui/material';

const drawerWidth = 240;

const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
];

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
            <List>
                {/* {['Tab-1', 'Tab-2', 'Tab-3', 'Tab-4'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))} */}
                <Link to="/">
                    <ListItem>
                        <ListItemButton>
                            {/* <InboxIcon /> */}
                            <AiFillDatabase />
                            <ListItemText sx={{ marginLeft: 1 }}>
                                <span style={{ fontSize: 20 }}>Database1</span>
                            </ListItemText>
                            <Select
                                value={selectedValue}
                                onChange={(event) => setSelectedValue(event.target.value)}
                                displayEmpty
                                renderValue={(value) => (value ? value : 'Select an option')}
                            >
                                {options.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to="/Database2">
                    <ListItem>
                        <ListItemButton>
                            <AiFillDatabase />
                            <ListItemText sx={{ marginLeft: 1 }}>
                                <span style={{ fontSize: 20 }}>Database2</span>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to="/Database3">
                    <ListItem>
                        <ListItemButton>
                            <AiFillDatabase />
                            <ListItemText sx={{ marginLeft: 1 }}>
                                <span style={{ fontSize: 20 }}>Database3</span>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to="/Database4">
                    <ListItem>
                        <ListItemButton>
                            <AiFillDatabase />
                            <ListItemText sx={{ marginLeft: 1 }}>
                                <span style={{ fontSize: 20 }}>Database4</span>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>
            {/* <Divider /> */}

        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

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
                <Toolbar>
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
                        {/* <img src={criton} alt="" /> */}
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
                <Toolbar />
                <Routes>
                    <Route path="/" Component={Database1} />
                    <Route path="/Database2" Component={Database2} />
                    <Route path="/Database3" Component={Database3} />
                    <Route path="/Database4" Component={Database4} />
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
