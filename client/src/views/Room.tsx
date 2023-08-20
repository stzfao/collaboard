import * as React from 'react';
import { Whiteboard, NotFound } from '../components';
import { Tool, SocketData, ServerToClientEvents, ClientToServerEvents } from '../../../models';
import { Form, Row, Col, Stack, Button, ButtonGroup, InputGroup, SplitButton, Dropdown } from 'react-bootstrap';
import socketIO, { Socket, io } from 'socket.io-client';

interface IRoomProps {
  user: SocketData;
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  elements: Tool[];
	setElements: React.Dispatch<React.SetStateAction<Tool[]>>;
}


const Room: React.FunctionComponent<IRoomProps> = ({ user, socket, elements, setElements }) => {

  const canvasRef = React.useRef<any>(null);
  const ctxRef = React.useRef<any>(null);

  // const [access, setAccess] = React.useState(false);
  const [tool, setTool] = React.useState('pencil');
  const [color, setColor] = React.useState("#bd84db");
  const [roughness, setRoughness] = React.useState(1);
  const [brushSize, setBrushSize] = React.useState(1);
  const [history, setHistory] = React.useState<any>([]);

  const meetingId: string = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setElements([]);
  }

  const handleToolChange = (e: any) => {
    if (e.target.type === 'color') setColor(e.target.value);
    else setTool((e.target as HTMLInputElement).value)
  }

  const saveImage = (e: any) => {
    let link = e.currentTarget;
    const ctx = ctxRef.current;
    let roomName = 'idkkk';
    link.setAttribute('download', roomName + '_' + new Date().toISOString() + '_canvas.png');
    let image = canvasRef.current.toDataURL('image/png');
    link.setAttribute('href', image);
  }

  const handleUndo = () => {
    setHistory((prevHistory: Tool[]) => [...prevHistory, elements[elements.length - 1]]);
    setElements((prevElements: Tool[]) => prevElements.slice(0, prevElements.length - 1));
  }

  const handleRedo = () => {
    setElements((prevElements: Tool[]) => [...prevElements, history[history.length - 1]]);
    setHistory((prevHistory: Tool[]) => prevHistory.slice(0, prevHistory.length - 1));
  }

  if (user && user.member == true) {
    // setAccess(false);
    return (
      <div className='Room'>
        <h1>
          Whiteboard Room!!
        </h1>
        <Row className='Whiteboard-controls' direction='horizontal' onChange={handleToolChange} >
          <Col sm={4}>
            <Form className='Form'>
              <Form.Check // prettier-ignore
                inline
                type='radio'
                label='Pencil'
                id='pencil-tool'
                value='pencil'
                name='tool'
                checked={tool === 'pencil'}
                onChange={handleToolChange} 
              />
              <Form.Check // prettier-ignore
                inline
                type='radio'
                label='Line'
                id='line-tool'
                value='line'
                name='tool'
                checked={tool === 'line'}
                onChange={handleToolChange} 
              />
              <Form.Select aria-label="Select shapes" id='shape-tool' title="Select Shape" >
                <option value='rect'>Rectangle</option>
                <option value="circle">Circle</option>
              </Form.Select>
              <div className='m-2'>
                <Form.Control
                  type='color'
                  id='color-picker-tool'
                  value={color}
                  onChange={handleToolChange} 
                />
              </div>
            </Form>
          </Col>
          <Col sm={2} className='outline-slider'>
            <Form.Label>Roughness</Form.Label>
            <Form.Range onChange={(e) => { setRoughness(Number(e.target.value) / 40) }} />
          </Col>
          <Col sm={3} className='outline-slider'>
            <Form.Label>Line Width</Form.Label>
            <Form.Range onChange={(e) => { setBrushSize(Number(e.target.value) / 25) }} />
          </Col>
          <Col className='outline-check' sm={2}>
            <Stack gap={3} direction='horizontal'>
              <div>
                <ButtonGroup aria-label="UndoRedoActions">
                  {/* disabled Undo/Redo, yet to write logic to sync across room */}
                  <Button variant="primary" disabled onClick={handleUndo}>Undo</Button>
                  {/* <Button variant="primary" disabled={elements.length === 0} onClick={handleUndo}>Undo</Button> */}
                  <Button variant="primary" disabled onClick={handleRedo}>Redo</Button>
                  {/* <Button variant="primary" disabled={history.length < 1} onClick={handleRedo}>Redo</Button> */}
                </ButtonGroup>
              </div>
              <div>
                <Button variant='outline-danger' onClick={handleClearCanvas}>Clear</Button>
              </div>
            </Stack>
          </Col>
          <Col className='outline-check'>
            <SplitButton
              variant="outline-secondary"
              title="Export"
              id="export-button"
              href='yehrefhai'
              onClick={saveImage}>
              <Dropdown.Item id='png' >.PNG</Dropdown.Item>
              <Dropdown.Item id='pdf' disabled>.PDF</Dropdown.Item>
            </SplitButton>
          </Col>
        </Row>
        <Row>
          <Whiteboard
            socket={socket}
            canvasRef={canvasRef}
            ctxRef={ctxRef}
            elements={elements}
            setElements={setElements}
            tool={tool}
            roughness={roughness}
            brushSize={brushSize}
            color={color}
            user={user} />
        </Row>
      </div>
    );
  }

  return (
    <>
      <NotFound />
    </>
  );
};

export default Room;
