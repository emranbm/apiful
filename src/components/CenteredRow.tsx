import Row, {RowProps} from "react-bootstrap/Row"
import Col, {ColProps} from "react-bootstrap/Col"
import React from "react";
import {BsPrefixProps, BsPrefixRefForwardingComponent, ReplaceProps} from "react-bootstrap/helpers";

export default function ({children, className}: {children: React.ReactNode, className?: string}) {
    return (
        <Row className={className ?? ""} >
            <Col className="d-flex justify-content-center">
                {children}
            </Col>
        </Row>
    )
}
