//Package Imports
import 'swiper/css/bundle';
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Spinner } from 'react-bootstrap';

//Local Imports
import './HomeComponent.scss'
import { DealInterface } from '../../../interfaces/dealInterface';
import { fetchDeals } from '../../../api/apiProduct';
import { ProductList } from '../../ProductList/ProductList';
import { DealCard } from '../../Common/DealCard/DealCard';


export const HomeComponent: React.FC = (): JSX.Element => {
  const [deals, setDeals] = useState<DealInterface[]>([]); // State for products.
  const [ cheaperDeals, setCheaperDeals] = useState<DealInterface[]>([]) //state for save the first elements in the array that represents cheaper games.
  const [loading, setLoading] = useState(true); // State for loading loading.

  const getDeals = async (): Promise<void> => {
    try {
      const data = await fetchDeals();
      setDeals(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching deals:', error);
      setLoading(false);
    }
  };


  useEffect(():void => {
    getDeals();

  }, []);

  useEffect(():void => {
    if (deals.length > 0) {
      const sortedDeals = deals
        .sort((a, b) => parseFloat(a.salePrice) - parseFloat(b.salePrice))
        .slice(0, 6);
      setCheaperDeals(sortedDeals);
    }
  }, [deals]);

  if (loading) {
    return (
      <div className="spinner">
        <Spinner animation="border" variant="primary" />
      </div>
    )
  }


  return (
    <>
    <section className='home-container'>
      <h2 className='title'> Hot Sales</h2>
        <section className="carousel">
          <Swiper 
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={10} 
            slidesPerView={1} 
            navigation
          >
            {cheaperDeals.map(deal => (
                <SwiperSlide key={deal.dealID} className='item'>
                    <DealCard deal={deal} />
                </SwiperSlide>      
            ))}
          </Swiper>
        </section>
      <h2 className='title'> Hot Deals</h2>
        <section className="deals">
            <ProductList deal={deals}/>
        </section>
    </section>
    </>
  )
}
