import { useState, useEffect } from "react";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";

const RefundTableAdmin = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [refunds, setRefunds] = useState([]);
  const [totalRefunds, setTotalRefunds] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/refunds/getRefunds");
        setRefunds(response.data.data);
        setTotalRefunds(response.data.count);
      } catch (error) {
        console.error("Error fetching refunds:", error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusChange = async (event, refundId) => {
    const newStatus = event.target.value;
    try {
      await axios.put(`/api/refunds/updateRefund/${refundId}`, {
        status: newStatus,
      });
      // Refresh the data after status update
      const response = await axios.get("/api/refunds/getRefunds");
      setRefunds(response.data.data);
    } catch (error) {
      console.error("Error updating refund status:", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Refund ID</TableCell>
            <TableCell>Refund Reason</TableCell>
            <TableCell>Payment ID</TableCell>
            <TableCell>Refund Description</TableCell>
            <TableCell>Photo</TableCell>
            <TableCell>User Email</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {refunds.map((refund) => (
            <TableRow key={refund._id}>
              <TableCell>{refund.refundId}</TableCell>
              <TableCell>{refund.refundReason}</TableCell>
              <TableCell>{refund.paymentId}</TableCell>
              <TableCell>{refund.refundDescription}</TableCell>
              <TableCell>{refund.photo}</TableCell>
              <TableCell>{refund.userEmail}</TableCell>
              <TableCell>
                <Select
                  value={refund.status}
                  onChange={(e) => handleStatusChange(e, refund._id)}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Declined">Declined</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalRefunds}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default RefundTableAdmin;
