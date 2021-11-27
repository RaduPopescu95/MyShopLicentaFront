import React, {useState, useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
// import axios from 'axios' replaced using redux



function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const {error: eroare, loading: incarcare, products: produse} = productList;

  // const [products, setProducts] = useState ([]); replaced using redux

  useEffect(() => {

    dispatch(listProducts());
   

   


    // -------- replaced using redux -------
    // async function fetchProducts(){
    //   const {data: date} = await axios.get('/api/products/');
    //   setProducts(date);

    // }

    // fetchProducts();

  }, [dispatch])



  return (
    <div>
    <h1>latest products</h1>
        {incarcare ? <Loader/>
          : eroare ? <Message variant='danger'>{eroare}</Message>
          : 
          <Row>
            {produse.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product produs={product}/>
              </Col>
            ))}
          </Row>
      }
      
    </div>
 )
}

export default HomeScreen
