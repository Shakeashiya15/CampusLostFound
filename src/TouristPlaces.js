import React from 'react';
import './TouristPlaces.css';
const places = [ {
name: 'Brihadeeswarar Temple, Thanjavur',
image: '/images/i1.jpg',
description: 'A UNESCO World Heritage Site, famous for its grand Chola architecture dedicated to Lord Shiva.'}, 
{
name: 'Alleppey Backwaters, Kerala',
image: '/images/i2.jpg',
description: 'Known as the “Venice of the East,” famous for serene canals and traditional houseboats' },{
name: 'Kashmir Valley, Jammu & Kashmir',
image: '/images/i3.jpg',
description: 'Called “Paradise on Earth,” surrounded by snow-capped mountains, lakes, and lush green valleys.' }];
function TouristPlaces() {
return (
<div>
<h2>Tourist Places</h2>
<div className="card-container">
{places.map((place, index) => (
<div className="card" key={index}>
<img src={place.image} alt={place.name} className="card-image" />
<h3>{place.name}</h3>
<p>{place.description}</p>
</div>
))}
</div>
</div> );}	
export default TouristPlaces;