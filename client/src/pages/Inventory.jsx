// import { useNavigate } from 'react-router-dom';
// import inventorybg from "../assets/inventory_bg.jpg";
// import Header from "../components/Header";

// export default function Inventory() {
//     const navigate = useNavigate();
//     return (
//         <div className="w-full h-screen bg-[url('./assets/inventory_bg.jpg')] bg-center bg-cover">
//         {/* <img
//           src={inventorybg}
//           alt="inventorybg"
//           className="w-full h-full object-cover"
//         /> */}
//         <Header/>
        

//         <div className="flex flex-col gap-6 p-40 px-4 max-w-7xl mx-auto">
//         <div className="w-full h-full text-center text-white text-6xl font-montserrat font-bold break-words">What We Have</div>
//         <div className="text-[#d4d4d4] text-xs sm:text-base">
//     {/* Content goes here */}
    

//             Discover your fitness journey with us! <br /> Explore top-notch equipment,
//             tailed programs, and <br /> motivating classes, Start today!
                
//         </div>
//         </div>
//         </div>
//     );
// }


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import inventorybg from "../assets/inventory_bg.jpg";
import Header from "../components/Header";

function PropertyDetails() {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        // Fetch data from the server
        fetch('/api/properties') // Assuming you have an API endpoint to fetch properties
            .then(response => response.json())
            .then(data => setProperties(data))
            .catch(error => console.error('Error fetching properties:', error));
    }, []);

    return (
        <div className="popular_2 clearfix">
            {properties.map(prop => (
                <div className="col-sm-4" key={prop.propertyId}>
                    <div className="popular_2i clearfix">
                        <div className="popular_2i1 clearfix">
                            <img src={`data:image/jpeg;base64, ${prop.imageData}`} alt="property-image" width="370" height="270" />
                        </div>
                        <div className="popular_2i2 clearfix">
                            <h5 className="mgt"><a href="#">FOR {prop.propStatus}</a></h5>
                        </div>
                    </div>
                    <div className="popular_2i3 clearfix">
                        <h5 className="mgt"><a href={`/displaypropByPropID?propid=${prop.propertyId}`}>{prop.propertyTitle}<i className="fa fa-check-square col_1"></i></a></h5>
                        <h4 className="col_1">{prop.price} / <span className="col_2">Total</span></h4>
                        <h6><i className="fa fa-hotel col_2"></i> {prop.propRooms} Beds </h6>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function Inventory() {
    const navigate = useNavigate();
    return (
        <div className="w-full h-screen bg-[url('./assets/inventory_bg.jpg')] bg-center bg-cover">
            <Header/>

            <div className="flex flex-col gap-6 p-40 px-4 max-w-7xl mx-auto">
                <div className="w-full h-full text-center text-white text-6xl font-montserrat font-bold break-words">What We Have</div>
                <div className="text-[#d4d4d4] text-xs sm:text-base">
                    {/* Content goes here */}
                    Discover your fitness journey with us! <br /> Explore top-notch equipment,
                    tailed programs, and <br /> motivating classes, Start today!
                </div>

                {/* Insert PropertyDetails component here */}
                <PropertyDetails />
            </div>
        </div>
    );
}


