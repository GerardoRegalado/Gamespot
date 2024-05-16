//Pachage Imports
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

//Local Imports
import { DealCard } from '../Common/DealCard/DealCard'
import { DealInterface } from '../../interfaces/dealInterface';
import './ProductList.scss'

interface DealCardProps {
    deal: DealInterface[];
  }

export const ProductList:React.FC<DealCardProps> = ({deal}):JSX.Element => {
  return (
    <>
          <Container>
            <Row>
            {deal.map(deal => (
            <>
              <Col className='col-card'>
                <DealCard key={deal.dealID} deal={deal} />
              </Col>
            </>
          ))}
            </Row>
          </Container>
    </>
  )
}
