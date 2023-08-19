import * as React from 'react';
import { Badge } from 'react-bootstrap';
import customer from '../assets/customer_profile.png';
import { Row, Col, Stack } from 'react-bootstrap';
import { PenTool } from 'react-feather';
import {About} from '../views';

interface ILandingProps {
}

const Landing: React.FunctionComponent<ILandingProps> = (props) => {
    return (
        <>
        <div className="Landing">
            <Row className='align-items-center'>
                <Col >
                    <h1 className='Landing-text'>
                        Get with your team to <i className='design-text'> Design <PenTool />,</i> <b className='build-text'>Build</b> and <i className='brainstorm-text '>Brainstorm</i> together, online.
                    </h1>
                </Col>
                <Col>
                    <a href="https://dendrite.ai/">
                        <img
                            alt="Screencap of a brainstorming session for a hackathon my friends and I took part in :)"
                            src={customer}
                            className='customer-image'
                        />{' '}
                    </a>
                </Col>
            </Row>
        </div>
        <About/>
        </>
    );
};

export default Landing;
