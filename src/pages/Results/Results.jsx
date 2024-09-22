import axios from 'axios';
import React, { useEffect, useState } from 'react'; // Import useState and useEffect
import { useParams } from 'react-router-dom';
import { producturl } from '../../components/Api/endpoints';
import Productcard from '../../components/products/Productcard';
import styles from './results.module.css'; // Import CSS module
import Layout from '../../components/Layout/Layout';
import Fadeloader from '../../components/Fadeloader/FadeLoader';

function Results() {
  const { categoryname } = useParams(); // Get the category name from URL
  const [results, setResults] = useState([]); // Correct state initialization
  const [isLoading, setIsLoading] = useState(true);


  // Fetch data when the category changes
  useEffect(() => {
    setIsLoading(true);
    axios.get(`${producturl}/products/category/${categoryname}`)
      .then((res) => {
        setResults(res.data); // Set fetched data to state
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error); // Log the error properly
      });
  }, [categoryname]); // Add categoryname to dependency array

  return (
    <Layout>
{isLoading ? (
        <Fadeloader /> // Show loader when loading
      ) : (
<div className={styles.mainResult}>
        <section className={styles.section}>
          <h1 className={styles.resultCategory}>Results for {categoryname} :- </h1>
          {
            results.map((singleresult) => {
              return <Productcard product={singleresult} key={singleresult.id} flex={false} renderdesc={false} renderadd={true}/>;
            })
          }
        </section>
      </div>
      )}
    </Layout>
  );
}

export default Results;
