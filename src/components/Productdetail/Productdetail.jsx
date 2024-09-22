import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Productcard from '../products/Productcard';
import axios from 'axios';
import styles from './productdetail.module.css';
import { producturl } from '../Api/endpoints';
import Layout from '../Layout/Layout';
import Fadeloader from '../Fadeloader/FadeLoader';

function Productdetail() {
  const { productId } = useParams();
  const [detail, setDetail] = useState(null); // Set initial state to null
  const [isLoading, setIsLoading] = useState(true); // Initialize loading to true

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${producturl}/products/${productId}`)
      .then((res) => {
        setDetail(res.data);
        setIsLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        setIsLoading(false); // Stop loading on error
        console.log(error);
      });
  }, [productId]);

  return (
    <Layout>
      {isLoading ? (
        <Fadeloader /> // Show loader when loading
      ) : (
        <div className={styles.maindetail}> {/* Use div instead of invalid tag */}
          {detail ? <Productcard product={detail} flex={true} renderdesc={true} renderadd={true}/> : <p>Loading product details...</p>}
        </div>
      )}
    </Layout>
  );
}

export default Productdetail;
