import React, { useState } from 'react'
import { NavDropdown, Button } from 'react-bootstrap'
import { IoIosRemoveCircleOutline, IoIosAddCircleOutline } from 'react-icons/io'
import { IoCartOutline } from 'react-icons/io5'
import { MdCircle, MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { removeFromCart, adjustQty } from '../../../redux/reducers/cartReducer';


export const CartComponent = () => {
    const cartItems = useSelector((state: RootState) => state.cart.cart);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dispatch = useDispatch();

    const handleRemove = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>,id: string) => {
        event.stopPropagation()
        dispatch(removeFromCart(id));
      }
    
      const handleQtyChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string, qty: number) => {
        event.stopPropagation()
        dispatch(adjustQty({id, qty}))
      }

  return (
    <>
                    { cartItems.length > 0 ? (<MdCircle className='notif-icon'/> ) : '' }
                <NavDropdown
                  align="end" 
                  title={<IoCartOutline size={24} style={{position: 'relative', display: 'inline-block'}}/>}
                  show={dropdownVisible}
                  onToggle={(isOpen) => setDropdownVisible(isOpen)}
                  id="basic-nav-dropdown">
                        {cartItems.length > 0 ? (
                            cartItems.map(item => (
                                <NavDropdown.Item key={item.dealID} className='nav-dropdown-item' >
                                    <div style={{ display: 'flex', alignItems: 'center', width:'30vw', whiteSpace: 'normal', outline: 'none'}}>
                                      <Button 
                                        onClick={(event) => handleRemove(event, item.dealID)}
                                        style={{backgroundColor: 'transparent', border: '1px solid red'}}>
                                          <MdDelete style={{ color: 'red' }} />
                                      </Button>
                                        <img src={item.thumb} style={{width: '15%', margin: '1vw'}} alt="Does not work" />
                                        <div className='cart-details'>
                                            <p>{item.title} </p>
                                            <p>Price: ${item.salePrice} </p>
                                            <p>
                                                Qty: 
                                                <Button style={{backgroundColor: 'transparent', border: 'none', color: 'black'}}  onClick={(event) => handleQtyChange(event, item.dealID, item.quantity - 1)}> <IoIosRemoveCircleOutline /> </Button>

                                                  {item.quantity} 

                                                <Button style={{backgroundColor: 'transparent', border: 'none', color: 'black'}} onClick={(event) => handleQtyChange(event,item.dealID, item.quantity + 1)}> <IoIosAddCircleOutline /> </Button>

                                            </p>
                                            <span>Subtotal :${parseFloat(item.salePrice) * item.quantity} </span>
                                        </div>
                                    </div>
                                    <hr/>
                                </NavDropdown.Item>
                            ))
                        ) : (
                            <NavDropdown.Item>No items in cart</NavDropdown.Item>
                        )}
                        <NavDropdown.Divider />
                        <NavDropdown.Item disabled>
                            Total: ${cartItems.reduce((acc, item) => acc + parseFloat(item.salePrice) * item.quantity, 0)}
                        </NavDropdown.Item>
                    </NavDropdown>\
    </>
  )
}
