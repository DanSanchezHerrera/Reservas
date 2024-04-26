import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import styles from './Register.module.css';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const Register = () => {
    const navigate = useNavigate();
    const [formInfo, setFormInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirm: ''
    });
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);

    const changeHandler = (e) => {
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        });
    };

    const register = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', formInfo, { withCredentials: true })
            .then(res => {
                if (res.data.errors) {
                    setErrors(res.data.errors);
                } else {
                    setShowModal(true);
                    setTimeout(() => {
                        setShowModal(false);
                        navigate('/');
                    }, 2000); // Close the modal and redirect after 2 seconds
                }
            })
            .catch(err => {
                console.log('Registration error:', err);
                setErrors({ message: err.message });
            });
    };

    return (
        <div>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.box}>
                    <h1>Registrarse</h1>
                    <form onSubmit={register}>
                        <div className="form-group">
                            <label>Primer Nombre:</label>
                            <input type="text" className="form-control" name="firstName" onChange={changeHandler} />
                            {errors.firstName && <p>{errors.firstName.message}</p>}
                        </div>
                        <div className="form-group">
                            <label>Apellido:</label>
                            <input type="text" className="form-control" name="lastName" onChange={changeHandler} />
                            {errors.lastName && <p>{errors.lastName.message}</p>}
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" className="form-control" name="email" onChange={changeHandler} />
                            {errors.email && <p>{errors.email.message}</p>}
                        </div>
                        <div className="form-group">
                            <label>Contraseña:</label>
                            <input type="password" className="form-control" name="password" onChange={changeHandler} />
                            {errors.password && <p>{errors.password.message}</p>}
                        </div>
                        <div className="form-group">
                            <label>Confirmar Contraseña:</label>
                            <input type="password" className="form-control" name="confirmPassword" onChange={changeHandler} />
                            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                        </div>
                        <button type="submit" className={styles.boton}>Registrar</button>
                    </form>
                </div>
            </div>
            <Dialog
                open={showModal}
                onClose={() => setShowModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Registro Exitoso"}</DialogTitle>
                <DialogContent>
                    <p>Registro exitoso. Serás redirigido en breve.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowModal(false)}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Register;
