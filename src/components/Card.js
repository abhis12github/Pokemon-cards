import React from "react";

const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};

const Card = ({ pokemon }) => {
  const themeColor = typeColor[pokemon.types[0].type.name];

  return (
    <div className=" bg-white rounded-lg shadow-lg hover:scale-105 transition-all duration-500" key={pokemon.id}>
      <div
        className="bg-gradient-to-r from-blue-500 to-white rounded-t-lg"
        style={{ background: `radial-gradient(circle at 50% 0%, ${themeColor} 50%, #ffffff 0%)` }}
      >
        <p className="hp text-base bg-white py-2 px-2 rounded-full inline-block font-medium mb-1 font-Poppins text-gray-600">
          HP {pokemon.stats[0].base_stat}
        </p>
        <div className="image-container mx-auto w-24 h-24">
          <img
            className="object-contain w-full h-full"
            src={pokemon.sprites.other.dream_world.front_default}
            alt={pokemon.name}
          />
        </div>
      </div>
      <h2 className="text-center text-lg font-medium mt-2 font-Heading text-gray-800">
        {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
      </h2>
      <div className="types flex justify-center my-2 ">
        {pokemon.types.map((type) => (
          <span
            key={type.type.name}
            className="py-1 px-2 mx-2 rounded-full text-white text-xs font-normal font-Poppins"
            style={{ backgroundColor: typeColor[type.type.name] }}
          >
            {type.type.name}
          </span>
        ))}
      </div>
      <div className="stats grid grid-cols-3 text-center gap-1 pb-4">
        <div>
          <h3 className="text-base font-medium font-Poppins">{pokemon.stats[1].base_stat}</h3>
          <p className="text-xs font-Poppins text-gray-600">Attack</p>
        </div>
        <div>
          <h3 className="text-base font-medium font-Poppins">{pokemon.stats[2].base_stat}</h3>
          <p className="text-xs font-Poppins text-gray-600">Defense</p>
        </div>
        <div>
          <h3 className="text-base font-medium font-Poppins">{pokemon.stats[5].base_stat}</h3>
          <p className="text-xs font-Poppins text-gray-600">Speed</p>
        </div>
      </div>
    </div>


    
  );
};

export default Card;
