import { useEffect, useState } from "react";
import Header from "../components/Header";
import ShoppingCart from "../components/shoppingCart";
import { useParams } from "react-router-dom";

const Cart = () => {
  const { SupplementProuductId } = useParams();
  const [supplements, setSupplements] = useState(null);

  useEffect(() => {
    const fetchSupplement = async () => {
      try {
        const res = await fetch(`/api/supplements/getAllSupplements`);

        const data = await res.json();
        console.log(1234, data);
        if (res.ok) {
          setSupplements(data.supplements || []);
        }
      } catch (error) {
        console.error("Error fetching supplement:", error);
      }
    };

    fetchSupplement();
  }, [SupplementProuductId]);

  return (
    <>
      <Header />
      <ShoppingCart supplements={supplements} />
    </>
  );
};

export default Cart;
