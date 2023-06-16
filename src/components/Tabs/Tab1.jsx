import Table from "../Table"
import LineChart from "../Chart/LineChart"

const Tab1 = () => {
    return (
        <div>
            <div className="graph-container">
                <LineChart></LineChart>
            </div>
            <h1>TABULAR DATA</h1>
            <Table></Table>
        </div>
    )
}

export default Tab1
