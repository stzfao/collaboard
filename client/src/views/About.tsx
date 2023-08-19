import * as React from 'react';
import { Row, Col } from 'react-bootstrap';

interface IAboutProps {
}

const About: React.FunctionComponent<IAboutProps> = (props) => {
  return (
    <div className='About' id='about' >
        <div>
          <Row>
            <Col className='design-text'>
            Hello!
            </Col>
          </Row>
          <Row className='About-text'>
            <Col>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat eius rerum voluptatibus? Totam earum cum magnam dicta amet itaque quasi facere. Vitae reprehenderit tempore veritatis dignissimos animi, quod consequuntur ad?
            </Col>
            <Col>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat eius rerum voluptatibus? Totam earum cum magnam dicta amet itaque quasi facere. Vitae reprehenderit tempore veritatis dignissimos animi, quod consequuntur ad?
            </Col>
            <Col>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat eius rerum voluptatibus? Totam earum cum magnam dicta amet itaque quasi facere. Vitae reprehenderit tempore veritatis dignissimos animi, quod consequuntur ad?
            </Col>
            
          </Row>
        </div>
    </div>
  );
};

export default About;
