import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

function TransacTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [filterProduct, setFilterProduct] = useState("");
  const [filterPaymentType, setFilterPaymentType] = useState("");
  const [filterShippingMethod, setFilterShippingMethod] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/pay/getPayments");
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterData = () => {
      const filtered = data.filter((item) => {
        return (
          item._id.toLowerCase().includes(searchText.toLowerCase()) &&
          (filterProduct === "" || item.productName === filterProduct) &&
          (filterPaymentType === "" ||
            item.paymentType === filterPaymentType) &&
          (filterShippingMethod === "" ||
            item.shippingMethod === filterShippingMethod) &&
          (startDate === "" || new Date(item.date) >= new Date(startDate)) &&
          (endDate === "" || new Date(item.date) <= new Date(endDate))
        );
      });
      setFilteredData(filtered);
    };
    filterData();
  }, [
    data,
    searchText,
    filterProduct,
    filterPaymentType,
    filterShippingMethod,
    startDate,
    endDate,
  ]);

  const columns = [
    { key: "_id", title: "Payment ID" },
    { key: "email", title: "Email" },
    { key: "phoneNumber", title: "Phone Number" },
    { key: "firstName", title: "First Name" },
    { key: "lastName", title: "Last Name" },
    { key: "productName", title: "Product Name" },
    { key: "sellingPrice", title: "Product Price" },
    { key: "shippingfee", title: "Shipping Fee" },
    { key: "totalPrice", title: "Total Price" },
    { key: "shippingMethod", title: "Shipping Method" },
    { key: "totalPrice", title: "Total Price" },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleFilterProductChange = (event) => {
    setFilterProduct(event.target.value);
  };

  const handleFilterPaymentTypeChange = (event) => {
    setFilterPaymentType(event.target.value);
  };

  const handleFilterShippingMethodChange = (event) => {
    setFilterShippingMethod(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div style={{ padding: "50px", maxWidth: "100%" }}>
      <Paper>
        <div style={{ padding: "16px" }}>
          <TextField
            label="Search by Payment ID"
            variant="outlined"
            value={searchText}
            onChange={handleSearchTextChange}
            style={{ marginRight: "16px" }}
          />
          <TextField
            select
            label="Filter by Product"
            variant="outlined"
            value={filterProduct}
            onChange={handleFilterProductChange}
            style={{ marginRight: "16px" }}
          >
            <MenuItem value="">All Products</MenuItem>
            {/* Add your product options here */}
          </TextField>
          <TextField
            select
            label="Filter by Payment Type"
            variant="outlined"
            value={filterPaymentType}
            onChange={handleFilterPaymentTypeChange}
            style={{ marginRight: "16px" }}
          >
            <MenuItem value="">All Payment Types</MenuItem>
            {/* Add your payment type options here */}
          </TextField>
          <TextField
            select
            label="Filter by Shipping Method"
            variant="outlined"
            value={filterShippingMethod}
            onChange={handleFilterShippingMethodChange}
            style={{ marginRight: "16px" }}
          >
            <MenuItem value="">All Shipping Methods</MenuItem>
            {/* Add your shipping method options here */}
          </TextField>
          <TextField
            type="date"
            label="Start Date"
            variant="outlined"
            value={startDate}
            onChange={handleStartDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginRight: "16px" }}
          />
          <TextField
            type="date"
            label="End Date"
            variant="outlined"
            value={endDate}
            onChange={handleEndDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginRight: "16px" }}
          />
        </div>
        <TableContainer>
          <Table
            style={{ minWidth: 900, maxWidth: "100%", overflowX: "scroll" }}
          >
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.key} style={{ paddingRight: "50px" }}>
                    {column.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row._id}>
                    {columns.map((column) => (
                      <TableCell
                        key={column.key}
                        style={{ paddingRight: "16px" }}
                      >
                        {row[column.key]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default TransacTable;
