import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiURL from '../api';
import { EditItem } from './EditItem';
import { itemPriceFormatter } from '../utils/utils';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Collapse from 'react-bootstrap/Collapse';



export const Item = () => {
    const [item, setItem] = useState(null);
    const { id } = useParams()
    const navigate = useNavigate()

    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        fetchItem()
    }, [id, isEdit])

    const fetchItem = async () => {
        let response = await fetch(`${apiURL}/items/${id}`)
        let data = await response.json()
        setItem(data)
    }

    const deleteItem = async () => {
        try {
            let response = await fetch(`${apiURL}/items/${id}`, {
                method: "DELETE"
            })
            if (response.ok) {
                navigate(`/items`)
            }
        } catch (error) {
            console.log("Oh no an error! ", error)
        }
    }

    return (
        <Container className="py-4">
            {item && (
                <div>
                    <Card>
                        <Card.Header><h2>{item.name}</h2></Card.Header>
                        <Card.Body>
                            <Row className='align-items-center'>
                                <Col md={6} xs={12} className='border-right-responsive border-bottom-responsive'>
                                    <Image src={item.image} alt={`${item.name}`} fluid />
                                </Col>
                                <Col md={6} xs={12}>
                                    <Card.Text>{item.description}</Card.Text>
                                    <Card.Text>Price: {itemPriceFormatter.format(item.price)}</Card.Text>
                                    <Card.Text>Category: {item.category}</Card.Text>
                                    <Button
                                        variant="primary"
                                        onClick={() => setIsEdit(!isEdit)}
                                        aria-controls="edit-item-collapse"
                                        aria-expanded={isEdit}
                                    >
                                        {isEdit ? "Cancel Edit" : "Edit Item"}
                                    </Button>
                                    <Button variant="danger" onClick={() => deleteItem()} className="ml-2">Delete Item</Button>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Collapse in={isEdit}>
                            <div id="edit-item-collapse">
                                <Card.Footer>

                                    <EditItem setIsEdit={setIsEdit} item={item} id={id} />
                                </Card.Footer>
                            </div>
                        </Collapse>
                    </Card>
                </div>
            )}
        </Container>
    )
}
