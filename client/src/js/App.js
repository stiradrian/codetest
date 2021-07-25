import React, { useState, useEffect } from 'react';
import '../css/App.css';
import '../css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';

function App() {
    const [services, setServices] = useState([]);
    const [newService, setNewService] = useState({});
    const [editedService, setEditedService] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        fetchAllServices();
        //setInterval(() => fetchAllServices(), 10000);
    }, []);

    const fetchAllServices = () => {
        fetch('http://localhost:8080/service')
            .then(response => response.json())
            .then(serviceList => setServices(serviceList));
    }

    const onAddNew = () => {
        setModalShow(true);
        setValidated(false);
    }

    const onSave = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);
        } else {
            if (editedService.name) {
                saveService(editedService);
            } else {
                saveService(newService);
            }

            setModalShow(false);
            setNewService({});
            setEditedService({});
        }
    }

    const saveService = (newService) => {
        fetch('http://localhost:8080/service', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newService),
        })
        .then(response => response.json())
        .then(service =>  setServices(services.filter(s => s.name !== newService.name).concat([service])));
    }

    const onEdit = (e) => {
        const service = services.find(s => s.name === e.target.getAttribute('servicename'));
        setEditedService(service);
        setModalShow(true);
        setValidated(false);
    }

    const onDelete = (e) => {
        const serviceName = e.target.getAttribute('servicename');
        fetch('http://localhost:8080/service/' + serviceName, {
            method: 'DELETE'
        }).then(response => setServices(services.filter(s => s.name !== serviceName)));
    }

    const onHideModal = () => {
        setModalShow(false);
    }

    const onSetServiceAttribute = (e) => {
        if (editedService.name) {
            setEditedService({ ...editedService, [e.target.name]: e.target.value });
        } else {
            setNewService({ ...newService, [e.target.name]: e.target.value });
        }
    }

    return (
        <div id="mainDiv">
            <div>
                <h2>Services</h2>
            </div>
            <div id="buttonDiv" className="btn-group" application="group" aria-label="Basic example">
                <button type="button" className="btn btn-primary btn-sm" onClick={onAddNew}>Add New</button>
            </div>
            <div>
                <table id="servicesTable" className="table">
                    <thead className="table-primary">
                        <tr>
                            <th>Name</th>
                            <th>URL</th>
                            <th>Create Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <TableRows services={services} onDelete={onDelete} onEdit={onEdit}/>
                </table>
            </div>
            <div>
                <AddNewServiceModal
                    show={modalShow}
                    onHide={onHideModal}
                    onSave={onSave}
                    validated={validated}
                    onSetServiceAttribute={onSetServiceAttribute}
                    service={editedService}
                />
            </div>
        </div>
    );
}

const TableRows = ({ services, onDelete, onEdit }) => {
    const rows = services.map(s =>
        <tr key={s.name}>
            <td>{s.name}</td>
            <td>{s.url}</td>
            <td>{s.date}</td>
            <td>{s.status}</td>
            <td><span className="actionButton" servicename={s.name} onClick={onEdit}>Edit</span> | <span className="actionButton" servicename={s.name} onClick={onDelete}>Delete</span></td>
        </tr>
    );

    return <tbody className="thead-light">
        {rows}
    </tbody>;
}

function AddNewServiceModal(props) {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add new service
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={props.validated} onSubmit={props.onSave}>
                    <Form.Group>
                        <Form.Label>Service Name</Form.Label>
                        <Form.Control required type="text" name="name" readOnly={props.service.name} onChange={props.onSetServiceAttribute} value={props.service.name}/>
                        <Form.Control.Feedback type="invalid">Please choose a service name.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Service URL</Form.Label>
                        <Form.Control required type="text" name="url" onChange={props.onSetServiceAttribute} value={props.service.url}/>
                        <Form.Control.Feedback type="invalid">Please choose a service URL.</Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit">Save</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default App;