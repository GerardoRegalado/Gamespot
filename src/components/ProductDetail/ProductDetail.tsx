import React, { useEffect, useState } from 'react';
import './ProductDetail.scss';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDealById } from '../../api';
import { DealDetailsInterface } from '../../interfaces/dealDetail';
import { useDispatch } from 'react-redux';
import { IoCartOutline } from 'react-icons/io5';
import { addToCart } from '../../redux/reducers/cartReducer';
import { DealInterface } from '../../interfaces/dealInterface';

export const ProductDetail: React.FC = () => {
const navigate = useNavigate()
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [deal, setDeal] = useState<DealDetailsInterface | null>(null);
  const [itemToCart, setItemToCart] = useState<DealInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getDeal = async () => {
      try {
        const data = await fetchDealById(id!);
        setDeal(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch deal details');
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
                      Add to cart<IoCartOutline size={19} style={{ position: 'relative', display: 'inline-block' }} />
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
