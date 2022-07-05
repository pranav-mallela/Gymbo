import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

export default function Profile()
{
    const [canEdit,setCanEdit] = React.useState(false);
    function handleClick(e)
    {
        const {id} = e.target;
        const editPermission = id == "edit-button" ? true : false;
        setCanEdit(editPermission);
    }
    console.log(canEdit);
    return (
        <div className="profile-container">
            <div className="profile-top container">
                <Form.Control size="lg" id="profile-name" placeholder="Name" disabled={!canEdit}></Form.Control>
                <div>
                    <Button
                        id="edit-button"
                        variant="primary"
                        className="profile-buttons"
                        onClick={handleClick}
                        >Edit <span className="material-symbols-outlined">
                        edit</span>
                    </Button> 
                    <Button 
                        variant="danger" 
                        className="profile-buttons">Delete 
                        <span className="material-symbols-outlined">
                        delete</span>
                    </Button>
                </div>
            </div>
            <div className="profile-info-container container">
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Control type="text" placeholder="Phone" disabled={!canEdit} />
                        <br />
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Control type="text" placeholder="Start Date" disabled={!canEdit} />
                        <br />
                        <Form.Control type="text" placeholder="End Date" disabled={!canEdit} />
                        <br />
                    </Col>
                </Row>
            </div>
            <Button
                id="save-button"
                variant="success"
                className="profile-save center"
                onClick={handleClick}
                >Save Profile
            </Button>
        </div>
    )
}