import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'

import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
// import { useHistory } from 'react-router-dom';

// import history from '../components/History'

// import axios from 'axios' replaced with redux


function ProductScreen(props) {
// const {id: _id_} = useParams();
// const product = products.find(p => p._id === id);


// const [product, setProducts] = useState ([]);
  const [qty, setQty]=useState(1);
  const historys = useNavigate();
  const {id: _id_} = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails);
  const {loading, error, product} = productDetails

  useEffect(() => {
    //replaced with redux
    // async function fetchProduct(){

    //   const {data: date} = await axios.get(`/api/products/${_id_}`);
    //   setProducts(date);
    
    // }

    // fetchProduct();
    dispatch(listProductDetails(_id_))

  }, [dispatch, _id_ ]) 

  //function addToCart
  const addToCartHandler = () => {
    historys(`/cart/${_id_}?qty=${qty}`)
  }

 return (
  <div>
   <Link to='/' className="btn btn-light my-3">Button</Link>
   {loading ? <Loader/>
      :error ? <Message variant="danger">{error}</Message>
      :(
           <Row>
     <Col md={6}>
       <Image src={product.image} alt={product.name} fluid/>
     </Col>

     <Col md={3}>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h3>{product.name}</h3>
        </ListGroup.Item>

        <ListGroup.Item>
          <Rating value={product.rating} text={`${product.numReviews} reviews`} color={"#f8e825"}/>
        </ListGroup.Item>
      

       <ListGroup.Item>
          Price:${product.price}
        </ListGroup.Item>

         <ListGroup.Item>
          Description:{product.description}
        </ListGroup.Item>
     </ListGroup>
     </Col>   

     <Col md={3}>
       <Card>
         <ListGroup variant="flush">
           <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col>
                  <strong>${product.price}</strong>
                </Col>
              </Row>
           </ListGroup.Item>

           
           <ListGroup.Item>
              <Row>
                <Col>Status:</Col>
                <Col>
                  {product.countInStock > 0 ? 'In Stock' : "Out of Stock"}
                </Col>
              </Row>
           </ListGroup.Item>

           {product.countInStock > 0 && (
             <ListGroup.Item>
               <Row>
                 <Col className="align-self-center">Qty</Col>
                 <Col xs='auto' className='my-1'>
                  <Form.Control
                    size ="sm"
                    as="select"
                    value={qty}
                    onChange={e => setQty(e.target.value)}
                  >
                    {
                      [...Array(product.countInStock).keys()].map(x => (
                        <option key={x + 1} value={x+1}>
                          {x + 1}
                        </option>
                      ))
                    }
                  </Form.Control>
                 </Col>
               </Row>
             </ListGroup.Item>
           )}

           <ListGroup.Item className="text-center">
              <Button
                onClick={addToCartHandler} 
                className="btn-block"   disabled={product.countInStock == 0} 
                type="button">
                Add to Cart
              </Button>
           </ListGroup.Item>
         </ListGroup>
       </Card>
     </Col>
   </Row>
      )
   }

  </div>
 )
}

export default ProductScreen
