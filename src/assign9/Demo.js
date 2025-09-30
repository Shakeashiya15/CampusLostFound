import React from 'react'
import './TouristPlaces.css';

const places = [
 {
 name:'ash',
 image:'',
 description:' '
 }
];
function TouristPlaces()
{
    return(
        <div>
            <h2> Tourist Place</h2>
            <div className="card-container">
                {places.map((place,index)=>(
                    <div className="card" key={index}>
                        <img src ={place.image} alt={place.name} className="card-image"/>
                        <h3>{place.name}</h3>
                        <h3>{place.description}</h3>
                    </div>
                ))}

            </div>
        </div>
    )
}


export default TouristPlaces;