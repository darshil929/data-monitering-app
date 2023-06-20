import Table from "../Table"
import BarChart from "../Chart/BarChart"

function Database2() {
  return (
    <>
      <div>
            <div className="graph-container">
                <BarChart></BarChart>
            </div>
            <h1>TABULAR DATA</h1>
            <Table></Table>
        </div>
    </>
  )
}

export default Database2
