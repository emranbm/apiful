import Offcanvas from "react-bootstrap/Offcanvas"
import React, {useEffect, useState} from "react"
import Container from "react-bootstrap/Container"
import CenteredRow from "./CenteredRow"
import generalUtils from "../utils/GeneralUtils"
import requestUtils from "../utils/RequestUtils"
import loginUtils from "../utils/LoginUtils"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons"
import LoginContext, {LoginContextValue} from "./LoginContext"
import githubIcon from "../static-media/github-logo-32.png"
import defaultProfilePic from "../static-media/default-profile-pic.png"
import Row from "react-bootstrap/Row"

export default function ({visible: visibleProp, onHide = () => undefined}: { visible: boolean; onHide: Function }) {
    const [visible, setVisible] = useState(visibleProp)
    const [isLoggedIn, setIsLoggedIn] = useState(loginUtils.isLoggedIn())
    const [user, setUser] = useState({first_name: "", last_name: ""})

    function logout(loginContext: LoginContextValue) {
        loginUtils.logout()
        loginContext.setIsLoggedIn(false)
        setIsLoggedIn(false)
    }

    useEffect(() => {
        setVisible(visibleProp)
    }, [visibleProp])

    generalUtils.useEffectAsync(async () => {
        if (!isLoggedIn)
            return
        const resp = await requestUtils.get("TODO", () => setIsLoggedIn(false))
        if (resp.ok)
            setUser(await resp.json())
    })


    return (
        <LoginContext.Consumer>
            {(loginContext: LoginContextValue) =>
                <Offcanvas show={visible} onHide={onHide}
                           onShow={() => setIsLoggedIn(loginUtils.isLoggedIn())}
                           placement="start">
                    <Offcanvas.Header closeButton={true}>
                        <Offcanvas.Title><h4>APIful</h4></Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Container className="g-2">
                            {isLoggedIn ? <>
                                    <CenteredRow>
                                        <a href="#">
                                            <img style={{maxHeight: "100px"}}
                                                 alt="Profile picture"
                                                 className="rounded-circle"
                                                 src={defaultProfilePic}/>
                                        </a>
                                    </CenteredRow>
                                    <CenteredRow className="mt-3 mb-4">
                                        <h4>{user.first_name} {user.last_name}</h4>
                                    </CenteredRow>
                                    <Row className="mb-2">
                                        <a href="#"
                                           className="btn btn-outline-primary w-100">
                                            SampleModel1
                                        </a>
                                    </Row>
                                    <Row className="mb-2">
                                        <a href="#"
                                           className="btn btn-outline-primary w-100">
                                            SampleModel2
                                        </a>
                                    </Row>
                                    <CenteredRow className="mt-4">
                                        <a href="/" className="btn btn-outline-secondary"
                                           onClick={() => logout(loginContext)}>
                                            <FontAwesomeIcon icon={faSignOutAlt}/> Logout
                                        </a>
                                    </CenteredRow>
                                </>
                                :
                                <CenteredRow className="mt-4">
                                    <a href="#" className="btn btn-outline-primary">Login</a>
                                </CenteredRow>
                            }
                        </Container>
                        <Container style={{position: "absolute", bottom: 0}} className="pb-2">
                            <CenteredRow>
                                <abbr title="GitHub repo">
                                    <a href="https://github.com/emran/apiful" target="_blank"
                                       className="btn"><img alt="GitHub icon" src={githubIcon}/></a>
                                </abbr>
                            </CenteredRow>
                        </Container>
                    </Offcanvas.Body>
                </Offcanvas>
            }
        </LoginContext.Consumer>
    )
}