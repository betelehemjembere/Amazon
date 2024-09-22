import React, { useContext } from 'react';
import { Rating } from '@mui/material';
import styles from './products.module.css'; // Import the CSS module
import { Link } from 'react-router-dom';
import { DataContext } from '../Dataprovider/Dataprovider';
import Currencyformatter from '../Currencyformatter/Currencyformatter';

function Productcard({ product, flex,renderdesc,renderadd }) {
  const { image, title, id,price, rating,description } = product;

  const [state,dispatch] = useContext(DataContext)
console.log(state);

  const addtocart=()=>{
    dispatch(
      {
        type:'ADD_TO_BASKET',
        item:{
          image, title, id,price,rating,description
        }
      }
    )
  }

  return (
    <div className={`${styles.productContainer} ${flex ? styles.productflex : ''}`}> {/* Apply flex layout if true */}
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} className={styles.productImage} /> {/* Apply module class */}
      </Link>
      {/* Wrap title, rating, and button in a container if flex is true */}
      <div className={flex ? styles.productInfo : ''}>
        <h1 className={styles.productTitle}>{title}</h1>
       { renderdesc&& <p className={styles.desc}>{description}</p>}
        <div className={styles.rating}>
          <Rating value={rating.rate} precision={0.1} />
          <small>{rating.count}</small>
        </div>
        <div>
        <Currencyformatter amount={price}/>
        </div>
        {
          renderadd&&  <button className={styles.addToCartButton} onClick={addtocart}>Add to cart</button>
        }
      </div>
    </div>
  );
}

export default Productcard;
