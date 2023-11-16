import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/**
 * Editing Modal for Activities
 * 
 * */
function ActivityEdit({item, show, setShow}) {
    const handleClose = () => setShow(false);
    //state for modal values
    const handleSubmit = (event) => {
        /**
         * API post requests
         * use event.target[0] to index through the fields
         */
        console.log(event.target[0].value);
        console.log(event.target[1].value);
        let rooms = event.target[2].value.split(",");
        rooms.forEach((element) => {
            console.log("Room with id".concat(element));
        });
        console.log(event.target[3].value);
        console.log(event.target[4].value);
        handleClose() //needs to be before setStudentData
    }
  
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{"Edit Activity"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group
                    className="mb-3"
                    >
                    <Form.Label>Activity Name</Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={item.name} 
                        autoFocus
                    />
                    </Form.Group> 

                    <Form.Group
                    className="mb-3"
                    controlId="activityForm.ControlDuration"
                    >
                    <Form.Label>Duration (hours)</Form.Label>
                    <Form.Control
                        type="number"
                        defaultValue={item.duration} 
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="activityForm.ControlRoomIDs"
                    >
                    <Form.Label>(optional) Possible Rooms (comma seperated)</Form.Label>
                    <Form.Control
                        type="text"
                        disabled
                        placeholder={'Disabled'}
                        defaultValue={''/*item.room_ids.join(",")*/}
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="activityForm.ControlType"
                    >
                    <Form.Label>Type of Activity</Form.Label>
                    <Form.Check type="checkbox" label="Filler" defaultChecked={item.type === "filler"}/>
                    </Form.Group>

                    <Form.Group
                    className="mb-3"
                    controlId="activityForm.ControlOccurences"
                    >
                    <Form.Label>Number of Occurences</Form.Label>
                    <Form.Control
                        type="number"
                        defaultValue={item.num_occurences} 
                    />
                    </Form.Group>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    );
  }

export default ActivityEdit;
