import React from "react";
import jsPDF from "jspdf";

const Invoice = () => {
  const generatePDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");

    const invoiceElement = document.getElementById("invoice");

    pdf.html(invoiceElement, {
      callback: (pdf) => {
        pdf.output("dataurlnewwindow"); // Opens PDF in a new tab
      },
      x: 10,
      y: 10,
      //   widt, // Adjust width based on your content
    });
  };

  return (
    <div>
      <button onClick={generatePDF}>Generate Invoice</button>

      {/* Invoice Element */}
      <div
        id="invoice"
        style={{
          fontFamily: "Arial, sans-serif",
          width: "210mm",
          minHeight: "297mm",
          padding: "20mm",
          backgroundColor: "white",
          color: "black",
          boxSizing: "border-box",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Invoice</h1>
        <p>
          <strong>Customer Name:</strong> John Doe
        </p>
        <p>
          <strong>Invoice Number:</strong> #12345
        </p>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Item
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Quantity
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                Product A
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>2</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                ₹100
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                Product B
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>1</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                ₹200
              </td>
            </tr>
          </tbody>
        </table>
        <p style={{ marginTop: "20px", fontWeight: "bold" }}>Total: ₹400</p>
      </div>
    </div>
  );
};

export default Invoice;
