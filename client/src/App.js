import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App(){
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState();
  const [pais, setPais] = useState('');
  const [cargo, setCargo] = useState('');
  const [anos, setAnos] = useState();
  const [id, setId] = useState();

  const [editar, setEditar] = useState(false);
  const [empregadoList, setEmpregadoList] = useState([]);

  const add = ()=>{
    Axios.post("http://localhost:3001/create", {
      nome:nome,
      idade:idade,
      pais:pais,
      cargo:cargo,
      anos:anos
    }).then(()=>{
    getEmpregados();
    alert("Empregado registrado.");
    limparCampos();
  });
  };

  const update = () => {

    Axios.put("http://localhost:3001/update",{
    id:id,
    nome:nome,
    idade:idade,
    pais:pais,
    cargo:cargo,
    anos:anos
  }).then(()=>{
    getEmpregados();
    alert("Atualizado!!!");
    limparCampos();
  });
}

const deleteEmpregado = (id) => {

  Axios.delete(`http://localhost:3001/delete/${id}`).then(()=>{
  getEmpregados();
  alert("Eliminado!!!");
  limparCampos();
});
}

const limparCampos = ()=> {

  setNome("");
  setIdade(0);
  setPais("");
  setCargo("");
  setAnos(0);
  setId(0);
  setEditar(false);

}




  const getEmpregados = () => {
    Axios.get("http://localhost:3001/create").then((response)=>{
      setEmpregadoList(response.data);
    });
  };

  getEmpregados();

  return(
    <div className="container">

      <div className="card text-center">
    <div className="card-header">
      Gestão de Funcionários
    </div>
    <div className="card-body">
      <div className="input-group mb-3">
       <span className="input-group-text" id="basic-addon1">Nome:</span>
       <input type="text" value={nome}
       onChange={(event)=>{
        setNome(event.target.value);
      }}
       className="form-control" placeholder="Escreva um nome" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
       <span className="input-group-text" id="basic-addon1">Idade:</span>
       <input type="number" value={idade}      
       onChange={(event)=>{
        setIdade(event.target.value);
      }}
       className="form-control" placeholder="Escreva a idade " aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
       <span className="input-group-text" id="basic-addon1">Pais:</span>
       <input type="text" value={pais}      
       onChange={(event)=>{
        setPais(event.target.value);
      }}
       className="form-control" placeholder="Escreva o Pais " aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
       <span className="input-group-text" id="basic-addon1">Cargo:</span>
       <input type="text" value={cargo}     
       onChange={(event)=>{
        setCargo(event.target.value);
      }}
       className="form-control" placeholder="Escreva o Cargo " aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
       <span className="input-group-text" id="basic-addon1">ExperiÃªncia em Anos:</span>
       <input type="number" value={anos}     
       onChange={(event)=>{
        setAnos(event.target.value);
      }}
       className="form-control" placeholder="Escreva anos de experiÃªncia " aria-label="Username" aria-describedby="basic-addon1"/>
      </div>
          
    </div>
    <div className="card-footer text-muted">

        {
          editar? 
          <div>
          <button className='btn btn-warning m-2' onClick={update}>Atualizar</button><button className='btn btn-info' onClick={limparCampos}>Cancelar</button>
          </div>
          :<button className='btn btn-success m-2' onClick={add}>Registrar</button>  
          
        }
    </div>
  </div>

    <table className="table table-striped">
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nome</th>
      <th scope="col">Idade</th>
      <th scope="col">Pais</th>
      <th scope="col">Cargo</th>
      <th scope="col">Anos</th>
      <th scope="col">Ações</th>

    </tr>
    </thead>
    <tbody>

    {
      empregadoList.map((val,key)=>{
        return <tr key={val.id}>
                  <th>{val.id}</th>
                  <td>{val.nome}</td>
                  <td>{val.idade}</td>
                  <td>{val.pais}</td>
                  <td>{val.cargo}</td>
                  <td>{val.anos}</td>
                  <td>
                    
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button"
                      
                      onClick={()=>{

                        editarEmpregado(val);
                      }}
                      
                      className="btn btn-info">Editar</button>
                      <button type="button" 
                      
                      onClick={()=>{

                        deleteEmpregado(val.id);
                      }}

                      className="btn btn-danger">Eliminar</button>
                    </div>
                  </td>
                </tr>
    })
    }
    </tbody>
    </table>
</div>
  );
};

export default App;
