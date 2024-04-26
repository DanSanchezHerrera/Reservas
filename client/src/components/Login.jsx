import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './Register.module.css'
import Navbar from './Navbar';

const Login = () => {

    const [formInfo, setFormInfo] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState("")

    const changeHandler = (e) => {
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })
    }

    const login = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/login", formInfo, {withCredentials: true})
            .then(res => {
                console.log(res)
                if(res.data.msg === "success!"){
                    navigate("/dashboard")
                } else {
                    setErrorMsg(res.data.msg)
                }
            }
        )
            .catch(err => console.log(err))
        console.log("Form Submitted");
        console.log(formInfo);
    }

    return (
    <div>
        <Navbar />
        <div className={styles.container}>
            <div className={styles.box}>
                <h1>Inicia Sesión:</h1>
                <form onSubmit={login}>
                    {errorMsg ? <p>{errorMsg}</p> : ""}
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email" className="form-control" name="email" onChange={changeHandler}/>
                    </div>
                    <div className="form-group">
                        <label>Contraseña: </label>
                        <input type="password" className="form-control" name="password" onChange={changeHandler}/>
                    </div>
                    <button type="submit" className={styles.boton}>Iniciar Sesión</button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default Login;
