import { Form, Tab } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import "../scss/tableau.scss";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useRef } from "react";
import { Fab } from "@mui/material";
import { Person } from "../../models/Person";

export default function Tableau({
  editingIndexRow,
  editingIndexColumn,
  setEditingPerson,
  persons,
  setPerson,
  setEditingIndexRow,
  setEditingIndexColumn,
  setShow,
}: {
  editingIndexRow: number;
  editingIndexColumn: number;
  setEditingIndexRow: React.Dispatch<React.SetStateAction<number>>;
  setEditingIndexColumn: React.Dispatch<React.SetStateAction<number>>;
  setEditingPerson: React.Dispatch<React.SetStateAction<Person[]>>;
  persons: Person[];
  setPerson: React.Dispatch<React.SetStateAction<Person[]>>;
  setShow: (index: number) => void;
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: React.MouseEvent) {
      if (
        containerRef.current &&
        !(containerRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setEditingIndexRow(-1);
        setEditingIndexColumn(-1);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside as unknown as EventListener
    );
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside as unknown as EventListener
      );
    };
  }, [containerRef, setEditingIndexColumn, setEditingIndexRow]);

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
    setEditingPerson((prev) => [...prev, persons[rowIndex]]);
    const newPatients = [...persons];
    newPatients[rowIndex][key] = value;
    setPerson(newPatients);
  };

  const renderForm = (patient: Person, rowIndex: number, key: string) => {
    switch (key) {
      case "sexe":
        return (
          <Form.Control
            as="select"
            value={patient[key].toString()}
            onChange={(e) => handleInputChange(rowIndex, e.target.value, key)}
          >
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
          </Form.Control>
        );
        case "specialite":
          return (
            <Form.Control
              as="select"
              value={patient[key].toString()}
              onChange={(e) => handleInputChange(rowIndex, e.target.value, key)}
            >
              <option value="Cardiologue">Cardiologue</option>
              <option value="Neurologue">Neurologue</option>
              <option value="Urologue">Urologue</option>
              <option value="Rhumatologue">Rhumatologue</option>
              <option value="ORL">ORL</option>
              <option value="Generaliste">Generaliste</option>
            </Form.Control>
          );
      case "DateNaissance":
      case "dateNaissance":
        return (
          <Form.Control
            type="date"
            value={
              new Date(patient[key].toString()).toISOString().split("T")[0]
            }
            onChange={(e) =>
              handleInputChange(rowIndex, new Date(e.target.value), key)
            }
          />
        );
      default:
        return (
          <Form.Control
            type={
              (key === ("numTel" || "num_tel")) ? "number" : key === "email" ? "email" : "text"
            }
            value={patient[key].toString()}
            onChange={(e) => handleInputChange(rowIndex, e.target.value, key)}
          />
        );
    }
  };

  const renderCell = (patient: Person, key: string) => {
    switch (key) {
      case "DateNaissance":
      case "dateNaissance":
        return (patient[key] as Date).toLocaleDateString();
      case "numTel" :
      case "num_tel":
        return "0" + patient[key].toString();
      default:
        return patient[key].toLocaleString();
    }
  };

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Tab.Content>
        <Tab.Pane eventKey="first">
          <table
            ref={containerRef}
            className="table table-striped custom-table"
          >
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Date de naissance</th>
                <th>Sexe</th>
                <th>Adresse</th>
                <th>Numéro de téléphone</th>
                <th>Email</th>
                {Object.prototype.hasOwnProperty.call(persons[0], "specialite") ? <th>Spécialité</th> : null}
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {persons.map((patient, rowIndex) => (
                <tr
                  className="table-row"
                  key={rowIndex}
                  onKeyDown={handleKeyDown}
                >
                  {Object.keys(patient).map((key, colIndex) => {
                    if (key === "id" || key === "age" || key === "ID_Medecin") {
                      return null;
                    }
                    
                    return (
                      <td
                        key={colIndex}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                      >
                        {editingIndexRow === rowIndex &&
                          editingIndexColumn === colIndex
                          ? renderForm(patient, rowIndex, key)
                          : renderCell(patient, key)}
                      </td>
                    );
                  })}
                  <td>
                    <Fab
                      color="error"
                      size="small"
                      onClick={() => handleDelete((patient.id as number) ?? (patient.ID_Medecin as number))}
                    >
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
