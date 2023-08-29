import React, { useState } from 'react';
import { Button, Form, Stack, Row, Col } from 'react-bootstrap';

function Filter({ filterItems }) {
    const [criteria, setCriteria] = useState('name');
    const [query, setQuery] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);

    const handleFilterChange = (newQuery) => {
        setQuery(newQuery);

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
            filterItems(criteria, newQuery);
        }, 200);

        setTimeoutId(newTimeoutId);
    };

    return (
        <Row>
            <Col lg={{ span: 5, offset: 7 }} md={12}>
                <Stack direction="horizontal" className="w-100 mt-4">
                    <Form.Select
                        value={criteria}
                        onChange={e => {
                            setCriteria(e.target.value)
                            if (query) {
                                filterItems(e.target.value, query)
                            }
                        }}
                        className="flex-grow-1"
                    >
                        <option value="name">Name</option>
                        <option value="category">Category</option>
                        <option value="description">Description</option>
                    </Form.Select>

                    <Form.Control
                        type="text"
                        placeholder="Search items..."
                        value={query}
                        onChange={(e) => handleFilterChange(e.target.value)}
                        className="flex-grow-1 mx-2"
                    />

                    <Button variant="secondary" onClick={() => {
                        setQuery('');
                        if (timeoutId) {
                            clearTimeout(timeoutId);
                        }
                        filterItems(criteria, '');
                    }}>Reset</Button>
                </Stack>
            </Col>
        </Row>

    );
}

export default Filter;
