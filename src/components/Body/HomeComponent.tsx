import React, { useEffect, useState } from 'react'
import { DealInterface } from '../../interfaces/dealInterface';
import { fetchDeals } from '../../api/apiProduct';

export const HomeComponent = () => {
  const [deals, setDeals] = useState<DealInterface[]>([]); // State para productos
  const [ cheaperDeals, setCheaperDeals] = useState<DealInterface[]>([])
  const [loading, setLoading] = useState(true); // State para loading

  const getDeals = async () => {
    try {
      const data = await fetchDeals();
      console.log(data);
      setDeals(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching deals:', error);
      setLoading(false);
    }
  };


  useEffect(() => {
    getDeals();
    console.log(deals)

  }, []);

  useEffect(() => {
    if (deals.length > 0) {
      const sortedDeals = deals
        .sort((a, b) => parseFloat(a.salePrice) - parseFloat(b.salePrice))
        .slice(0, 6);
      setCheaperDeals(sortedDeals);
      console.log(sortedDeals);
    }
  }, [deals]);

  return (
    <div>home</div>
  )
}
