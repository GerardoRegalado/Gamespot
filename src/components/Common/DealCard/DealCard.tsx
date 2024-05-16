import React from 'react'
import { DealInterface } from '../../../interfaces/dealInterface'
import { Button, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/reducers/cartReducer';
import "./DealCard.scss"
import { IoCartOutline } from 'react-icons/io5';
interface DealCardProps {
    deal: DealInterface;
  }
export const DealCard: React.FC<DealCardProps> = ({deal}) => {
    const dispatch = useDispatch();
    

  return (
    <>
        <Card className='card-container' >
            <Card.Img className='card-image' variant="top" src={deal.thumb}/>
            <Card.Body className='card-body' style={{ }}>
                <div className='desc'>
                    <Card.Title className='card-title'>
                        {deal.title}
                    </Card.Title>
                    <Card.Text className='normal-price' >
                        Normal Price: ${deal.normalPrice}
                    </Card.Text>
                    <Card.Text className='hot-price'>
                       ♨ Hot Price: ${deal.salePrice === "0.00" ? "Free" : deal.salePrice}
                    </Card.Text>
                    <Card.Text className='savings' >
                        Save up to: {~~deal.savings}%
                    </Card.Text>
                </div>
                <div className="buttons">
                <Button className='details' onClick={() => {dispatch(addToCart(deal))}}>See Details</Button>
                <Button className='cart' onClick={() => {dispatch(addToCart(deal))}}> 
                    <IoCartOutline size={19} style={{position: 'relative', display: 'inline-block'}}/>
                </Button>

                </div>
            </Card.Body>
        </Card>
    </>
  )
}
