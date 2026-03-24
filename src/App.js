import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { data } from 'react-router-dom';

function App() {
  const [task, setask] = useState("");
  const [list, setlist] = useState([]);
  const [len, setlen] = useState(0);
  const [pn, setpn] = useState(0);
  const [compt, setcompt] = useState(0);
  const [editask, setedit] = useState("");
  const [flag, setflag] = useState(false);
  const cancel = () => {
    setflag(false);
    setedit("");
  }
  const addtask = async () => {
    const data = { task }
    const resp = await fetch("http://localhost:9000/api/addtask",
      {
        method: "post",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json" }
      }
    )

    if (resp.ok) {
      let res = await resp.json();
      if (res.statuscode == 1) {
        alert("task addedd successfully")
        fetchtask();
      }
    }
    else {
      alert("fail to fetch0000")
    }
  }

  const modstatus = async (idk) => {
    const resp = await fetch(`http://localhost:9000/api/complete/${idk}`,
      {
        method: "put",
        headers: { "Content-type": "application/json" }
      }
    )

    if (resp.ok) {
      let res = await resp.json();
      if (res.statuscode == 1) {
        fetchtask();
      }
    }
    else {
      alert("fail to fetch0000")
    }
  }
  const editaskn = async (idk) => {
    const data = { editask }
    const resp = await fetch(`http://localhost:9000/api/editask/${idk}`,
      {
        method: "put",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json" }
      }
    )

    if (resp.ok) {
      let res = await resp.json();
      if (res.statuscode == 1) {
        fetchtask();
        setflag(false)
        setedit("");
        setidt("");
      }

    }
    else {
      alert("fail to fetch0000")
    }
  }
  const dltstatus = async (idk) => {
    const ans = window.confirm("Are you sure you want to delete this task? ")
    if (ans == false) {
      console.log("function cancel")
    }
    else {
      const resp = await fetch(`http://localhost:9000/api/rmv/${idk}`,
        {
          method: "delete",
          headers: { "Content-type": "application/json" }
        }
      )

      if (resp.ok) {
        let res = await resp.json();
        if (res.statuscode == 1) {
          fetchtask();
        }
      }
      else {
        alert("fail to fetch0000")
      }
    }

  }
  const fetchtask = async () => {
    const resp = await fetch("http://localhost:9000/api/getask");
    if (resp.ok) {
      let res = await resp.json();
      if (res.statuscode == 1) {
        setlist(res.dt);
        setlen(res.dt.length);
        setpn(res.dt.filter(item => item.Status == "pending").length)
        setcompt(res.dt.filter(item => item.Status == "completed").length)
      }
      else {
        alert(
          "no task added"
        )
      }
    }
    else {
      alert("fail to fetch0000")
    }
  }

  const [idk,setidt] = useState("");

  const handledit = (etask, idk) => {
    setedit(etask)
    setflag(true);
    setidt(idk)
  }


  useEffect(() => {
    fetchtask();
  }, [])

  return (
    <div className="App">
      <div className="nav">
        <strong>Task Manager</strong>
        <div>Welcome, Developer</div>
      </div>

      <div className="container">

        <h2 style={{ textAlign: "center" }}>Task Manager ✍️</h2>

        <div className="cardk">

          {
            flag ?
              <>

                <input onChange={(e) => setedit(e.target.value)} type="text" value={editask} /> &nbsp; &nbsp; &nbsp;
                <button className="btn btn-primary" onClick={()=>editaskn(idk)} > Update Task</button>
                <button className="btn btn-secondary" onClick={cancel} > cancel</button>
              </>
              :
              <>


                <input onChange={(e) => setask(e.target.value)} type="text" placeholder="Enter your task..." /> &nbsp; &nbsp; &nbsp;
                <button className="btn btn-primary" onClick={addtask}>Add Task</button>
              </>
          }
          <div className="cardk">
            <table className='tablek'>
              {

                list?.map((data, ind) => (

                  <tr key={ind}>
                    <td> {data.Task}</td>
                    <td>
                      <button key={ind} onClick={() => modstatus(data._id)} style={{
                        backgroundColor: data.Status == "completed" ?
                          "green" : "#6c757d", color: "white"
                      }}>
                        {data.Status}</button> </td>

                    <td> <button onClick={() => handledit(`${data.Task}`, `${data._id}` )} className="edit">Edit</button></td>
                    <td>
                      <button onClick={() => dltstatus(data._id)} className="btn btn-danger" >Delete</button>
                    </td>

                  </tr>
                ))
              }


            </table>
          </div>
        </div>

        <div className="card stats">
          <div>Total: {len}</div>
          <div>Completed: {compt}</div>
          <div>Pending: {pn}</div>
        </div>

      </div >
    </div>
  );
}

export default App;
