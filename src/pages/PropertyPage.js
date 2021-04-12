import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { DataGrid } from "@material-ui/data-grid";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { propertyList } from '../components/GlobalState';

const columns = [
  { field: 'key', headerName: 'Property Key', width: window.innerWidth *.5 },
  {
    field: 'value',
    headerName: 'Property Value',
    width: window.innerWidth * .5
  }
];

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStylesTab = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  toolbar: theme.mixins.toolbar,
}));

const getRowList = (rowList) => {
  return Array.from(rowList.entries(), ([key, value], index) =>
  ({
    'id': index,
    'key': key,
    'value': value
  }));
};

const PropertyPage = () => {
  const classesTab = useStylesTab();
  const [value, setValue] = useState(0);
  const [propList, setPropList] = useRecoilState(propertyList);
  const defaultProperties = new Map()
  const environmentProperties = new Map();
  Object.keys(propList.default).forEach(function (key) {
    defaultProperties.set(key, propList.default[key]);
  });
  Object.keys(propList.environment).forEach(function (key) {
    environmentProperties.set(key, propList.environment[key]);
  });
  const defaultPropertyRowList = getRowList(defaultProperties);
  const environmentPropertyRowList = getRowList(environmentProperties);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classesTab.toolbar}>
      <Toolbar />
      <AppBar position="sticky">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="default.yaml" {...a11yProps(0)} />
          <Tab label="environment.yaml" {...a11yProps(1)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <div style={{ height: '100vh', width: "100%" }}>
          <DataGrid rows={defaultPropertyRowList} columns={columns} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div style={{ height: '100vh', width: "100%" }}>
          <DataGrid rows={environmentPropertyRowList} columns={columns} />
        </div>
      </TabPanel>
    </div>
  );
}
export default PropertyPage;
