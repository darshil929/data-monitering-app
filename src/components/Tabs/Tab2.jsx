import Table from "../Table"
import PieChart  from "../Chart/PieChart"

function Tab2() {
  return (
    <div>
      <div>
            <div className="graph-container">
                <PieChart></PieChart>
            </div>
            <h1>TABULAR DATA</h1>
            <Table></Table>
        </div>
    </div>
  )
}

export default Tab2
