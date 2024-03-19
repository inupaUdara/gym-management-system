
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div>Home</div>
      <Header />
      <div>
        Home
        <Button
          onClick={() => {
            navigate("./Payment");
          }}
          color="purple"
        >
          Payments
        </Button>
      </div>
    </>
  );
}
