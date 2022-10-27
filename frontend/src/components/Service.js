import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Service(props) {
  const { service } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === service._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/services/${item._id}`);
    if (data.countInAvailable < quantity) {
      window.alert('Sorry. Service is out avilable');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card>
      <Link to={`/service/${service.slug}`}>
        <img src={service.image} className="card-img-top" alt={service.name} />
      </Link>
      <Card.Body>
        <Link to={`/service/${service.slug}`}>
          <Card.Title>{service.name}</Card.Title>
        </Link>
        <Rating rating={service.rating} numReviews={service.numReviews} />
        <Card.Text>SR {service.price}</Card.Text>
        {service.countInAvailable === 0 ? (
          <Button variant="light" disabled>
            Not Avilable
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(service)}>Add to cart</Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default Service;
