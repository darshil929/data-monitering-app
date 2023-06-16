import Table from "../Table"
import LineChart from "../Chart/LineChart"

function Tab4() {
    return (
        <div>
            <div>
                <div className="graph-container">
                    <LineChart></LineChart>
                </div>
                <h1>TABULAR DATA</h1>
                <Table></Table>
            </div>
        </div>
    )
}

export default Tab4
