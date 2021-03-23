import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function AppCard(props) {

    const [data, setData] = useState(null)
    useEffect(() => {
        fetch(`https://stock-data-api.azurewebsites.net/cotacao/${props.data}`)
            .then(data => data.json())
            .then((d) => {
                //  //console.log(d)
                setData(d)
            })

    }, [props.data]);


    if (data) {
        return (

            <Card className="border-left-primary shadow">
                <Card.Header className="text-primary">
                    <span> {props.data}</span>
                    <button className="close" onClick={() => props.onRemove()}>x<span className="sr-only">x</span></button>

                </Card.Header>
                <Card.Body>
                    <ResponsiveContainer className="chartContainer">

                        <LineChart
                            width={300}
                            height={200}
                            data={data}
                            throttleDelay={1000}
                            margin={{ top: 0, bottom: 0, left: 0, right: 0 }}

                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis type="number" domain={['dataMin - 0.01', 'dataMax + 0.01']} />
                            <Tooltip />

                            <Line
                                type="monotone"
                                dataKey="quote"
                                stroke="#8884d8"
                                activeDot={{ r: 8 }}
                            />

                        </LineChart>
                    </ResponsiveContainer>

                    {/* <Button variant="primary">View</Button> */}
                </Card.Body>
            </Card>




        )
    }

    return <><h3>{props.data}</h3><li>loading...</li></>
}

export default AppCard;