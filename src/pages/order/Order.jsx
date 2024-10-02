import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import classes from "./order.module.css";

import { DataContext } from '../../components/Dataprovider/Dataprovider';
import { db } from '../../../Utility/Firebase';
import Productcard from '../../components/products/Productcard';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

function Order() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      const ordersRef = collection(db, "users", user.uid, "orders"); // Reference to user's orders collection
      const q = query(ordersRef, orderBy("created", "desc")); // Create query to order by 'created'

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setOrders(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        })));
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]); 

  return (
    <Layout>
   <section className={classes.mainordercontainer}>
        <div className={classes.orders__container}>
          <h2>Your orders</h2>
          {orders?.length == 0 && (
            <div style={{ padding: "20px", fontSize: "16px" }}>
              You don't have orders yet.
            </div>
          )}
          {/* ordered items */}
          <div className={classes.orderproductcard}>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID: {eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((order) => {
                    return (
                      <Productcard flex={true} product={order} key={order.id} />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Order



