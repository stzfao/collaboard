# CollaBoard — Collaborative Whiteboard 

##### This project is an assignment for [Dendrite](https://dendrite.ai/).
A collaborative whiteboard for multiple users to create and join rooms to use. This project is a web-based collaborative whiteboard where multiple users can draw on the same canvas in real-time from different locations. It is built using React-TypeScript, Node and Socket.io.

*※ Since this is for a frontend developer intern role, focus was put more towards the frontend code, including a clean UI and seamless UX.* :space_invader:

## Usage Demo

- `localhost/3000/`

    ![Landing Page](https://github.com/stzfao/collaboard/blob/main/dendrite/landing_page.png)
- `localhost/3000/room`

    ![Room Generation](https://github.com/stzfao/collaboard/blob/main/dendrite/room_generation.png)
- `localhost/3000/room/1cb-4c7-62a` with access, uses `Undo|Redo` and `Clear Canvas` option.

    ![Undo Redo Demo](https://github.com/stzfao/collaboard/blob/main/dendrite/undo_redo_demo.png)
     - Exported image, titled `<roomId>_<Date().toISOString()>_canvas.png`
     
    ![Exported Image](https://github.com/stzfao/collaboard/blob/main/dendrite/0bd-de0-e38_2023-08-20T09_43_49.058Z_canvas.png)
- `localhost/3000/room/1cb-4c7-62a` without access

    ![Page Not Found](https://github.com/stzfao/collaboard/blob/main/dendrite/page_not_found.png)
- `localhost/3000/#about`

    ![About](https://github.com/stzfao/collaboard/blob/main/dendrite/about.png)

    

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/dendrite-whiteboard.git
   
1. Navigate to the project directory:

    ```bash
    cd client

1. Install dependencies:

    ```bash
    npm i
1. Start the development server:

    ```bash
    npm start
1. Similarly, for the server: 
    ```bash
    cd server
    npm i
    npm start

Open your web browser and go to http://localhost:3000 to view the application.

## Features Implemented

- Different brush colors and sizes: Users can choose from a variety of brush colors and sizes to customize their drawing experience.
- Drawing tools: Choose from a brush tool, line tool or a rectangle to draw on the canvas with. The RoughJS library allows rough handdrawn text and shapes to give the whiteboard a more familiar feeling.
- Shareable whiteboard: Each whiteboard has a unique meeting ID that can be shared with others for collaborative drawing sessions.
- Responsive design: The application is designed to work seamlessly on both desktop and mobile devices.
- Real-time collaborative drawing: Multiple users can draw on the whiteboard simultaneously, and their changes will be reflected in real-time for all participants.
- Undo/Redo: Actions for the canvas to undo any mistakes made while drawing.
- Responsive Design: The app can be used on both desktop and mobile devices.

## Features not Implemented

- Collaborative drawing was a challenge with RoughJS, as I later figured out that every time the library draws on canvas it refreshes the page, creating a new socket connection. This was creating ~70 connections per stroke and proved to be difficult to solve in the given time frame. 
- PNG exports work, PDF is yet to be implemented.
- Secure authentication using Keycloak is yet to be implemented.


*Comments are added in the code wherever necessary to increase understandability.*  

###### Built with :blue_heart:
[![Stack I was asked to use](https://skills.thijs.gg/icons?i=react,ts,nodejs&theme=light)](https://skills.thijs.gg)
