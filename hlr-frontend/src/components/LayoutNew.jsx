import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, Grid, InputBase } from '@mui/material';
import logo from '../assets/images/logo.svg'
import { Link,useNavigate } from 'react-router-dom';
import { removeSessions} from "../helper/FormHelper";
const drawerWidth = 280;

function ResponsiveDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    let navigate = useNavigate();
    const onLogout=()=>{
        //removeSessions();
        navigate("/login");
    }
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const styles = {

        logo: {
            display: 'flex',
            alignItems: 'center',
            margin: 'auto',
            padding: "60px 20px 20px 20px",
        },

        search: {
            position: 'relative',
            backgroundColor: '#f0f0f0',
            marginLeft: '20px',
            width: '80%',
        },
        searchIcon: {
            padding: '10px',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            width: '100%',
        },
        inputInput: {
            padding: '4px 4px 4px 40px',

        },
        logoutButton: {
            marginTop: 'auto',
            width: "226px",
            height: "52px",
            borderRadius: " 8px",
            background: "#006845",
            color: "white",
        },
    };
    const drawer = (
        <div>
            <Grid>
                <Link to='/'>
                    <img
                        src={logo}
                        alt="Top Head Image"
                        style={styles.logo}
                    />
                </Link>
                <Toolbar>
                    <div style={styles.search}>
                        <div style={styles.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search..."
                            style={styles.inputInput}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </Toolbar>
                <Divider />
                <Typography variant='h6' component='div' pl={3} mt={5}>
                    Menu
                </Typography>
            </Grid>

            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ShoppingBagIcon />
                        </ListItemIcon>
                        <Link to='/user-buy'><ListItemText primary="Buy" /></Link>
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ShoppingCartIcon />
                        </ListItemIcon>
                        <Link to='/seller-list'><ListItemText primary="Sell" /></Link>
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <FavoriteIcon />
                        </ListItemIcon>
                        <Link to='/favourite-list'> <ListItemText primary="Favourite" /></Link>
                    </ListItemButton>
                </ListItem>

            </List>
            <Divider />

        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                color='success'
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Welcome USER
                    </Typography>
                    <Button variant="contained" color="success" onClick={onLogout}>
                        <IconButton color="inherit" >
                            <ExitToAppIcon />
                        </IconButton>
                        Logout
                    </Button>
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