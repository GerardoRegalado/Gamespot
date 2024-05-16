import React, { useEffect, useState } from 'react'
import { DealInterface } from '../../../interfaces/dealInterface';
import { fetchDeals } from '../../../api/apiProduct';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';


import 'swiper/css/bundle';

import './HomeComponent.scss'
import { ProductList } from '../../ProductList/ProductList';
import { DealCard } from '../../Common/DealCard/DealCard';


export const HomeComponent = () => {
  const [deals, setDeals] = useState<DealInterface[]>([]); // State para productos
  const [ cheaperDeals, setCheaperDeals] = useState<DealInterface[]>([])
  const [loading, setLoading] = useState(true); // State para loading

  const getDeals = async () => {
    try {
      const data = await fetchDeals();
      setDeals(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching deals:', error);
      setLoading(false);
    }
  };


  useEffect(() => {
    getDeals();

  }, []);

  useEffect(() => {
    if (deals.length > 0) {
      const sortedDeals = deals
        .sort((a, b) => parseFloat(a.salePrice) - parseFloat(b.salePrice))
        .slice(0, 6);
      setCheaperDeals(sortedDeals);
    }
  }, [deals]);

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
