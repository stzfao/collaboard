import * as React from 'react';
import rough from 'roughjs';
import { Point } from 'roughjs/bin/geometry'
import { Tool, SocketData, SocketSequence, ServerToClientEvents, ClientToServerEvents } from '../../../models';
import { Form, Row, Col, Stack, Button, ButtonGroup } from 'react-bootstrap';
import { RoughCanvas } from 'roughjs/bin/canvas';
import { RoughGenerator } from 'roughjs/bin/generator';
import socketIO, { Socket, io } from 'socket.io-client';

interface IWhiteboardProps {
	canvasRef: React.MutableRefObject<any>;
	ctxRef: React.MutableRefObject<any>;
	tool: string;
	elements: Tool[];
	setElements: React.Dispatch<React.SetStateAction<Tool[]>>;
	roughness: number;
	brushSize: number;
	color: string;
	user: SocketData;
	socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}

const Whiteboard: React.FunctionComponent<IWhiteboardProps> = ({ socket, canvasRef, ctxRef, elements, setElements, tool, roughness, brushSize, color, user }) => {
	const [drawing, setDrawing] = React.useState(false);

	React.useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		let drawArea = document.getElementById('canvas');
		canvas.height = drawArea?.offsetHeight!;
		canvas.width = drawArea?.offsetWidth!;

		ctxRef.current = ctx;
	}, []);

	React.useLayoutEffect(() => {

			let roughCanvas: RoughCanvas = new RoughCanvas(canvasRef.current);
			let roughGenerator: RoughGenerator = new RoughGenerator();

			if (elements.length > 0) ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

			// white background, possible bug after 'Clear Canvas'
			roughCanvas.draw(roughGenerator.rectangle(0, 0, canvasRef.current.width, canvasRef.current.height, { roughness: 1, fill: 'white', fillStyle: 'solid', stroke: 'white' }));

			elements.forEach((element: Tool) => {
				if (element.type == 'pencil') {
					roughCanvas.linearPath(element.path!, { roughness: roughness, strokeWidth: element.strokeWidth, stroke: element.stroke });
				}
				else if (element.type == 'line') {
					roughCanvas.draw(roughGenerator.line(element.offsetX, element.offsetY, element.width!, element.height!, { roughness: roughness, strokeWidth: element.strokeWidth, stroke: element.stroke }));
				}
				else if (element.type == 'rect') {
					roughCanvas.draw(roughGenerator.rectangle(element.offsetX, element.offsetY, element.width!, element.height!, { roughness: roughness, fill: element.stroke, strokeWidth: element.strokeWidth }));
				}
			})
	}, [elements])

	// starts element's path vector to be rendered
	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		const { offsetX, offsetY } = e.nativeEvent;

		if (tool == 'pencil') {
			const point: Point = [offsetX, offsetY];
			setElements((prevElements: Tool[]) => [
				...prevElements,
				{
					type: "pencil",
					offsetX,
					offsetY,
					path: [point],
					stroke: color,
					strokeWidth: brushSize,
				},
			]);
		}
		else if (tool == 'line') {
			setElements((prevElements: Tool[]) => [
				...prevElements,
				{
					type: "line",
					offsetX,
					offsetY,
					width: offsetX,
					height: offsetY,
					stroke: color,
					strokeWidth: brushSize,
				},
			]);
		}
		else if (tool == 'rect') {
			setElements((prevElements: Tool[]) => [
				...prevElements,
				{
					type: 'rect',
					offsetX,
					offsetY,
					width: 0,
					height: 0,
					stroke: color,
					strokeWidth: brushSize,
				}
			]);
		}
		setDrawing(true);
	}

	// creates path vector by modifying last Tool's path
	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const { offsetX, offsetY } = e.nativeEvent;
		if (drawing) {
			//pencil by default, as static
			if (tool == "pencil") {
				const { path } = elements[elements.length - 1];
				const point: Point = [offsetX, offsetY];
				const newPath = [...path!, point];
				setElements((prevElements: Tool[]) =>
					prevElements.map((ele: Tool, idx: number) => {
						if (idx == elements.length - 1) {
							return {
								...ele,
								path: newPath
							};
						}
						else return ele;
					})
				);
			}
			else if (tool == 'line') {
				setElements((prevElements: Tool[]) =>
					prevElements.map((ele, idx) => {
						if (idx == elements.length - 1) {
							return {
								...ele,
								width: offsetX,
								height: offsetY,
							};
						} else return ele;
					})
				)
			}
			else if (tool == 'rect') {
				setElements((prevElements: Tool[]) =>
					prevElements.map((ele, idx) => {
						if (idx == elements.length - 1) {
							return {
								...ele,
								width: offsetX - ele.offsetX,
								height: offsetY - ele.offsetY,
							};
						} else return ele;
					})
				)
			}
		}
	};

	const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
		setDrawing(false);
	}

	return (
		<>
			<div
				className='Whiteboard'
				id='canvas'
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp} >
				<canvas ref={canvasRef} />
			</div>
		</>
	);
};

export default Whiteboard;
