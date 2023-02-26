import { Box, Grid } from "@mui/material"
import JSONDetailTabs from "./app/components/JSONDetailTabs"

const Dashboard = () => {
  return (
      <Grid container spacing={2}>
        
          <Grid xs={5}>
              <Box sx={{ borderRight:1, borderColor: 'divider' }}>
                <JSONDetailTabs />
              </Box>
          </Grid>
        
        <Grid xs={7}>
          
              <h6>Show JSON Changes here after applying / Removing patch</h6>
          
          
        </Grid>
      </Grid>
  )
}

export default Dashboard;