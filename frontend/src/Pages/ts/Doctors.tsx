import { useEffect, useState } from "react";
import Tableau from "../../components/ts/Tableau";
import { Person } from "../../models/Person";
import { Button, Form, Modal } from "react-bootstrap";
import { Doctor } from "../../models/Doctor";
import axios from "axios";
import { toast } from "react-toastify";
import { Fab } from "@mui/material";
import * as IoIcons from "react-icons/io";
import Loading from "../../components/ts/Loading";

export default function Doctors() {
    const [editingIndexRow, setEditingIndexRow] = useState(-1);
    const [editingIndexColumn, setEditingIndexColumn] = useState(-1);
    const [editingPatient, setEditingPatient] = useState<Person[]>([]);
    const [patients, setPatients] = useState<Person[]>([]);
    const [Sexe, setSexe] = useState(1);
    const [show, setShow] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [id, setId] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [specialite, setSpecialite] = useState(1);

    const handleCloseWarning = () => setShowWarning(false);
    const handleClose = () => setShow(false)

    const handleShow = async () => {
        setShow(true);
        await getDoctors();
    }
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);
        data.sexe = Sexe.toString();
        data.specialite = specialite.toString();
        const DateNaissance = new Date(data.DateNaissance.toString());
        data.DateNaissance = DateNaissance.toISOString().split('T')[0];
        // console.log(JSON.stringify(data, null, 2));
        const promise = axios.post("http://localhost:8000/api/Doctors/", data);
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
        await promise;
        await getDoctors();
    };

    const showDeleteModal = (index:number) => {
        setShowWarning(true);
        setId(index);
      }
    
      const editDoctor = async (patients: Doctor[]) => {
        const promises = patients.map((patient) => {
          return axios.put(
            "http://localhost:8000/api/Doctors/" + patient.ID_Medecin + "/",
            Doctor.toJson(patient)
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
              return `Erreur lors de la modification du Medecin !`;
            },
          },
        });
        await Promise.all(promises);
        await getDoctors();
      };
      const getDoctors = async () => {
        const list: Doctor[] = [];
        const response = await axios.get("http://localhost:8000/api/Doctors/");
        response.data.forEach((doc: unknown) => {
          list.push(Doctor.fromJson(doc));
        });
        setPatients(list);
        setIsLoading(false);
      };
    
      useEffect(() => {
        getDoctors();
      }, []);
      const deleteDoctor = async (id: number) => {
        const promise = axios.delete("http://localhost:8000/api/Doctors/" + id + "/");
        toast.promise(promise, {
          pending: "Suppression en cours...",
          success: {
            render() {
              return `Medecin supprimé avec succès !`;
            },
          },
          error: {
            render() {
              return `Erreur lors de la suppression du patient !`;
            },
          },
        });
        await promise;
        await getDoctors();
      }

  return (
    isLoading ? <Loading /> :
    <div className="table-container">
      <h2>Doctors List :</h2>
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
          onClick={() => editDoctor(editingPatient as Doctor[])}
        >
          Submit
        </Button>
        <Button
          variant="outline-primary"
          onClick={async () => {
            await getDoctors();
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
          deleteDoctor(id);
        }}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>

      {/* Modal for adding a patient */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Doctor to the database :</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleSubmit}
            action="http://localhost:8000/api/Doctors/"
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
            <Form.Group controlId="specialite">
              <Form.Label>specialite</Form.Label>
              <Form.Control
                value={specialite}
                as="select"
                name="specialite"
                onChange={(e) => {
                  const value = Number(e.target.value); // Convertit la valeur en nombre
                  setSpecialite(value); // Met à jour l'état avec la nouvelle valeur
                }}
                required
              >
                <option value="1">Cardiologue</option>
                <option value="2">Neurologue</option>
                <option value="3">Urologue</option>
                <option value="4">Rhumatologue</option>
                <option value="5">ORL</option>
                <option value="6">Generaliste</option>
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
