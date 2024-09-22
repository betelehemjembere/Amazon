import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Productcard from './Productcard';
import styles from './products.module.css'; // Import CSS module
import Fadeloader from '../Fadeloader/FadeLoader';

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
    setIsLoading(true);
    axios
      .get('https://fakestoreapi.com/products')
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
    {

      isLoading ? (
        <Fadeloader  /> // Show loader when loading
      ):(<section className={styles.productsSection}> {/* Add className for styling */}
        {products.map((singleProduct) => (
          <Productcard product={singleProduct} key={singleProduct.id} renderadd={true} />
        ))}
      </section>
    )
    
}
</>  
)
}
export default Products;
