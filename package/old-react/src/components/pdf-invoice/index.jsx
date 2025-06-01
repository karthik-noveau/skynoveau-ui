import React, { forwardRef, useImperativeHandle } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
  Image,
} from "@react-pdf/renderer";
import { formatDate, formatDbDate } from "@utils";
import useWindowWidth from "@hooks";

import signature from "./signature.png";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    color: "#333",
    lineHeight: "0.8",
    borderRadius: "15px",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 13,
    fontWeight: "bold",
    color: "black",
    paddingBottom: "5px",
  },
  text: {
    color: "#444444",
    fontSize: 11,
  },
  // ---------- header ----------
  header: {
    textAlign: "center",
    backgroundColor: "#01a401",
    padding: "15px 10px 15px 10px",
    borderRadius: "10px",
  },
  // ---------- section ----------
  section: {
    marginTop: "10px",
    padding: "15px",
    borderRadius: "5px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    fontSize: 10,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  sectionLayoutColumn: {
    display: "flex",
    flexDirection: "column",
  },
  sectionLayoutRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // ---------- box ----------
  box: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },
  boxLeft: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    width: "49%",
    textAlign: "end",
    marginRight: "2%",
  },
  boxRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "3px",
    width: "49%",
  },
  boxTextLeft: {
    color: "#444444",
    textAlign: "left",
  },
  boxTextRight: {
    color: "#444444",
    textAlign: "right",
  },
  // table
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderColor: "#ddd",
    borderWidth: 1,
    marginTop: "10px",
    borderRadius: "5px",
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    display: "flex",
  },
  tableCell: {
    padding: "5px",
    borderRight: "1px solid #ddd",
    fontSize: 10,
    textAlign: "center",
    color: "#444444",
  },
  tableCellHeader: {
    fontWeight: "bold",
    backgroundColor: "#f1f1f1",
    color: "#222222",
    padding: "7px 0",
    fontSize: 11,
  },
  tableCellLast: {
    borderRight: "none",
  },
  totalRow: {
    flexDirection: "row",
    display: "flex",
    borderTop: "1px solid #ddd",
  },
  totalCell: {
    borderRight: "none",
  },
  tableCellTotal: {
    borderRight: "none", // Remove border from last cell
    fontWeight: "bold",
    backgroundColor: "#f1f1f1",
  },
  totalPriceSection: {
    textAlign: "right",
    marginTop: "10px",
    fontSize: 10,
    fontWeight: "bold",
    color: "#4CAF50",
  },
});

// InvoiceTemplate Component for rendering PDF
const InvoiceTemplate = ({ data }) => {
  return (
    <Document>
      <Page style={styles.page}>
        {/* header */}
        <View style={styles.header}>
          <Text
            style={{
              ...styles.text,
              fontSize: "18px",
              color: "white",
              paddingBottom: "15px",
            }}
          >
            Dhanika Purchase Invoice
          </Text>
          <Text style={{ ...styles.text, color: "white" }}>
            Order ID: {data.orderId}
          </Text>
        </View>

        {/* sold by details */}
        <View style={styles.section}>
          <View style={styles.sectionLayoutRow}>
            <View style={styles.boxLeft}>
              <Text style={styles.title}>Sold By</Text>
              <Text style={styles.text}>Dhanika Store</Text>
              <Text style={styles.text}>
                No.68 ECR Road, Thiruvanmiyur, Chennai - 600041
              </Text>
            </View>
            <View style={styles.boxRight}>
              <Text style={styles.text}> </Text>
              <Text style={styles.text}>PAN No: AAECR0564M</Text>
              <Text style={styles.text}>
                {/* GST Registration No: 29AAECR0564M2ZY */}
              </Text>
            </View>
          </View>
        </View>

        {/* customer details */}
        <View style={styles.section}>
          <View style={styles.boxLeft}>
            <Text style={styles.title}>Shipping Address</Text>
            <Text style={styles.text}>
              {data.deliveryInfo.firstName} {data.deliveryInfo.lastName}
            </Text>

            <Text style={styles.text}>
              {data.deliveryInfo.flatNo}, {data.deliveryInfo.street},
            </Text>
            <Text style={styles.text}>
              {data.deliveryInfo.city}, {data.deliveryInfo.state}{" "}
              {data.deliveryInfo.pincode}.
            </Text>
            <Text style={styles.text}>{data.deliveryInfo.phoneNumber}</Text>
          </View>
        </View>

        <View style={styles.section}>
          {/* ordered products */}
          {/* <Text style={styles.title}>Order ID: {data.orderId}</Text> */}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text
                style={{
                  ...styles.tableCell,
                  ...styles.tableCellHeader,
                  width: "30%",
                  textAlign: "left",
                  paddingLeft: "5px",
                }}
              >
                Description
              </Text>
              <Text
                style={{
                  ...styles.tableCell,
                  ...styles.tableCellHeader,
                  width: "15%",
                }}
              >
                Quantity
              </Text>
              <Text
                style={{
                  ...styles.tableCell,
                  ...styles.tableCellHeader,
                  width: "15%",
                }}
              >
                Price
              </Text>
              <Text
                style={{
                  ...styles.tableCell,
                  ...styles.tableCellHeader,
                  width: "20%",
                }}
              >
                Tax ( 18% )
              </Text>
              <Text
                style={{
                  ...styles.tableCell,
                  ...styles.tableCellHeader,
                  width: "20%",
                }}
              >
                Total
              </Text>
            </View>
            {data.products.map((product, index) => (
              <View style={styles.tableRow} key={index}>
                <Text
                  style={{
                    ...styles.tableCell,
                    width: "30%",
                    textAlign: "left",
                  }}
                >
                  {`${product.name} ${product.code}`}
                </Text>
                <Text style={{ ...styles.tableCell, width: "15%" }}>
                  {product.quantity}
                </Text>
                <Text style={{ ...styles.tableCell, width: "15%" }}>
                  Rs. {product.price}
                </Text>
                <Text style={{ ...styles.tableCell, width: "20%" }}>-</Text>
                <Text
                  style={{
                    ...styles.tableCell,
                    ...styles.tableCellLast,
                    width: "20%",
                  }}
                >
                  Rs. {`${product.quantity * product.price}`.toLocaleString()}
                </Text>
              </View>
            ))}

            {/* discount  */}
            <View style={styles.totalRow}>
              <Text
                style={{
                  ...styles.tableCell,
                  ...styles.totalCell,
                  width: "30%",
                }}
              />
              <Text
                style={{
                  ...styles.tableCell,
                  ...styles.totalCell,
                  width: "10%",
                }}
              />
              <Text
                style={{
                  ...styles.tableCell,
                  ...styles.totalCell,
                  width: "20%",
                }}
              />
              <Text
                style={{
                  ...styles.tableCell,
                  width: "20%",
                }}
              >
                Discount
              </Text>
              <Text
                style={{
                  ...styles.tableCell,
                  width: "20%",
                }}
              >
                - Rs. {data?.couponInfo ? data.couponInfo.price : 0}
              </Text>
            </View>

            {/* total  */}
            <View style={styles.totalRow}>
              <Text
                style={{
                  ...styles.tableCell,
                  ...styles.totalCell,
                  width: "30%",
                }}
              />
              <Text
                style={{
                  ...styles.tableCell,
                  ...styles.totalCell,
                  width: "10%",
                }}
              />
              <Text
                style={{
                  ...styles.tableCell,
                  ...styles.totalCell,
                  width: "20%",
                }}
              />
              <Text
                style={{
                  ...styles.tableCell,
                  width: "20%",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Total
              </Text>
              <Text
                style={{
                  ...styles.tableCell,
                  ...styles.tableCellLast,
                  width: "20%",
                  fontWeight: 600,
                  color: "black",
                }}
              >
                Rs. {data.paymentInfo.paidAmount}
              </Text>
            </View>
          </View>

          {/* payment info */}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text
                style={{
                  ...styles.tableCell,
                  ...styles.tableCellHeader,
                  width: "30%",
                  textAlign: "left",
                  paddingLeft: "5px",
                }}
              >
                Payment Transaction ID
              </Text>
              <Text
                style={{
                  ...styles.tableCell,
                  ...styles.tableCellHeader,
                  width: "30%",
                }}
              >
                Order Date
              </Text>
              <Text
                style={{
                  ...styles.tableCell,
                  ...styles.tableCellHeader,
                  width: "20%",
                }}
              >
                Invoice Value
              </Text>
              <Text
                style={{
                  ...styles.tableCell,
                  ...styles.tableCellHeader,
                  width: "20%",
                }}
              >
                Mode of Payment
              </Text>
            </View>

            <View style={styles.tableRow}>
              <Text
                style={{ ...styles.tableCell, width: "30%", textAlign: "left" }}
              >
                {data.paymentInfo.paymentId}
              </Text>
              <Text style={{ ...styles.tableCell, width: "30%" }}>
                {formatDbDate(data.paymentInfo.paidAt).dateTime}
              </Text>
              <Text style={{ ...styles.tableCell, width: "20%" }}>
                Rs. {data.paymentInfo.paidAmount.toLocaleString()}
              </Text>
              <Text style={{ ...styles.tableCell, width: "20%" }}>
                {data.paymentInfo.paymentMode}
              </Text>
            </View>
          </View>

          <View style={{ ...styles.section, padding: "15px" }}>
            <View style={styles.sectionLayoutRow}>
              <View style={styles.boxLeft}></View>
              <View style={{ ...styles.boxRight }}>
                <Text style={styles.title}>For Dhanika</Text>
                <Image
                  src={signature}
                  style={{
                    width: "60px",
                    padding: "5px 0",
                  }}
                />
                <Text>Authorized Signatory</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ textAlign: "center", marginTop: "30px" }}>
          <Text style={{ fontSize: 10, color: "#777", textAlign: "center" }}>
            For any inquiries,
          </Text>
          <Text style={{ fontSize: 10, color: "#777", textAlign: "center" }}>
            please contact us at hello@dhanika.co.in or call +91 9500342171
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: "#999",
              marginTop: 10,
              textAlign: "center",
            }}
          >
            © {formatDate().year} Dhanika. All rights reserved.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export const GenerateInvoice = forwardRef((props, ref) => {
  const windowWidth = useWindowWidth();

  useImperativeHandle(ref, () => ({
    downloadInvoice: (orderData) => {
      // Display loading state
      const loadingMessage = document.createElement("div");
      loadingMessage.innerText = "Generating PDF  . . .";
      loadingMessage.style.position = "fixed";
      loadingMessage.style.width = "fit-content";
      loadingMessage.style.top = "50%";
      loadingMessage.style.left = "50%";
      loadingMessage.style.transform = "translate(-50%, -50%)";
      loadingMessage.style.fontSize = "18px";
      loadingMessage.style.fontWeight = "300";
      loadingMessage.style.textAlign = "center";
      loadingMessage.style.background = "rgba(0, 0, 0, 0.6)";
      loadingMessage.style.color = "#fff";
      loadingMessage.style.padding = "10px 20px";
      loadingMessage.style.borderRadius = "8px";
      document.body.appendChild(loadingMessage);

      setTimeout(() => {
        // Generate PDF from @react-pdf renderer
        const pdfBlob = pdf(<InvoiceTemplate data={orderData} />).toBlob();

        // Open PDF in a new window after generating it
        pdfBlob.then((blob) => {
          const url = URL.createObjectURL(blob);

          if (windowWidth < 900) {
            const link = document.createElement("a");
            link.href = url;
            const blobId = url.split("/").pop();
            link.download = `${blobId}.pdf`; // Set the file name
            link.click(); // Trigger the download
            URL.revokeObjectURL(url); // Revoke the blob URL after download
          } else {
            window.open(url, "_blank");
            // const newWindow = window.open();
            // newWindow.document.write(
            //   `<html><body><embed src="${url}" type="application/pdf" width="100%" height="100%" /></body></html>`
            // );
            // newWindow.document.close();
          }
        });

        document.body.removeChild(loadingMessage);
      }, 500);
    },
  }));

  return null; // No visible UI
});
