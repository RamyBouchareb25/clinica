
import 'bootstrap/dist/css/bootstrap.min.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { XCircleFill } from 'react-bootstrap-icons';
import {event} from '../../models/event';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
export default function Calendar() {


  const handleDateClick = (arg: any) => { // bind with an arrow function
    setShowDetails(true);
  }
  const [passed, setPassed] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [events, setEvents] = useState<event[]>([
    { title: 'event 1', date: '2024-01-08' },
    { title: 'event 2', date: '2023-10-10' },
  ]);
  const handleCloseDetails = () => setShowDetails(false);
  return (
    <div className='calendar-container'>
        <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    droppable={true}
                    editable={true}
                    selectable={true}
                    initialView='dayGridMonth'
                   eventClick={handleDateClick}
                    events={events}
                    height={550}
                  />
                  
          <Modal show={showDetails} onHide={handleCloseDetails} centered animation={true}>
            <Modal.Header closeButton>
              <Modal.Title>Rendez vous</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p><strong>Patient :</strong> {"patientName"}</p>
              <p><strong>Doctor :</strong> {"doctorName"}</p>
              <p><strong>Date :</strong> {"date"}</p>
              <p><strong>Heure :</strong> {"hour"}</p>
              <p><strong>Passed or not :</strong> <span style={{ color: passed ? 'green' : 'red' }}>{passed ? 'Yes' : 'No'}</span></p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-secondary" onClick={handleCloseDetails}>
                <XCircleFill className="mr-2" />
                Close
              </Button>
            </Modal.Footer>
          </Modal>
    </div>
  )
}
