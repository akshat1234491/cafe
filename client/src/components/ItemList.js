//creating view
import {useDispatch} from 'react-redux';
import React from 'react';
import { Button,Card } from 'antd';
const { Meta } = Card;


const ItemList = ({item}) => {
  const dispatch = useDispatch()
  //update cart handler
  const handleAddTOCart = () => {
    dispatch({
      type:'ADD_TO_CART',
      payload : {...item, quantity:1}

    });
  };
  return (
    <Card
        style={{ width: 240, marginBottom: 20 }}
        cover={<img alt={item.name} src={item.image} style={{ height: 200 }} />}
      >
        <div className='product-info'>
          <div>
            <h3>{item.name}</h3>
            <span>Price: {item.price}</span>
          </div>
          <div className='item-button'>
            <Button onClick={() => handleAddTOCart()}>Add to cart</Button>
          </div>
        </div>
      </Card>
  )
};

export default ItemList;