import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormControl, ListGroup } from 'react-bootstrap';
import { fetchDeals } from '../../../api';
import './Searchbar.scss';
import { DealInterface } from '../../../interfaces/dealInterface';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDeals, setFilteredDeals] = useState<DealInterface[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const searchDeals = async () => {
      if (searchTerm.length > 0) {
        const deals = await fetchDeals();
        const filtered = deals.filter(deal =>
          deal.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredDeals(filtered);
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    };

    searchDeals();
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className="searchbar-container" ref={wrapperRef}>
      <Form>
        <FormControl
          type="text"
          placeholder="Search games"
          className="mr-sm-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowDropdown(true)}
        />
      </Form>
      {showDropdown && (
        <ListGroup className="search-dropdown">
          {filteredDeals.map(deal => (
            <ListGroup.Item
              key={deal.dealID}
              onClick={() => {
                navigate(`/deal/${deal.dealID}`)
                setShowDropdown(false)
              }}
            >
              {deal.title}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default SearchBar;
