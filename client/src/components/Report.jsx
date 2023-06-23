import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const TableToPDFExcelCSV = () => {
  const downloadTable = (format) => {
    const table = document.getElementById("table_with_data");
    const tableData = Array.from(table.querySelectorAll("tr")).map((row) =>
      Array.from(row.querySelectorAll("th, td")).map((cell) => cell.textContent)
    );

    if (format === "csv") {
      // Export to CSV
      const csvData = tableData.map((row) => row.join(",")).join("\n");
      const csvBlob = new Blob([csvData], { type: "text/csv" });
      const csvUrl = URL.createObjectURL(csvBlob);
      const downloadLink = document.createElement("a");
      downloadLink.href = csvUrl;
      downloadLink.download = "table.csv";
      downloadLink.click();
    } else if (format === "excel") {
      // Export to Excel
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.aoa_to_sheet(tableData);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
      const excelData = XLSX.write(workbook, {
        type: "binary",
        bookType: "xlsx",
      });
      const excelBlob = new Blob([s2ab(excelData)], {
        type: "application/octet-stream",
      });
      const excelUrl = URL.createObjectURL(excelBlob);
      const downloadLink = document.createElement("a");
      downloadLink.href = excelUrl;
      downloadLink.download = "table.xlsx";
      downloadLink.click();
    } else if (format === "pdf") {
      // Export to PDF
      const doc = new jsPDF();
      autoTable(doc, { html: "#table_with_data" });
      doc.save("table.pdf");
    }
  };

  // Convert string to ArrayBuffer
  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  };

  return (
    <div className="w-2/3 mx-auto mt-16">
      <button onClick={() => downloadTable("csv")} className="btn my-6">
        Download CSV
      </button>
      <button onClick={() => downloadTable("excel")} className="btn my-6">
        Download Excel
      </button>
      <button onClick={() => downloadTable("pdf")} className="btn my-6">
        Download PDF
      </button>
      <hr/>
      <div className="overflow-x-auto">
        <table className="table w-full" id="table_with_data">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>
            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>Red</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableToPDFExcelCSV;
