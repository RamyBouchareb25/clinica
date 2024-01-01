
import Tableau from '../../components/ts/Tableau';
import { useEffect, useState } from 'react';
import { Patient } from '../../models/Patients';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios'
import { toast } from 'react-toastify';
export default function Patients() {
  const [editingIndexRow, setEditingIndexRow] = useState(-1);
  const [editingIndexColumn, setEditingIndexColumn] = useState(-1);
  const [editingPatient, setEditingPatient] = useState<Patient[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editPatient = async (patients: Patient[]) => {
    
    const promises = patients.map((patient) => {
      return axios.put('http://localhost:8000/api/patients/'+ patient.id +'/', Patient.toJson(patient));
    });
    toast.promise(Promise.all(promises), {
      pending: 'Modification en cours...',
      success: {
        render({ data }) {
          console.log(data)
          return `Modification effectuée avec succès !`;
        }
      },
      error: {
        render({ data }) {
          console.log(data)
          return `Erreur lors de la modification du patient !`;
        }
      }
    });
    await Promise.all(promises);
    await getPatients();
}
const getPatients = async () => {
  const list:Patient[] = [];
  const response = await axios.get('http://localhost:8000/api/patients/');
  response.data.forEach((patient: unknown) => {
      list.push(Patient.fromJson(patient));
  });
  setPatients(list);
}

useEffect(()    => {
  getPatients();
}, [])
  return (
    <div className='patients-container'>
      <h2>Patients List :</h2>
      <Tableau editingIndexRow={editingIndexRow} editingIndexColumn={editingIndexColumn} setEditingIndexColumn={setEditingIndexColumn} setEditingIndexRow={setEditingIndexRow} setEditingPatient={setEditingPatient} patients={patients} setPatients={setPatients}/>
      <div className='button-container'>
        <Button variant="outline-primary" onClick={() => editPatient(editingPatient)}>Submit</Button>
        <Button variant="outline-primary" onClick={async() => {
            await getPatients()
            setEditingIndexRow(-1)
            setEditingIndexColumn(-1)
            setEditingPatient([])
            }}>Cancel</Button>
      </div>
      

      

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


    </div>
  )
}
