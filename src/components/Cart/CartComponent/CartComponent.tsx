import React, { useState } from 'react';
import { NavDropdown, Button } from 'react-bootstrap';
import { IoIosRemoveCircleOutline, IoIosAddCircleOutline } from 'react-icons/io';
import { IoCartOutline } from 'react-icons/io5';
import { MdCircle, MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { removeFromCart, adjustQty } from '../../../redux/reducers/cartReducer';
import './CartComponent.scss';

export const CartComponent = () => {
    const cartItems = useSelector((state: RootState) => state.cart.cart);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dispatch = useDispatch();

    const handleRemove = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
        event.stopPropagation();
        dispatch(removeFromCart(id));
    }

    const handleQtyChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string, qty: number) => {
        event.stopPropagation();
        if(qty > 0) {
          dispatch(adjustQty({ id, qty }));
        }
    }

    return (
        <div className="navbar-cart-container">
            { cartItems.length > 0 && <MdCircle className='notif-icon' /> }
            <NavDropdown
                align="end"
                title={ <IoCartOutline size={24} className='cart-outline'/> }
                show={dropdownVisible}
                onToggle={(isOpen) => setDropdownVisible(isOpen)}
                id="basic-nav-dropdown">
                {cartItems.length > 0 ? (
                    cartItems.map(item => (
                        <NavDropdown.Item key={item.dealID} className='nav-dropdown-item'>
                            <div className='item-container'>
                                <Button
                                    className='remove-item'
                                    onClick={(event) => handleRemove(event, item.dealID)}
                                >
                                    <MdDelete className='delete-icon'/>
                                </Button>
                                <img className='item-image' src={item.thumb} alt="Does not work" />
                                <div className='cart-details'>
                                    <p>{item.title}</p>
                                    <p>Price: ${item.salePrice}</p>
                                    <p>
                                        Qty:
                                        <Button className='handle-qty-buttons' onClick={(event) => handleQtyChange(event, item.dealID, item.quantity - 1)}
                                        >
                                          <IoIosRemoveCircleOutline />
                                      </Button>                                        
                                      {item.quantity}
                                        <Button className='handle-qty-buttons' onClick={(event) => handleQtyChange(event, item.dealID, item.quantity + 1)}> <IoIosAddCircleOutline /> </Button>
                                    </p>
                                    <span>Subtotal :${(parseFloat(item.salePrice) * item.quantity).toFixed(2)}</span>
                                </div>
                            </div>
                            <hr />
                        </NavDropdown.Item>
                    ))
                ) : (
                    <NavDropdown.Item>No items in cart</NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item disabled>
                    Total: ${cartItems.reduce((acc, item) => acc + parseFloat(item.salePrice) * item.quantity, 0).toFixed(2)}
                </NavDropdown.Item>
            </NavDropdown>
        </div>
    );
}
