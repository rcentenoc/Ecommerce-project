import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

export default function SearchBox() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        navigate(query ? `/search/?query=${query}` : '/search');
    };
    return (
        <Form className="d-flex me-auto" onSubmit={submitHandler}>
            <InputGroup>
                <FormControl type="text" name="q" id="q"
                    placeholder="Search Products..."
                    aria-label="Search Products"
                    arial-describedby="button-search"
                    onChange={(e) => setQuery(e.target.value)}>
                </FormControl>
                <Button type="submit" id="button-search">
                    <i className="fas fa-search"></i>
                </Button>
            </InputGroup>
        </Form>
    )
}

