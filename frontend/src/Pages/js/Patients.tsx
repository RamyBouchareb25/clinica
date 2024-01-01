
import Tableau from '../../components/js/Tableau';
import { useEffect, useState } from 'react';
import { Patient } from '../../models/Patients';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios'
export default function Patients() {
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingPatient, setEditingPatient] = useState<Patient[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editPatient = async (patients: Patient[]) => {
    patients.forEach(async (pat) => {
        const response = await axios.patch(`http://localhost:8000/api/patients/${pat.id}/`, {Nom: pat.nom});
        console.log(response.data,response.status)
    });
   
    await getPatients();
}
const getPatients = async () => {
  const list:Patient[] = [];
  const response = await axios.get('https://django-production-70ce.up.railway.app/api/patients/');
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
      <Tableau editingIndex={editingIndex} setEditingIndex={setEditingIndex} setEditingPatient={setEditingPatient} patients={patients} setPatients={setPatients}/>
      <div className='button-container'>
        <Button variant="outline-primary" onClick={() => editPatient(editingPatient)}>Submit</Button>
        <Button variant="outline-primary" onClick={async() => {
            await getPatients()
            setEditingIndex(-1)
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
