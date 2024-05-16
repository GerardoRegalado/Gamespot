//Package Imports
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IoCartOutline } from 'react-icons/io5';

//Local Imports
import './ProductDetail.scss';
import { fetchDealById } from '../../api';
import { DealDetailsInterface } from '../../interfaces/dealDetail';
import { addToCart } from '../../redux/reducers/cartReducer';
import { DealInterface } from '../../interfaces/dealInterface';


export const ProductDetail: React.FC = (): JSX.Element => {
  const navigate = useNavigate() // to navigage back home.
  const dispatch = useDispatch(); //to update the state managed by the redux store.
  const { id } = useParams<{ id: string }>(); // getting id from url params.
  const [deal, setDeal] = useState<DealDetailsInterface | null>(null); // state for deal to look for.
  const [itemToCart, setItemToCart] = useState<DealInterface | null>(null); // state for item to send to the cart.
  const [loading, setLoading] = useState(true); // loading spinner flag.
  const [error, setError] = useState<string | null>(null); // state for error handling

  useEffect(() => {
    const getDeal = async () => {
      try {
        if (id) {
          const data = await fetchDealById(id);
          setDeal(data);
          setLoading(false);
        }
      } catch (err) {
        setError('Failed to fetch deal details');
        console.log(error)
        setLoading(false);
      }
    };
    getDeal();
  }, [id]);

  useEffect(() => {
    if (deal) {
      const addItemToCart: DealInterface = {
        dealID: deal.gameInfo.gameID,
        title: deal.gameInfo.name,
        salePrice: deal.gameInfo.salePrice,
        normalPrice: deal.gameInfo.retailPrice,
        quantity: 0,
        savings: ((Number(deal.gameInfo.retailPrice) - Number(deal.gameInfo.salePrice)) / Number(deal.gameInfo.retailPrice) * 100).toFixed(2).toString(),
        thumb: deal.gameInfo.thumb
      };
      setItemToCart(addItemToCart);
    }
  }, [deal]);

  if (loading) {
    return (
      <div className="spinner">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div>
        <button className='cart' onClick={() => {navigate('/home')}}>Back to Home</button>
      {deal ? (
        <>
          <div className="deal-details-container">
            <Container>
              <Row>
                <Col>
                  <div className="image-container">
                    <img src={deal.gameInfo.thumb} alt={deal.gameInfo.name} />
                  </div>
                </Col>
                <Col>
                  <div className="deal-info-container">
                    <div className="deal-title">
                      <h1>{deal.gameInfo.name}</h1>
                    </div>
                    <div className="deal-general-info">
                      <div className="pricing">
                        <p>Normal Price: <span className='retail'>${deal.gameInfo.retailPrice}</span></p>
                        <p>Hot Price: <span className='hot-price'>${deal.gameInfo.salePrice === "0.00" ? "Free" : deal.gameInfo.salePrice}</span></p>
                      </div>
                      <div className="info">
                        <p>Release Date: {new Date(deal.gameInfo.releaseDate * 1000).toLocaleDateString()}</p>
                        <p>Publisher: {deal.gameInfo.publisher}</p>
                        <p>Steam Rating: {deal.gameInfo.steamRatingText} ({deal.gameInfo.steamRatingPercent}%)</p>
                        <p>Metacritic Score: {deal.gameInfo.metacriticScore}</p>
                      </div>
                    </div>
                    <div className="button">
                    <Button className='cart' onClick={() => { dispatch(addToCart(itemToCart!)) }}>
                      Add to cart<IoCartOutline size={19}  />
                    </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </>
      ) : (
        <div>No deal found</div>
      )}
    </div>
  );
};

export default ProductDetail;
