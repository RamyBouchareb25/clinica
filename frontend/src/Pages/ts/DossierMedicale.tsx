import CardItem from "../../components/ts/Card";
import "../scss/DossierMedicale.scss";
import SearchBar from "../../components/ts/SearchBar";
import { useState , useEffect} from "react";
import axios from "axios";
import { MedicalRecord, MedicalRecordJson } from "../../models/MedicalRecord";
import { Patient } from "../../models/Patient";
import { Button, Form, Modal } from "react-bootstrap";
import { DrugJson } from "../../models/Drugs";
export default function DossierMedicale() {
    
    const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([])
    const [firstMedicalRecords, setFirstMedicalRecords] = useState<MedicalRecord[]>([])
    const [activeMedicalRecord, setActiveMedicalRecord] = useState<MedicalRecord>()
    const [active, setActive] = useState<boolean>(false)

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setMedicalRecords(firstMedicalRecords.filter((medRec) => (medRec.Patient?.nom + " " + medRec.Patient?.prenom).toLowerCase().includes(e.target.value.toLowerCase())))
        console.log(e.target.value)
    }
    const fetchPatient = async ({ patient_Id }: { patient_Id: number }) => {
        const res = await axios.get(`http://localhost:8000/api/patients/${patient_Id}/`)
        return Patient.fromJson(res.data)
    }
    
    useEffect(() => {
        const fetchMedicalRecords = async () => {
            const res = await axios.get("http://localhost:8000/api/DossierMedical/")
            const promises = res.data.map(async (medRecJson:MedicalRecordJson) => {
                const medRec = MedicalRecord.fromJson(medRecJson)
                const patient = await fetchPatient({patient_Id:medRecJson.Patient})
                medRec.Patient = patient
                return medRec;
            })
            const medicalRecs= await Promise.all(promises);
            setFirstMedicalRecords(medicalRecs);
            setMedicalRecords(medicalRecs);
        }
        fetchMedicalRecords()

    }, [])
    const handleClose = () => setActive(false)
  return (
    <div className="container-medicale">
        <SearchBar onChange={handleChange}/>
        <h2>Dossiers Medicales : </h2>
        
        {medicalRecords.length === 0 && <h3 className="mt-4">No results found... X&#40;</h3>}
        {medicalRecords.map((medRec,index) => 
            <CardItem onClick={() => {setActiveMedicalRecord(medRec); setActive(true)}} key={index} CardTitle={medRec.Patient?.nom + " " + medRec.Patient?.prenom}/>
        )}
        <Modal show={active} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Medical Record</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{activeMedicalRecord?.Patient?.nom +" "+ activeMedicalRecord?.Patient?.prenom}</h4>
        <Form>
            <p><strong>Date de Création du Dossier :</strong> {activeMedicalRecord?.DateCreation.toLocaleDateString()}</p>
            <Form.Group controlId="Allergies">
                <Form.Label>Allergies</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter Patient's Allergies" defaultValue={activeMedicalRecord?.Allergies} />
            </Form.Group>
            <Form.Group controlId="Antecedents">
                <Form.Label>Antecedents</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter Patient's Antecedents" defaultValue={activeMedicalRecord?.Antecedents} />
            </Form.Group>
            <Form.Group controlId="Médicaments">
                <Form.Label>Médicaments</Form.Label>
                {activeMedicalRecord?.Medicaments.map((med,index)=>{
                    return (
                        <div className="m-auto w-75 d-flex flex-column justify-content-center">
                            <h6>Medicament {index+1}</h6>
                            <Form.Control className="my-2"  type="text" placeholder="Enter Patient's Drug name" defaultValue={med.Nom} />
                            <Form.Control className="my-2" type="text" placeholder="Enter Patient's Drug Description" defaultValue={med.Description} />
                            <Form.Control className="my-2" type="text" placeholder="Enter Patient's Drug Dosage" defaultValue={med.Dosage} />
                        </div>
                    )
                })}
                <Button className="my-2" variant="primary" onClick={() => {setActiveMedicalRecord((prev) => {
                    if (prev) {
                    const newMedicament:DrugJson = {
                        "ID_Medicament": 100,
                        "Nom": "",
                        "Description": "",
                        "Dosage" : "",
                    };
                    const newPrev = { ...prev, Medicaments: [...prev.Medicaments, newMedicament] };
                    return newPrev;
                    }
                    return prev
                })}}>
                    Add Medicament
                </Button>
            </Form.Group>
            <Form.Group controlId="Consultations">
                {activeMedicalRecord?.consultations.length != 0  && <Form.Label>Consultations</Form.Label>}
                {activeMedicalRecord?.consultations.map((cons,index)=>{
                    return (
                        <div className="m-auto w-75 d-flex flex-column justify-content-center">
                            <h6>Consultation {index+1}</h6>
                            <p><strong>numéro de la salle : </strong>{cons.salle}</p>
                            {cons.estPasser && 
                                <>
                                    <p><strong>Diagnostique de la Consultation : </strong>{cons.Diagnostic}</p>
                                    <p><strong>Traitement données par le médecin : </strong>{cons.Traitement}</p>
                                    <p><strong>commentaire laissé par le médecin : </strong>{cons.commentaire}</p>
                                </>
                            }
                        </div>
                    )
                })}
            </Form.Group>
            <Form.Group controlId="Operations">
                {activeMedicalRecord?.operations.length != 0  && <Form.Label>Operations</Form.Label>}
                {activeMedicalRecord?.operations.map((op,index)=>{
                    return (
                        <div className="m-auto w-75 d-flex flex-column justify-content-center">
                            <h6>Operation {index+1}</h6>
                            <p><strong>numéro de la salle : </strong>{op.salle}</p>
                            <p><strong>Type de l'opération : </strong>{op.Type}</p>
                        </div>
                    )
                })}
            </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => {}}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  )
}
