import { Patient } from "../../models/Patients";
import { Tab } from "react-bootstrap";
import "../scss/tableau.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function Tableau({
  editingIndexRow,
  editingIndexColumn,
  setEditingPatient,
  patients,
  setPatients,
  setEditingIndexRow,
  setEditingIndexColumn,
}: {
  editingIndexRow: number;
  editingIndexColumn: number;
  setEditingIndexRow: React.Dispatch<React.SetStateAction<number>>;
  setEditingIndexColumn: React.Dispatch<React.SetStateAction<number>>;
  setEditingPatient: React.Dispatch<React.SetStateAction<Patient[]>>;
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}) {
  const handleCellClick = (rowIndex: number, colIndex: number) => {
    setEditingIndexRow(rowIndex);
    setEditingIndexColumn(colIndex);
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setEditingIndexRow(-1);
      setEditingIndexColumn(-1);
    }
  };

  const handleInputChange = (
    rowIndex: number,
    value: string | number | Date,
    key: string
  ) => {
    setEditingPatient((prev) => [...prev, patients[rowIndex]]);
    const newPatients = [...patients];
    newPatients[rowIndex][key] = value;
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
              {patients.map((patient, rowIndex) => (
                <tr key={rowIndex} onKeyDown={handleKeyDown}>
                  {Object.keys(patient).map((key, colIndex) => {
                    if (key === "id" || key === "age") {
                      return null;
                    }
                    console.log(key)
                    return (
                      <td
                        key={colIndex}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                      >
                        {editingIndexRow === rowIndex &&
                        editingIndexColumn === colIndex ?
                        key === "sexe" ?
                        (
                            <select
                                value={patient[key].toString()}
                                onChange={(e) =>
                                handleInputChange(rowIndex, e.target.value, key)
                                }
                            >
                                <option value="Homme">Homme</option>
                                <option value="Femme">Femme</option>
                            </select>
                        )
                        :
                        key === "dateNaissance" ?
                        (
                            <DatePicker
                                selected={new Date(patient[key].toString())}
                                onChange={(e) =>
                                handleInputChange(rowIndex, e!, key)
                                }
                            />
                        )
                        :
                        (
                          <input
                            type={key === "numTel" ? "number" : key === "email" ? "email" : "text"}
                            value={patient[key].toString()} // Convert Date to string
                            onChange={(e) =>
                              handleInputChange(rowIndex, e.target.value, key)
                            } // Pass rowIndex as a number
                          />
                        ) : key === "dateNaissance" ? (
                          patient[key].toLocaleDateString()
                        ) : key === "numTel" ? (
                          "0" + patient[key].toString()
                        ) : (
                          patient[key].toLocaleString()
                        ) // Convert Date to string
                        }
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
}
