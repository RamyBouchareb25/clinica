import Tableau from "../../components/ts/Tableau";
import { useEffect, useState} from "react";
import { Patient } from "../../models/Patient";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import Fab from "@mui/material/Fab";
import * as IoIcons from "react-icons/io";
import { Person } from "../../models/Person";
import Loading from "../../components/ts/Loading";

export default function Patients() {
  const [editingIndexRow, setEditingIndexRow] = useState(-1);
  const [editingIndexColumn, setEditingIndexColumn] = useState(-1);
  const [editingPatient, setEditingPatient] = useState<Person[]>([]);
  const [patients, setPatients] = useState<Person[]>([]);
  const [Sexe, setSexe] = useState(1);
  const [show, setShow] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [id, setId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);



  const handleCloseWarning = () => setShowWarning(false);
  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setShow(true);
    await getPatients();
  }
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    data.sexe = Sexe.toString();
    const DateNaissance = new Date(data.DateNaissance.toString());
    data.DateNaissance = DateNaissance.toISOString().split('T')[0];
    // console.log(JSON.stringify(data, null, 2));
    const promise = axios.post("http://localhost:8000/api/patients/", data);
    toast.promise(promise, {
      pending: "Ajout en cours...",
      success: {
        render() {
          return `Patient ajouté avec succès !`;
        },
      },
      error: {
        render() {
          return `Erreur lors de l'ajout du patient !`;
        },
      },
    });
    const response = await promise;
    console.log(response.data);
  };
  const editPatient = async (patients: Patient[]) => {
    const promises = patients.map((patient) => {
      return axios.put(
        "http://localhost:8000/api/patients/" + patient.id + "/",
        Patient.toJson(patient)
      );
    });
    toast.promise(Promise.all(promises), {
      pending: "Modification en cours...",
      success: {
        render() {
          return `Modification effectuée avec succès !`;
        },
      },
      error: {
        render() {
          return `Erreur lors de la modification du patient !`;
        },
      },
    });
    await Promise.all(promises);
    await getPatients();
  };
  const getPatients = async () => {
    const list: Patient[] = [];
    const response = await axios.get("http://localhost:8000/api/patients/");
    response.data.forEach((patient: unknown) => {
      list.push(Patient.fromJson(patient));
    });
    setPatients(list);
    setIsLoading(false);
  };

  useEffect(() => {
    getPatients();
  }, []);
  const deletePatient = async (id: number) => {
    const promise = axios.delete("http://localhost:8000/api/patients/" + id + "/");
    toast.promise(promise, {
      pending: "Suppression en cours...",
      success: {
        render() {
          return `Patient supprimé avec succès !`;
        },
      },
      error: {
        render() {
          return `Erreur lors de la suppression du patient !`;
        },
      },
    });
    await promise;
    await getPatients();
  }
  const showDeleteModal = (index:number) => {
    setShowWarning(true);
    setId(index);
  }
  return (
    isLoading ? <Loading /> :
    <div className="table-container">
      <h2>Patients List :</h2>
      <Tableau
        setShow={showDeleteModal}
        editingIndexRow={editingIndexRow}
        editingIndexColumn={editingIndexColumn}
        setEditingIndexColumn={setEditingIndexColumn}
        setEditingIndexRow={setEditingIndexRow}
        persons={patients}
        setEditingPerson={setEditingPatient}
        setPerson={setPatients}
      />
      <div className="button-container">
        <Button
          variant="outline-primary"
          onClick={() => editPatient(editingPatient as Patient[])}
        >
          Submit
        </Button>
        <Button
          variant="outline-primary"
          onClick={async () => {
            await getPatients();
            setEditingIndexRow(-1);
            setEditingIndexColumn(-1);
            setEditingPatient([]);
          }}
        >
          Cancel
        </Button>
      </div>

      <Fab className="fab" color="primary" aria-label="add" onClick={handleShow}>
        <IoIcons.IoMdPersonAdd />
      </Fab>

      {/* Modal for deleting a patient */}

      
      <Modal show={showWarning} onHide={handleCloseWarning}>
      <Modal.Header closeButton>
        <Modal.Title>Warning</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this patient?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseWarning}>
          No
        </Button>
        <Button variant="danger" onClick={() => {
          handleCloseWarning();
          deletePatient(id);
        }}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>

      {/* Modal for adding a patient */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Patient to the database :</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleSubmit}
            action="http://localhost:8000/api/patients/"
            id="myForm"
            method="post"
          >
            <Form.Group controlId="Nom">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="Nom"
                required
              />
            </Form.Group>

            <Form.Group controlId="Prenom">
              <Form.Label>Prenom</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name="Prenom"
                required
              />
            </Form.Group>

            <Form.Group controlId="sexe">
              <Form.Label>sexe</Form.Label>
              <Form.Control
                value={Sexe}
                as="select"
                name="sexe"
                onChange={(e) => {
                  const value = Number(e.target.value); // Convertit la valeur en nombre
                  setSexe(value); // Met à jour l'état avec la nouvelle valeur
                }}
                required
              >
                <option value="1">Homme</option>
                <option value="2">Femme</option>
              </Form.Control>
            </Form.Group>
            
            <Form.Group controlId="DateNaissance">
            <Form.Label>Date de naissance :</Form.Label>
            <Form.Control
              type="date"
              name="DateNaissance"
              required
            />
          </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                required
              />
            </Form.Group>

            <Form.Group controlId="num_tel">
              <Form.Label>Numéro de téléphone</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter phone number"
                name="num_tel"
                required
              />
            </Form.Group>

            <Form.Group controlId="Adresse">
              <Form.Label>Adresse :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Adress"
                name="Adresse"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "flex-end" }}>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{ marginRight: "10px" }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            form="myForm"
            onClick={handleClose}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
