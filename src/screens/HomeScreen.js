import React, {useState, useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'



function HomeScreen() {
  const [products, setProducts] = useState ([]);

  useEffect(() => {

    async function fetchProducts(){

      const {data: date} = await axios.get('/api/products/');
      setProducts(date);

    }

    fetchProducts();

  }, [])

 return (
  <div>
   <h1>latest products</h1>
    <Row>
      {products.map(product => (
       <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
        <Product produs={product}/>
       </Col>
      ))}
    </Row>
  </div>
 )
}

export default HomeScreen
