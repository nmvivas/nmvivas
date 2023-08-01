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
  const handleCancel = () => {
    setShowModal(false);
  };
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
  const handleNewUserCancel = () => {
    setShowCreateModal(false);
  };

  // Función de validación de email
function validateEmail(email) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

// Función de validación de contraseña
function validatePassword(password) {
  const passwordRegex = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
  return passwordRegex.test(password);
}

  // useEffect(() => {
  //   async function fetchData() {
  //     const result = await axios("http://localhost:3001/users");
  //     setUsers(result.data);
  //   }

  //   fetchData();
  // }, []);

  useEffect(() => {
    async function fetchData() {
      const result = await axios("http://192.168.147.7:3001/users");
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
              const numericValue = e.target.value.replace(/\D/g, ""); // Remover todos los caracteres no numéricos
              const limitedValue = numericValue.slice(0, 10); // Limitar la longitud a 8 dígitos
              setNewUserForm({ ...newUserForm, cedula: limitedValue });
            }}
            inputProps={{
              pattern: "[0-9]*", // Solo permite caracteres numéricos
              maxLength: 10, // Limita la longitud a 8 dígitos
              inputMode: "numeric", // Configura el teclado para mostrar el modo numérico en dispositivos móviles
            }}
          />
          <TextField
            sx={{ width: "100%", marginBottom: "15px" }}
            id="standard-basic"
            label="Nombre"
            variant="standard"
            value={newUserForm.nombre}
            onChange={(e) => {
              const onlyLetters = e.target.value.replace(/[^A-Za-zÁ-ÿ\s]/g, ""); // Remover todos los caracteres que no sean letras o espacios
              setNewUserForm({ ...newUserForm, nombre: onlyLetters });
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
            error={!validateEmail(newUserForm.email)} // Validar si el email es válido
            helperText={!validateEmail(newUserForm.email) ? 'El formato del email es inválido' : ''}
          />
          <TextField
            sx={{ width: "100%", marginBottom: "15px" }}
            id="standard-basic"
            label="Usuario"
            variant="standard"
            value={newUserForm.usuario}
            onChange={(e) => {
              const noSpacesValue = e.target.value.replace(/\s/g, ""); // Remover espacios en blanco
              setNewUserForm({ ...newUserForm, usuario: noSpacesValue });
            }}
          />
          <TextField
            sx={{ width: "100%", marginBottom: "45px" }}
            id="standard-basic"
            label="Contraseña"
            variant="standard"
            value={newUserForm.password}
            onChange={(e) => {
              const passwordValue = e.target.value;
              setNewUserForm({ ...newUserForm, password: passwordValue });
            }}
            error={!validatePassword(newUserForm.password)} // Validar si la contraseña es válida
            helperText={!validatePassword(newUserForm.password) ? 'La contraseña debe tener al menos 8 caracteres y contener un carácter especial' : ''}
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
                color: "white",
              }}
              variant="contained"
              onClick={handleNewUserCancel}
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                const response = await axios.post(
                  "http://192.168.147.7:3001/users/create",
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
              const numericValue = e.target.value.replace(/\D/g, ""); // Remover todos los caracteres no numéricos
              const limitedValue = numericValue.slice(0, 10); // Limitar la longitud a 10 dígitos
              setSelected({ ...selected, cedula: limitedValue });
            }}
            inputProps={{
              pattern: "[0-9]*", // Solo permite caracteres numéricos
              maxLength: 10, // Limita la longitud a 10 dígitos
              inputMode: "numeric", // Configura el teclado para mostrar el modo numérico en dispositivos móviles
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
            error={!validateEmail(selected.email)} // Validar si el email es válido
            helperText={!validateEmail(selected.email) ? 'El formato del email es inválido' : ''}
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
                color: "white",
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              sx={{
                backgroundColor: "success.main",
              }}
              onClick={async () => {
                const response = await axios.post(
                  "http://192.168.147.7:3001/users/edit",
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
                        "http://192.168.147.7:3001/users/delete",
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
