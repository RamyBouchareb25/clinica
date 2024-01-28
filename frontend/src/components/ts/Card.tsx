import { Card, Row, Col } from "react-bootstrap";
import { RandomAvatar } from "react-random-avatars";
import "../scss/CardItem.scss"

export default function CardItem({ CardTitle, onClick } : { CardTitle: string, onClick: React.MouseEventHandler<HTMLDivElement> }) {


  return (
    <div onClick={onClick} className="card-container my-3">  
        <Card className="my-card" style={{ width: '100%', border: "2px solid black" }}>
            <Row className="no-gutters">
                <Col md={2}>
                    <div className="my-2 mx-3">
                        <RandomAvatar name={CardTitle} size={100} />
                    </div>
                </Col>
                <Col md={8}>
                    <Card.Body>
                        <Card.Title>{CardTitle}</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    </div>
  )
}