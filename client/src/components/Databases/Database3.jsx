import Table from "../Table"
import LineChart from "../Chart/LineChart"

function Database3() {
    return (
        <>
            <div>
                <div className="graph-container">
                    <LineChart></LineChart>
                </div>
                <h1>TABULAR DATA</h1>
                <Table></Table>
            </div>
        </>
    )
}

export default Database3
