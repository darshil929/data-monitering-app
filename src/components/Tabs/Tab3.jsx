import Table from "../Table"
import BarChart from "../Chart/BarChart"

function Tab3() {
    return (
        <div>
            <div>
                <div className="graph-container">
                    <BarChart></BarChart>
                </div>
                <h1>TABULAR DATA</h1>
                <Table></Table>
            </div>
        </div>
    )
}

export default Tab3
