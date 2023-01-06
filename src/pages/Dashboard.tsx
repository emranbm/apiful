import {Container, Row} from "react-bootstrap"

export default function () {

    return (
        <Container fluid={true} className="ps-0">
            <Row className="mb-5"/>
            <h1 className="text-center">Welcome to <i>APIful</i></h1>
            <h3 className="text-center">An out-of-the-box dashboard for APIs!</h3>
        </Container>
    )
}