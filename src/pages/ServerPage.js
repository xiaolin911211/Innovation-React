import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import SettingsIcon from '@material-ui/icons/Settings';
import React from "react";
import { useRecoilState } from "recoil";
import { httpGetApplications } from '../components/ApiCall';
import { applicationList, selectedIndex, serverList } from "../components/GlobalState";
import ApplicationPage from './ApplicationPage';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));


const ServerPage = () => {
    const classes = useStyles();
    const [serList, setSerList] = useRecoilState(serverList);
    const [selectedServerIndex, setSelectedServerIndex] = useRecoilState(selectedIndex);
    const [appList, setAppList] = useRecoilState(applicationList);
    const selectedServer = async (event, index, text) => {
        event.preventDefault();

        if (index !== undefined) {
            setSelectedServerIndex(index);
            const httpGetApplicationsResponse = await httpGetApplications(text);
            if (httpGetApplicationsResponse.status === 200) {
                setAppList(httpGetApplicationsResponse.data);
            }
        }
    };

    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <h3>Servers</h3>
                <div className={classes.drawerContainer}>
                    <List onClick={selectedServer}>
                        {serList.map((text, index) => (
                            <ListItem button key={text} id={text} selected={selectedServerIndex === index} onClick={(event) => selectedServer(event, index, text)}>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar />
                <ApplicationPage />
            </main>
        </div>
    );
};

export default ServerPage;