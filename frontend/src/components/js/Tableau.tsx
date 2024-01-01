import { Patient } from '../../models/Patients'
import { Tab } from 'react-bootstrap';
import '../scss/tableau.scss'
export default function Tableau(
    {editingIndex, setEditingIndex,setEditingPatient,patients,setPatients} : 
    {editingIndex: number, setEditingIndex: React.Dispatch<React.SetStateAction<number>>,setEditingPatient: React.Dispatch<React.SetStateAction<Patient[]>>,patients: Patient[],setPatients: React.Dispatch<React.SetStateAction<Patient[]>>}
    )   
    {

    const handleRowClick = (index: number) => {
        setEditingIndex(index);
      };
      const handleKeyDown = (index:number ,event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            setEditingIndex(-1);
        }

      };
      
    

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        setEditingPatient((prev) => [...prev, patients[index]]);
        console.log(patients)
        const newPatients = [...patients];
        newPatients[index].nom = event.target.value;
        setPatients(newPatients);
      };

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
    <Tab.Content>
    <Tab.Pane eventKey="first">
    <table className="table table-striped custom-table">
        <thead> 
            <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Date de naissance</th>
                <th>Sexe</th>
                <th>Adresse</th>
                <th>Numéro de téléphone</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            {patients.map((patient, index) => (
                <tr onClick={() => handleRowClick(index)}>
                    <td>{editingIndex === index ? <input name="nom" value={patient.nom} onChange={event => handleInputChange(index, event)} onKeyDown={(event) => handleKeyDown(index, event)}/> : patient.nom}</td>
                    <td>{patient.prenom}</td>
                    <td>{patient.dateNaissance.toLocaleDateString()}</td>
                    <td>{patient.sexe}</td>
                    <td>{patient.adresse}</td>
                    <td>+213 0{patient.numTel}</td>
                    <td>{patient.email}</td>
                </tr>
            ))}
        </tbody>
    </table>
    </Tab.Pane>
    </Tab.Content>
    </Tab.Container>
  )
}
