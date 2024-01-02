import { Patient } from "../../models/Patients";
import { Button, Form, Tab } from "react-bootstrap";
import { FaTimes } from 'react-icons/fa';
import "../scss/tableau.scss";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useRef } from "react";
import { Fab } from "@mui/material";
export default function Tableau({
  editingIndexRow,
  editingIndexColumn,
  setEditingPatient,
  patients,
  setPatients,
  setEditingIndexRow,
  setEditingIndexColumn,
  setShow
}: {
  editingIndexRow: number;
  editingIndexColumn: number;
  setEditingIndexRow: React.Dispatch<React.SetStateAction<number>>;
  setEditingIndexColumn: React.Dispatch<React.SetStateAction<number>>;
  setEditingPatient: React.Dispatch<React.SetStateAction<Patient[]>>;
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  setShow : (index : number) => void;
}) {


  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: React.MouseEvent) {
      if (containerRef.current && !(containerRef.current as HTMLElement).contains(event.target as Node)) {
        setEditingIndexRow(-1);
        setEditingIndexColumn(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside as unknown as EventListener);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside as unknown as EventListener);
    };
  }, [containerRef]);

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
  function handleDelete(index: number) {
    setShow(index);
  }
  const handleInputChange = (
    rowIndex: number,
    value: string | number | Date,
    key: string
  ) => {
    key === "dateNaissance" ? console.log(value) : null;
    setEditingPatient((prev) => [...prev, patients[rowIndex]]);
    const newPatients = [...patients];
    newPatients[rowIndex][key] = value;
    setPatients(newPatients);
  };
  
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Tab.Content>
        <Tab.Pane eventKey="first">
          <table ref={containerRef} className="table table-striped custom-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Date de naissance</th>
                <th>Sexe</th>
                <th>Adresse</th>
                <th>Numéro de téléphone</th>
                <th>Email</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, rowIndex) => (
                <tr className="table-row" key={rowIndex} onKeyDown={handleKeyDown}>
                  {Object.keys(patient).map((key, colIndex) => {
                    if (key === "id" || key === "age") {
                      return null;
                    }
                    return (
                      <td
                        key={colIndex}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                      >
                        {editingIndexRow === rowIndex &&
                        editingIndexColumn === colIndex ?
                        key === "sexe" ?
                        (
                          <Form.Control as="select" value={patient[key].toString()} onChange={(e) => handleInputChange(rowIndex, e.target.value, key)}>
                          <option value="Homme">Homme</option>
                          <option value="Femme">Femme</option>
                        </Form.Control>
                        )
                        :
                        key === "dateNaissance" ?
                        (
                          <Form.Control
                          type="date"
                          value={new Date(patient[key].toString()).toISOString().split('T')[0]}
                          onChange={(e) => handleInputChange(rowIndex, new Date(e.target.value), key)}
                        />
                        )
                        :
                        (
                          <Form.Control 
                          type={key === "numTel" ? "number" : key === "email" ? "email" : "text"}
                          value={patient[key].toString()}
                          onChange={(e) =>
                            handleInputChange(rowIndex, e.target.value, key)
                          } 
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
                  <td>
                    <Fab color="error" size="small" onClick={() => handleDelete(patient.id)} >
                      <FaTimes />
                    </Fab>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
}
