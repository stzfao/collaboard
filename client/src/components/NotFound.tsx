import * as React from 'react';
import { Container } from 'react-bootstrap';
import dancing_gat from '../assets/dancing_gatto.gif'

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = (props) => {
    return (
        <Container className='NotFound'>
            <h1 className='Landing-text' style={{color: '#00a2ed'}}>
                :(
            </h1>
            <h3>
                You ran into an error while trying to access a room that does not exist, or you did not add a username while accessing it. 
            </h3>
            <h4>
                Please head over to 'Get Started' and try again. 
            </h4>
            <div>
                <i>Don't worry, your PC will not restart. Meanwhile, enjoy this dancing cat.</i>
                
            </div>
            <div>
            <b>0% complete</b>
            </div>
            <div>
                <img src={dancing_gat} />
            </div>
        </Container>
    );
};

export default App;
