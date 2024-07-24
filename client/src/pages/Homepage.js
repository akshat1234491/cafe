
import React,{useState,useEffect} from "react";
import DefaultLayout from "./../components/DefaultLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Col, Row } from 'antd';
import ItemList from "../components/ItemList";
import { Collection } from "mongoose";
import Column from "antd/lib/table/Column";
const Homepage = () => {
  const [itemsData,setItemsData] = useState([]);
  const [selectedCategory,setSelectedCategory] = useState("Mens Wear");
  const categories = [
    {
      name:'Mens Wear',
    imageUrl :'https://static.vecteezy.com/system/resources/previews/023/605/941/non_2x/mens-cloth-logo-design-vector.jpg'
  },
  {
    name:'Womens Wear',
    imageUrl :'https://t4.ftcdn.net/jpg/04/84/10/05/360_F_484100539_jaoLj7F90jVBrwbpCaCgSulsBAHyoX50.jpg'
  },
  {
    name:'Kids Wear',
    imageUrl:'https://img.freepik.com/premium-vector/happy-kids-tee-tshirt-logo-icon_8580-809.jpg'
  },
  {
    name:'Accessories',
    imageUrl:'https://i.pinimg.com/474x/42/7c/3d/427c3d68ba37b04d2bb4e2793d6a2115.jpg'
  }
  ]
  const dispatch = useDispatch();
  //useeffect
  useEffect(() => {
    const getAllItems =async () =>{
      try{
        dispatch({
          type:'SHOW_LOADING',
        });
        const {data} = await axios.get("/api/items/get-item");
        setItemsData(data);
        dispatch({
          type:'HIDE_LOADING',
       });
        console.log(data);
      }
      catch (error) {
        console.log(error);
      }
    };
    getAllItems();
  },[dispatch]);
  return (
    <DefaultLayout>
      <div className="d-flex">
        {categories.map(category => (
           <div key={category.name} className={`d-flex category 
           ${selectedCategory === category.name && "category-active"
           }`}
           onClick={()=>setSelectedCategory(category.name)}
           >
             <h4>{category.name}</h4>
              <img src={category.imageUrl} alt={category.name} height="40" width="80" />
           </div>
        ))}
      </div>
      <Row>
      {
        itemsData.filter(i => i.category === selectedCategory ).map(item => (
          <Col xs={24} lg={6} md={12} sm={6}>
          <ItemList key={item.id} item = {item}/>
          </Col>
          
        ))
      }
      </Row>
    </DefaultLayout>
  );
};

export default Homepage;
