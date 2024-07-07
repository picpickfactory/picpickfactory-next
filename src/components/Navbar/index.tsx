'use client';
import * as React from 'react';

import { Typography , Box, IconButton  } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';


const personal = [
    {title : 'testper1'},
    {title : 'testper2'},
    {title : 'testper3'},
]

const commissioned = [
    {title : 'testcom1'},
    {title : 'testcom2'},
    {title : 'testcom3'},
]


export default function HeaderSection() {
    const [state, setState] = React.useState(false);
    const [openPersonal, setOpenPersonal] = React.useState(false);
    const [openCommissioned, setOpenCommissioned] = React.useState(false);

    const handleClickPersonal = () => {
        setOpenPersonal(!openPersonal);
    };

    const handleClickCommissioned = () => {
        setOpenCommissioned(!openCommissioned);
    };

    const toggleDrawer =
        (open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        if(open == false){
            setOpenPersonal(false); 
            setOpenCommissioned(false);
        }
        setState(open);
        };

    const list = (
        <Box role="presentation">
          <List sx={{bgcolor: 'background.paper' }}>
            <ListItemButton onClick={handleClickPersonal}>
                <ListItemText primary="Personal" />
                    {openPersonal ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
                <Collapse in={openPersonal} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>

                    {personal.map((item) => (
                        <ListItemButton sx={{ pl: 4 }} key={item.title} href={`/personal/${item.title}`}>
                            <ListItemText primary= {item.title} />
                        </ListItemButton>
                    ))}

                    </List>
                </Collapse>

            <ListItemButton onClick={handleClickCommissioned}>
                <ListItemText primary="Commissioned" />
                    {openCommissioned ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
                <Collapse in={openCommissioned} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    
                    {commissioned.map((item) => (
                        <ListItemButton sx={{ pl: 4 }} key={item.title} href={`/commissioned/${item.title}`}>
                            <ListItemText primary= {item.title} />
                        </ListItemButton>
                    ))}

                    </List>
                </Collapse>

            <ListItemButton href={`/aboutus`}>
                <ListItemText primary="About us" />
            </ListItemButton>
            <ListItemButton href={`/contact`}>
                <ListItemText primary="Contact" />
            </ListItemButton>
          </List>
        </Box>
    );

  return (
   
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '95%',
        px: 1.5,
        py: 2,
      }}
    >
        
      <Box sx={{ flexShrink: 0 }}>
        <IconButton>
          <MenuIcon onClick={toggleDrawer(true)} />
            <SwipeableDrawer
              anchor='top'
              open={state}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
            >
              {list}
            </SwipeableDrawer>
        </IconButton>
      </Box>
      
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography component='h1' fontWeight='xl'>
          PICPICKFACTORY
        </Typography>
        <Typography component='h3' fontWeight='sm'>
          BY KASIDIT SINGHARES
        </Typography>
      </Box>
    </Box>
  );
}
