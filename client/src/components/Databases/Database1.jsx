import Table from "../Table"
import LineChart from "../Chart/LineChart"

const Database1 = () => {
    return (
        <>
            {/* <h1>Graphical Representation</h1> */}
            <div className="graph-container">
                <LineChart></LineChart>
            </div>
            <h1>TABULAR DATA</h1>
            <Table></Table>
        </>
    )
}

export default Database1
