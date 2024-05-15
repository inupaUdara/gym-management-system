import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  IconButton,
  Chip,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
  TextField,
  Button,
} from "@mui/material";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import SearchIcon from "@mui/icons-material/Search";

const RefundTable = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [refunds, setRefunds] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7); // Display only 7 rows per page
  const [search, setSearch] = useState("");
  const [filteredRefunds, setFilteredRefunds] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // Initial sort order

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/refunds/getByUserRefunds/${currentUser.email}`
        );
        setRefunds(response.data);
        setFilteredRefunds(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching refunds:", error);
        setRefunds([]); // Set refunds to an empty array if there's an error
        setFilteredRefunds([]); // Set filteredRefunds to an empty array if there's an error
      }
    };

    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  useEffect(() => {
    setFilteredRefunds(
      refunds.filter(
        (refund) =>
          refund.refundId.toLowerCase().includes(search.toLowerCase()) ||
          refund.paymentId.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, refunds]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [
        [
          "Refund ID",
          "Refund Reason",
          "Payment ID",
          "Refund Description",
          "Photo",
          "Status",
          "Date & Time",
        ],
      ],
      body: filteredRefunds.map((refund) => [
        refund.refundId,
        refund.refundReason,
        refund.paymentId,
        refund.refundDescription,
        refund.photo,
        refund.status,
        refund.createdAt,
      ]),
    });
    doc.save("refunds.pdf");
  };

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Handle sort order toggle
  const handleSortToggle = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Sorting function based on the sort order
  const sortedRefunds = [...filteredRefunds].sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  // Ensure refunds is an array before rendering
  if (!Array.isArray(refunds)) {
    console.error("Refunds is not an array:", refunds);
    // If refunds is not an array, return null or an error message
    return <div>No refunds found.</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Paper
        sx={{
          width: "1600px",
          overflow: "hidden",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
          marginTop: "20px",
        }}
      >
        <h2
          style={{
            textAlign: "left",
            marginBottom: "20px",
            fontWeight: "bold",
            fontFamily: "Arial, sans-serif",
            fontSize: "24px", // Add font size here
          }}
        >
          Refund Requests
        </h2>
        <TextField
          label="Search..."
          variant="outlined"
          margin="normal"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            marginBottom: "20px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              "& fieldset": {
                borderColor: "#A80000",
              },
              "&:hover fieldset": {
                borderColor: "#A80000",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#A80000",
              },
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#A80000",
              },
          }}
          InputProps={{
            startAdornment: (
              <IconButton edge="start" sx={{ color: "#A80000" }}>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
        <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    backgroundColor: "#1F1F1F",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Refund ID
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#1F1F1F",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Refund Reason
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#1F1F1F",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Payment ID
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#1F1F1F",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Refund Description
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#1F1F1F",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Photo
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#1F1F1F",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#1F1F1F",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Created At{" "}
                  {sortOrder === "asc" ? (
                    <IconButton onClick={handleSortToggle}>
                      <ArrowDropDownIcon
                        style={{
                          color: "white",
                        }}
                      />
                    </IconButton>
                  ) : (
                    <IconButton onClick={handleSortToggle}>
                      <ArrowDropUpIcon
                        style={{
                          color: "white",
                        }}
                      />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRefunds
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((refund) => (
                  <TableRow key={refund.refundId}>
                    <TableCell>{refund.refundId}</TableCell>
                    <TableCell>{refund.refundReason}</TableCell>
                    <TableCell>{refund.paymentId}</TableCell>
                    <TableCell>{refund.refundDescription}</TableCell>
                    <TableCell>{refund.photo}</TableCell>

                    <TableCell>
                      {refund.status === "Approved" ? (
                        <Chip label="Approved" color="success" />
                      ) : refund.status === "Declined" ? (
                        <Chip label="Declined" color="error" />
                      ) : (
                        <Chip label="Pending" color="warning" />
                      )}
                    </TableCell>
                    <TableCell>{formatDate(refund.createdAt)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[7, 10, 25]}
          component="div"
          count={filteredRefunds.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ marginTop: "20px" }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "10px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleDownloadPDF}
            sx={{
              backgroundColor: "#A80000",
              "&:hover": {
                backgroundColor: "#8B0000", // Dark red color
              },
            }}
          >
            Download as PDF
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default RefundTable;
