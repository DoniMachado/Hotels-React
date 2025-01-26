import style from "./Details.module.css";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import default_img from "../../Images/imagem-default.png";
import not_found from "../../Images/not-found.webp";

function getHotel(id) {
  const hotels = localStorage.getItem("hotels");
  let hotel = null;
  if (!hotels) {
    localStorage.setItem("hotels", []);
  } else {
    const temp = JSON.parse(hotels);
    hotel = temp.find((h) => h.id == id);
  }
  return hotel;
}

export default function Details() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(() => getHotel(id));

  return (
    <div id={style.details_container}>
      {hotel ? (
        <>
          <img
            id={style.details_img}
            src={hotel.img}
            alt={hotel.name}
            title={hotel.name}
          />
          <div id={style.details_img_extra_container}>
            <img
              className={style.details_img_extra}
              src={!hotel.imgExtra1 ? default_img : hotel.imgExtra1}
              alt={hotel.name}
              title={hotel.name}
            />
            <img
              className={style.details_img_extra}
              src={!hotel.imgExtra2 ? default_img : hotel.imgExtra2}
              alt={hotel.name}
              title={hotel.name}
            />
            <img
              className={style.details_img_extra}
              src={!hotel.imgExtra3 ? default_img : hotel.imgExtra3}
              alt={hotel.name}
              title={hotel.name}
            />
            <img
              className={style.details_img_extra}
              src={!hotel.imgExtra4 ? default_img : hotel.imgExtra4}
              alt={hotel.name}
              title={hotel.name}
            />
          </div>
          <h1 id={style.details_name}>{hotel.name}</h1>
          <h2 id={style.details_dailyRate}>
            Diária: R$ {hotel.dailyRate.toFixed(2)}
          </h2>
          <h3 id={style.details_location}>
            {hotel.city} - {hotel.state}
          </h3>
          <p id={style.details_description}>{hotel.description}</p>
          <Rating
            size="large"
            className={style.details_rating}
            value={hotel.classification}
            precision={1}
            readOnly
          />
        </>
      ) : (
        <>
          <img
            id={style.details_img}
            src={not_found}
            alt="Not Found"
            title="Not Found"
          />
          <h1>Hotel não encontrado</h1>
        </>
      )}
    </div>
  );
}
