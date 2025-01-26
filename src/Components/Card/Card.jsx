import style from "./Card.module.css";
import Rating from "@mui/material/Rating";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import CustomDialog from "../Dialog/Dialog";

export default function Card(props) {
  const navigate = useNavigate();
  const dialog = useRef(null);

  function toggleFavorite() {
    const clone = { ...props.hotel };
    clone.isFavorite = !clone.isFavorite;
    props.editHotel(clone);
  }

  function Details() {
    navigate(`/details/${props.hotel.id}`);
  }

  function OpenConfirmDialog() {
    dialog.current?.openDialog();
  }

  function removeHotel() {
    props.removeHotel(props.hotel);
  }

  return (
    <div className={style.card_container}>
      <div className={style.card_actions}>
        <FaTrash onClick={OpenConfirmDialog} />
        <FaRegEdit onClick={() => props.showModal(props.hotel)} />
        {props.hotel.isFavorite ? (
          <MdFavorite onClick={toggleFavorite} />
        ) : (
          <MdFavoriteBorder onClick={toggleFavorite} />
        )}
      </div>
      <img
        className={style.card_img}
        src={props.hotel.img}
        alt={props.hotel.name}
        title={props.hotel.name}
        onClick={Details}
      />
      <h2 className={style.card_name} onClick={Details}>
        {props.hotel.name}
      </h2>
      <h3 className={style.card_daily_rate}>
        Diária: R$ {props.hotel.dailyRate.toFixed(2)}
      </h3>
      <p className={style.card_location}>
        {props.hotel.city} - {props.hotel.state}
      </p>
      <Rating
        className={style.card_rating}
        value={props.hotel.classification}
        precision={1}
        readOnly
      />

      <CustomDialog
        ref={dialog}
        onConfirm={removeHotel}
        title="Deseja excluir esse hotel"
        text="Essa ação é irreversível, e irá apagar o hotel permanentemente."
      />
    </div>
  );
}
