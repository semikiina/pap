import React from 'react'
import Chart, {
    ArgumentAxis,
    Label,
    Legend,
    Series,
    Export,
} from 'devextreme-react/chart';

import PieChart, {
    Connector,
    Size,
} from 'devextreme-react/pie-chart';
  
import {Avatar, Box, Container, Divider, Grid, Paper, Stack, Typography} from '@mui/material'

const ChartsArea = () => {


   const customers = [{
        ID: 1,
        CompanyName: 'Super Mart of the West',
        Address: '702 SW 8th Street',
        City: 'Bentonville',
        State: 'Arkansas',
        Zipcode: 72716,
        Phone: '(800) 555-2797',
        Fax: '(800) 555-2171',
        Website: 'http://www.nowebsitesupermart.com',
        Sales: 0
      }, {
        ID: 2,
        CompanyName: 'Electronics Depot',
        Address: '2455 Paces Ferry Road NW',
        City: 'Atlanta',
        State: 'Georgia',
        Zipcode: 30339,
        Phone: '(800) 595-3232',
        Fax: '(800) 595-3231',
        Website: 'http://www.nowebsitedepot.com',
        Sales: 4
      }, {
        ID: 3,
        CompanyName: 'K&S Music',
        Address: '1000 Nicllet Mall',
        City: 'Minneapolis',
        State: 'Minnesota',
        Zipcode: 55403,
        Phone: '(612) 304-6073',
        Fax: '(612) 304-6074',
        Website: 'http://www.nowebsitemusic.com',
        Sales: 17
      }, {
        ID: 4,
        CompanyName: "Tom's Club",
        Address: '999 Lake Drive',
        City: 'Issaquah',
        State: 'Washington',
        Zipcode: 98027,
        Phone: '(800) 955-2292',
        Fax: '(800) 955-2293',
        Website: 'http://www.nowebsitetomsclub.com',
        Sales: 12
      }, {
        ID: 5,
        CompanyName: 'E-Mart',
        Address: '3333 Beverly Rd',
        City: 'Hoffman Estates',
        State: 'Illinois',
        Zipcode: 60179,
        Phone: '(847) 286-2500',
        Fax: '(847) 286-2501',
        Website: 'http://www.nowebsiteemart.com',
        Sales: 10
      }, {
        ID: 6,
        CompanyName: 'Walters',
        Address: '200 Wilmot Rd',
        City: 'Deerfield',
        State: 'Illinois',
        Zipcode: 60015,
        Phone: '(847) 940-2500',
        Fax: '(847) 940-2501',
        Website: 'http://www.nowebsitewalters.com',
        Sales: 4
      }, {
        ID: 7,
        CompanyName: 'StereoShack',
        Address: '400 Commerce S',
        City: 'Fort Worth',
        State: 'Texas',
        Zipcode: 76102,
        Phone: '(817) 820-0741',
        Fax: '(817) 820-0742',
        Website: 'http://www.nowebsiteshack.com',
        Sales: 5
      }, {
        ID: 8,
        CompanyName: 'Circuit Town',
        Address: '2200 Kensington Court',
        City: 'Oak Brook',
        State: 'Illinois',
        Zipcode: 60523,
        Phone: '(800) 955-2929',
        Fax: '(800) 955-9392',
        Website: 'http://www.nowebsitecircuittown.com',
        Sales: 12
      }, {
        ID: 9,
        CompanyName: 'Premier Buy',
        Address: '7601 Penn Avenue South',
        City: 'Richfield',
        State: 'Minnesota',
        Zipcode: 55423,
        Phone: '(612) 291-1000',
        Fax: '(612) 291-2001',
        Website: 'http://www.nowebsitepremierbuy.com',
        Sales: 21
      }, {
        ID: 10,
        CompanyName: 'ElectrixMax',
        Address: '263 Shuman Blvd',
        City: 'Naperville',
        State: 'Illinois',
        Zipcode: 60563,
        Phone: '(630) 438-7800',
        Fax: '(630) 438-7801',
        Website: 'http://www.nowebsiteelectrixmax.com',
        Sales: 35
      }, {
        ID: 11,
        CompanyName: 'Video Emporium',
        Address: '1201 Elm Street',
        City: 'Dallas',
        State: 'Texas',
        Zipcode: 75270,
        Phone: '(214) 854-3000',
        Fax: '(214) 854-3001',
        Website: 'http://www.nowebsitevideoemporium.com',
        Sales: 5
      }, {
        ID: 12,
        CompanyName: 'Screen Shop',
        Address: '1000 Lowes Blvd',
        City: 'Mooresville',
        State: 'North Carolina',
        Zipcode: 28117,
        Phone: '(800) 445-6937',
        Fax: '(800) 445-6938',
        Website: 'http://www.nowebsitescreenshop.com',
        Sales: 1
      }];
    
    return (
        <>
        <Grid item md={7} >
            <Paper>
                <Stack  padding={2}>
                    <Typography>Store Visits</Typography>
                    <Chart
                        title="Store Visits"
                        dataSource={customers}
                        id="chart"
                    >

                        <ArgumentAxis tickInterval={10}>
                        <Label format="decimal" />
                        </ArgumentAxis>

                        <Series
                        type="bar"
                        valueField="Sales"
                        argumentField="ID"
                        />

                        <Legend
                        visible={false}
                        />

                        <Export enabled={true} />

                    </Chart>
                </Stack>
            </Paper>
        </Grid>
        <Grid item md={5} >
            <Paper>
                <Stack alignItems={'center'} padding={2}>
                    <Typography>Current Visits</Typography>
                    <PieChart
                        id="pie"
                        dataSource={customers}
                        palette="Bright"
                        title="Area of Countries"
                    >
                        <Series
                        argumentField="CompanyName"
                        valueField="Sales"
                        >
                        <Label visible={true}>
                            <Connector visible={true} width={1} />
                        </Label>
                        </Series>

                        <Legend
                        visible={false}
                        />
                        
                        <Export enabled={true} />
                    </PieChart>
                </Stack>
            </Paper>
        </Grid>
        </>
    )
}

export default ChartsArea
