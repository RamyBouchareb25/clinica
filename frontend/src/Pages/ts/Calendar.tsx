import "bootstrap/dist/css/bootstrap.min.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { XCircleFill } from "react-bootstrap-icons";
import { event } from "../../models/event";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { Patient } from "../../models/Patient";
import { Doctor } from "../../models/Doctor";
import { RendezVous, RendezVousJson, specialiteToService } from "../../models/RendezVous";
import { EventClickArg } from "@fullcalendar/common";
export default function Calendar() {
  const handleDateClick = (arg: EventClickArg) => {
    console.log(arg.event.id);
    setSelectedRendezVous(
      rendezVous.find(
        (rdv: RendezVous) => rdv.ID_RDV.toString() === arg.event.id
      )
    );
    setShowDetails(true);
  };
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [rendezVous, setRendezVous] = useState<RendezVous[]>([]);
  const [selectedRendezVous, setSelectedRendezVous] = useState<RendezVous>();
  const [events, setEvents] = useState<event[]>([]);

  const getEvents = async () => {
    const response = await axios.get("http://localhost:8000/api/RendezVous");
    const promises = response.data.map(async (element: RendezVousJson) => {
      const pat = (
        await axios.get(
          "http://localhost:8000/api/patients/" + element.Patient + "/"
        )
      ).data;
      const patient: Patient = Patient.fromJson(pat);
      const doc = (
        await axios.get(
          "http://localhost:8000/api/Doctors/" + element.Medecin + "/"
        )
      ).data;
      const doctor: Doctor = Doctor.fromJson(doc);
      const date = new Date(element.Date + "T" + element.Heure);
      return new RendezVous(
        element.ID_RDV,
        date,
        patient,
        doctor,
        element.passed,
        element.Titre,
        Doctor.numberToSpecialite(element.service)
      );
    });
    const rdvList = await Promise.all(promises);
    setRendezVous(rdvList);
    const evs = rdvList.map((rdv: RendezVous) => {
      return {
        title: rdv.titre,
        date: rdv.date.toISOString().split("T")[0],
        id: rdv.ID_RDV.toString(),
      };
    });
    setEvents(evs);
    // console.log(evs)
  };

  useEffect(() => {
    getEvents();
  }, []);
  const handleCloseDetails = () => setShowDetails(false);
  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        droppable={true}
        editable={true}
        selectable={true}
        // customButtons={
        //   {
        //     myCustomButton: {
        //       text: 'custom!',
        //       click: function() {
        //         alert('clicked the custom button!');
        //       }
        //     }
        //   }
        // }
        initialView="dayGridMonth"
        eventClick={handleDateClick}
        events={events}
        height={550}
      />

      <Modal
        show={showDetails}
        onHide={handleCloseDetails}
        centered
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Rendez vous</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <p>
              <strong>Titre :</strong> {selectedRendezVous?.titre}
            </p>
            <p>
              <strong>Service :</strong> {selectedRendezVous?.service != null ? specialiteToService(selectedRendezVous?.service): selectedRendezVous?.service}
            </p>
            <p>
              <strong>Patient :</strong>{" "}
              {selectedRendezVous?.patient.nom +
                " " +
                selectedRendezVous?.patient.prenom}
            </p>
            <p>
              <strong>Doctor :</strong>{" "}
              {selectedRendezVous?.doctor.Nom +
                " " +
                selectedRendezVous?.doctor.Prenom}
            </p>
            <p>
              <strong>Date :</strong>{" "}
              {selectedRendezVous?.date.toISOString().split("T")[0]}
            </p>
            <p>
              <strong>Heure :</strong>{" "}
              {
                selectedRendezVous?.date
                  .toISOString()
                  .split("T")[1]
                  .split(".")[0]
              }
            </p>
            <p>
              <strong>Passed or not :</strong>{" "}
              <Form.Check
                className="custom-switch"
                type="switch"
                id="custom-switch"
                label="Passed or not"
                checked={selectedRendezVous?.passed}
              // onChange={handleToggle}
              />
            </p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleCloseDetails}>
            <XCircleFill className="mr-2" />
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
