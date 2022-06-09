import React, { useEffect, useState } from 'react'
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
    Tooltip,
    SmallValuesGrouping
} from 'devextreme-react/pie-chart';
  
import { Grid, Paper, Stack, Typography} from '@mui/material'

const ChartsArea = ({store}) => {

	const [newStore, setNewStore] = useState([])
	var sstore =[]

	useEffect(()=>{

		store.product?.map((pr,i)=>{
			sstore.push({
				title: pr.title,
				favorites : pr.favorite.length
			})
		})

		setNewStore(sstore)
	},[store])

    return (
        <>
        <Grid item md={12} lg={7} >
            <Paper>
                <Stack  padding={2}>
                    <Chart
                        title="Favorites per Product"
                        dataSource={newStore}
                        id="chart"
                    >

                        <ArgumentAxis tickInterval={100}>
                        <Label format="largeNumber" />
                        </ArgumentAxis>

                        <Series
                        type="bar"
                        valueField="favorites"
                        argumentField="title"
                        />

                        <Legend
                        visible={false}
                        />

                        <Export enabled={true} />

                    </Chart>
                </Stack>
            </Paper>
        </Grid>
        <Grid item md={12} lg={5} >
            <Paper>
                <Stack alignItems={'center'} padding={2}>
                    <PieChart
                        id="pie"
                        dataSource={store.product}
                        palette="Bright"
                        title="Views per Product"
                    >
                        <Series
                        argumentField="title"
                        valueField="views"
                        >
                        <Label visible={true} >
                            <Connector visible={true} width={1} />
                        </Label>
                        </Series>
                        <SmallValuesGrouping threshold={200} mode="smallValueThreshold" />
                        <Legend
                        visible={true}
                        verticalAlignment="bottom"
                        horizontalAlignment="center"
                        itemTextPosition="right"
                        />
                         <Tooltip
                            paddingLeftRight={12}
                            paddingTopBottom={10}
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
