import '.App.css';
import {useEffect, useState} from "react";
import Axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState();
    const [pais, setPais] = useState("");
    const [cargo, setCargo] = useState("");
    const [anos, setAnos] = useState();
    const [id, setId] = useState();

    const [editar, setEditar] = useState(false);
    
    const [listaEmpregados, setEmpregados] = useState([]);

    const add = () => {
        Axios.post("http://localhost:3001/create", {
            nome:nome,
            idade:idade,
            pais:pais,
            cargo:cargo,
            anos:anos
        }).then(()=>{getEmpregados();
            alert("Empregado registrado");
            limparCampos();
    })
    }

    const getEmpregados = () => {
        Axios.get("http://localhost:3001/empregados").then((response)=> {setListaEmpregados(response.data);
    });
    }

    getEmpregados(){
        return (
            
        )
    };

}