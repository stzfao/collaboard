import * as React from 'react';
import { Form } from 'react-bootstrap';
import { Container, Row, Col, InputGroup, Button, ButtonGroup, Stack } from 'react-bootstrap';
import { Copy } from 'react-feather';

interface IJoinRoomProps {
}

const JoinRoom: React.FunctionComponent<IJoinRoomProps> = (props) => {
  return (
    <div className='JoinRoom'>
      <h2>Join an existing Room</h2>
      <Form >
        <Stack gap={3}>
          <Form.Group controlId="validationCustomUsername">
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="validationRoomKey">
            <Form.Control
              placeholder='Enter room key'
              aria-label='Enter room key to join room'
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid room key.
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant='primary' type='submit' >
            Join Room
          </Button>
        </Stack>
      </Form>
    </div>
  );
};

export default JoinRoom;
