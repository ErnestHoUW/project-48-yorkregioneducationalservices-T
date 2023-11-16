'use client';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { process_comma_separated_text } from '../helpers/helpers';
import { useRouter } from 'next/navigation'
const URI = process.env.NEXT_PUBLIC_BACKEND_URI;

/**
 * Editing Modal for Activities
 * 
 * */
function ActivityCreate() {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        /**
         * API post request for adding new activity
         */
        const new_activity = {
            name: event.target[0].value,
            duration: event.target[1].value,
            type: event.target[3].checked ? "filler" : "common",
            num_occurences: event.target[4].value,
            room_ids: [] //process_comma_separated_text(event.target[2].value);
        }

        fetch(`${URI}/activities/createActivity/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_activity)
        })
        .then(res => {
            if (res.status === 200) {
                router.refresh();
                return res.json();
            } else {
                // Show error alert
            }
        }).catch(err => {
            console.log(err);
        });
        handleClose();
    }
  
    return (
        <>
            <Button onClick={() => setShow(true)} 
                    variant="primary">
                Add Activity
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{"Add new Activity"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group
                        className="mb-3"
                        >
                        <Form.Label>Activity Name</Form.Label>
                        <Form.Control
                            type="text"
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
                        />
                        </Form.Group>
                        
                        <Form.Group
                        className="mb-3"
                        controlId="activityForm.ControlRoomIDs"
                        >
                        <Form.Label>(Optional) Possible Rooms (comma seperated)</Form.Label>
                        <Form.Control
                            type="text"
                            disabled
                            placeholder={'Disabled'}
                        />
                        </Form.Group>

                        <Form.Group
                        className="mb-3"
                        controlId="activityForm.ControlType"
                        >
                        <Form.Label>Type of Activity</Form.Label>
                        <Form.Check type="checkbox" label="Filler"/>
                        </Form.Group>

                        <Form.Group
                        className="mb-3"
                        controlId="activityForm.ControlOccurences"
                        >
                        <Form.Label>Number of Occurences</Form.Label>
                        <Form.Control
                            type="number"
                        />
                        </Form.Group>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary">
                            Create New Activity
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </>
    );
  }

export default ActivityCreate;
