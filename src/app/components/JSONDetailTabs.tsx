import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import JSONInput from './JSONInput';
import JsonPatchList from './JSONPatchList';
import { JSONInputState } from '../store/json-input.slice';
import { useSelector } from 'react-redux';
import { stat } from 'fs';
import { RootState } from '../store';
import JSONInputForm from './InputForm';
import JSONPatchInputForm from './PatchForm';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const JSONDetailTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const input: string | null = useSelector((state:RootState) => state.input.json);
  const patches:string[] = [];
  console.log(input);
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="JSON Input" {...a11yProps(0)} />
          <Tab label="JSON Patch List" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        { input ?  <JSONInput /> : <JSONInputForm />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        { patches && patches.length > 0 ? <JsonPatchList /> : <JSONPatchInputForm /> }
      </TabPanel>
    </Box>
  );
}

export default JSONDetailTabs;