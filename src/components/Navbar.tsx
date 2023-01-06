import React from "react"
import {Button, Nav, Navbar as BootstrapNavbar} from "react-bootstrap"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Container from "react-bootstrap/Container"
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars"

export default function Navbar({
                                   setDrawerVisibleFunc,
                                   badgeText = ""
                               }: { setDrawerVisibleFunc: CallableFunction, badgeText?: string }) {

    return (
        <BootstrapNavbar className="navbar ml-auto p-2" bg="dark" expand="lg">
            <Container fluid={true}>
                <Nav className="container-fluid justify-content-start">
                    <Nav.Item>
                        <Button className="bg-transparent border-0 shadow-none"
                                onClick={() => setDrawerVisibleFunc((v: boolean) => !v)}>
                            <FontAwesomeIcon icon={faBars}/>
                            {badgeText &&
                            <sup className="bg-light ps-1 pe-1 rounded-1 text-dark">
                                {badgeText}
                            </sup>
                            }
                        </Button>
                    </Nav.Item>
                </Nav>
            </Container>
        </BootstrapNavbar>
    )
}