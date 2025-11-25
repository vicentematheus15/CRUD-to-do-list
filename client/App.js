import './App.css';
import { useState } from "react"; 
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [nombre,setNombre] = useState("");
  const [edad,setEdad] = useState();
  const [pais,setPais] = useState("");
  const [cargo,setCargo] = useState("");
  const [anios,setAnios] = useState();
  const [id,setId] = useState();

  const [editar,setEditar] = useState(false);

  const [empleadosList,setEmpleados] = useState([]);

  const add = () => {

      Axios.post("http://localhost:3001/create",{
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
    }).then(()=>{
      getEmpleados();
      alert("Empregado registrado");
      limpiarCampos();
    });
  }

  const update = () => {

    Axios.put("http://localhost:3001/update",{
    id:id,
    nombre:nombre,
    edad:edad,
    pais:pais,
    cargo:cargo,
    anios:anios
  }).then(()=>{
    getEmpleados();
    alert("Atualizado!!!");
    limpiarCampos();
  });
}

const deleteEmpleados = (id) => {

  Axios.delete(`http://localhost:3001/delete/${id}`).then(()=>{
  getEmpleados();
  alert("Eliminado!!!");
  limpiarCampos();
});
}




const limpiarCampos = ()=> {

  setNombre("");
  setEdad(0);
  setPais("");
  setCargo("");
  setAnios(0);
  setId(0);
  setEditar(false);


}


  const editarEmpleado = (val)=> {

    setEditar(true);

    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);
    setId(val.id);


  }



  const getEmpleados = () => {

      Axios.get("http://localhost:3001/empleados").then((response)=>{
      setEmpleados(response.data);
    });  

  }

  getEmpleados();



  return (


<div className="container">

      <div className="card text-center">
    <div className="card-header">
      GestÃ£o de FuncionÃ¡rios
    </div>
    <div className="card-body">
      <div className="input-group mb-3">
       <span className="input-group-text" id="basic-addon1">Nome:</span>
       <input type="text" value={nombre}
       onChange={(event)=>{
        setNombre(event.target.value);
      }}
       className="form-control" placeholder="Escreva um nome" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
       <span className="input-group-text" id="basic-addon1">Idade:</span>
       <input type="number" value={edad}      
       onChange={(event)=>{
        setEdad(event.target.value);
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
       <input type="number" value={anios}     
       onChange={(event)=>{
        setAnios(event.target.value);
      }}
       className="form-control" placeholder="Escreva anos de experiÃªncia " aria-label="Username" aria-describedby="basic-addon1"/>
      </div>
          
    </div>
    <div className="card-footer text-muted">

        {
          editar? 
          <div>
          <button className='btn btn-warning m-2' onClick={update}>Atualizar</button><button className='btn btn-info' onClick={limpiarCampos}>Cancelar</button>
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
      <th scope="col">AÃ§oes</th>

    </tr>
    </thead>
    <tbody>

    {
      empleadosList.map((val,key)=>{
        return <tr key={val.id}>
                  <th>{val.id}</th>
                  <td>{val.nombre}</td>
                  <td>{val.edad}</td>
                  <td>{val.pais}</td>
                  <td>{val.cargo}</td>
                  <td>{val.anios}</td>
                  <td>
                    
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button"
                      
                      onClick={()=>{

                        editarEmpleado(val);
                      }}
                      
                      className="btn btn-info">Editar</button>
                      <button type="button" 
                      
                      onClick={()=>{

                        deleteEmpleados(val.id);
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
}

export default App;

