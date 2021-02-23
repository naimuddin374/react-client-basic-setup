import React from 'react'
import {Container} from 'reactstrap';

const PageNotFound = () => {
    return (
        <Container className='menu-margin'
                   style={{
                       display: 'flex',
                       justifyContent: 'center',
                       alignContent: 'center',
                       padding: '250px 0'
                   }}
        >
            <h1 className='h1'>
                404 Page Not Found!
            </h1>
        </Container>
    )
}
export default PageNotFound;
