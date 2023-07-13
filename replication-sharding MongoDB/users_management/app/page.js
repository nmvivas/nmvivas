"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TextField from "@mui/material/TextField";

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Modal, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ModeEdit } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";
import axios from "axios";

const rows = [
  {
    id: 1,
    cedula: "111111111111",
    nombre: "Admin",
    email: "admin@gmail.com",
    usuario: "admin",
    pass: "admin123",
  },
  {
    id: 2,
    cedula: "222222222222",
    nombre: "Admin",
    email: "admin@gmail.com",
    usuario: "admin",
    pass: "admin123",
  },
  {
    id: 3,
    cedula: "333333333333",
    nombre: "Admin",
    email: "admin@gmail.com",
    usuario: "admin",
    pass: "admin123",
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  borderRadius: "5px",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 5,
};

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState({
    cedula: "",
    nombre: "",
    email: "",
    usuario: "",
    password: "",
    _id: "",
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [newUserForm, setNewUserForm] = useState({
    cedula: "",
    nombre: "",
    email: "",
    usuario: "",
    password: "",
  });

  useEffect(() => {
    async function fetchData() {
      const result = await axios("http://localhost:3001/users");
      setUsers(result.data);
    }

    fetchData();
  }, []);
  console.log(newUserForm);
  return (
    <Box sx={{ padding: "35px" }}>
      <Modal
        open={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
        }}
      >
        <Box sx={style}>
          <Typography sx={{ marginBottom: "22px" }} variant="h4">
            New User
          </Typography>
          <TextField
            sx={{ width: "100%", marginBottom: "15px" }}
            id="standard-basic"
            label="Cedula"
            variant="standard"
            value={newUserForm.cedula}
            onChange={(e) => {
              setNewUserForm({ ...newUserForm, cedula: e.target.value });
            }}
          />
          <TextField
            sx={{ width: "100%", marginBottom: "15px" }}
            id="standard-basic"
            label="Nombre"
            variant="standard"
            value={newUserForm.nombre}
            onChange={(e) => {
              setNewUserForm({ ...newUserForm, nombre: e.target.value });
            }}
          />
          <TextField
            sx={{ width: "100%", marginBottom: "15px" }}
            id="standard-basic"
            label="Email"
            variant="standard"
            value={newUserForm.email}
            onChange={(e) => {
              setNewUserForm({ ...newUserForm, email: e.target.value });
            }}
          />
          <TextField
            sx={{ width: "100%", marginBottom: "15px" }}
            id="standard-basic"
            label="Usuario"
            variant="standard"
            value={newUserForm.usuario}
            onChange={(e) => {
              setNewUserForm({ ...newUserForm, usuario: e.target.value });
            }}
          />
          <TextField
            sx={{ width: "100%", marginBottom: "45px" }}
            id="standard-basic"
            label="Contraseña"
            variant="standard"
            value={newUserForm.password}
            onChange={(e) => {
              setNewUserForm({ ...newUserForm, password: e.target.value });
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
            }}
          >
            <Button
              sx={{
                marginRight: 2,
                backgroundColor: "error.main",
              }}
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3001/users/create",
                  newUserForm
                );
                console.log("asdasd");
                console.log(response);

                if (response.status === 200) {
                  setShowCreateModal(false);
                  setUsers([...users, newUserForm]);
                }

                console.log(response);
              }}
              sx={{
                backgroundColor: "success.main",
              }}
              variant="contained"
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <Box sx={style}>
          <Typography sx={{ marginBottom: "22px" }} variant="h4">
            Edit User
          </Typography>
          <TextField
            sx={{ width: "100%", marginBottom: "15px" }}
            id="standard-basic"
            label="Cedula"
            variant="standard"
            value={selected.cedula}
            onChange={(e) => {
              setSelected({ ...selected, cedula: e.target.value });
            }}
          />
          <TextField
            sx={{ width: "100%", marginBottom: "15px" }}
            id="standard-basic"
            label="Nombre"
            variant="standard"
            value={selected.nombre}
            onChange={(e) => {
              setSelected({ ...selected, nombre: e.target.value });
            }}
          />
          <TextField
            sx={{ width: "100%", marginBottom: "15px" }}
            id="standard-basic"
            label="Email"
            variant="standard"
            value={selected.email}
            onChange={(e) => {
              setSelected({ ...selected, email: e.target.value });
            }}
          />
          <TextField
            sx={{ width: "100%", marginBottom: "15px" }}
            id="standard-basic"
            label="Usuario"
            variant="standard"
            value={selected.usuario}
            onChange={(e) => {
              setSelected({ ...selected, usuario: e.target.value });
            }}
          />
          <TextField
            sx={{ width: "100%", marginBottom: "45px" }}
            id="standard-basic"
            label="Contraseña"
            variant="standard"
            value={selected.password}
            onChange={(e) => {
              setSelected({ ...selected, password: e.target.value });
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
            }}
          >
            <Button
              sx={{
                marginRight: 2,
                backgroundColor: "error.main",
              }}
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              sx={{
                backgroundColor: "success.main",
              }}
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3001/users/edit",
                  { ...selected }
                );

                if (response.status === 200) {
                  setUsers(
                    users.map((u) => {
                      if (u._id === selected._id) {
                        u = { ...selected };
                      }
                      return u;
                    })
                  );
                  setShowModal(false);
                }
              }}
              variant="contained"
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "25px",
        }}
      >
        <Typography variant="h3">Users Management CRUD</Typography>
        <Box
          onClick={() => {
            setShowCreateModal(true);
          }}
          sx={{
            display: "flex",
            padding: "4px",
            cursor: "pointer",
            backgroundColor: "success.light",
            borderRadius: 1,
          }}
        >
          <AddIcon fontSize="large" sx={{ color: "white" }} />
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "600" }}>Cedula</TableCell>
              <TableCell sx={{ fontWeight: "600" }} align="right">
                Nombre
              </TableCell>
              <TableCell sx={{ fontWeight: "600" }} align="right">
                Email
              </TableCell>
              <TableCell sx={{ fontWeight: "600" }} align="right">
                Usuario
              </TableCell>
              <TableCell sx={{ fontWeight: "600" }} align="right">
                Contraseña
              </TableCell>
              <TableCell sx={{ fontWeight: "600" }} align="right"></TableCell>
              <TableCell sx={{ fontWeight: "600" }} align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.cedula}
                </TableCell>
                <TableCell align="right">{row.nombre}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.usuario}</TableCell>
                <TableCell align="right">{row.password}</TableCell>
                <TableCell width="30px" align="right">
                  <Box
                    onClick={() => {
                      setShowModal(true);
                      setSelected(row);
                    }}
                    sx={{
                      borderRadius: "7px",
                      cursor: "pointer",
                      backgroundColor: "warning.light",
                      display: "flex",
                      justifyContent: "center",
                      padding: "6px",
                    }}
                  >
                    <ModeEdit fontSize="medium" sx={{ color: "white" }} />
                  </Box>
                </TableCell>
                <TableCell width="30px" align="right">
                  <Box
                    onClick={async () => {
                      const response = await axios.post(
                        "http://localhost:3001/users/delete",
                        { _id: row._id }
                      );

                      if (response.status === 200) {
                        setUsers(users.filter((u) => u._id != row._id));
                      }
                    }}
                    sx={{
                      cursor: "pointer",
                      borderRadius: "7px",
                      backgroundColor: "error.light",
                      display: "flex",
                      justifyContent: "center",
                      padding: "6px",
                    }}
                  >
                    <ClearIcon fontSize="medium" sx={{ color: "white" }} />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
