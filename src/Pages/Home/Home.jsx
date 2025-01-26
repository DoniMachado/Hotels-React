import style from "./Home.module.css";
import React, { useEffect, useState, useRef } from "react";
import Pagination from "@mui/material/Pagination";
import Card from "../../Components/Card/Card";
import Alert from "../../Components/Alert/Alert";
import { IoMdAddCircleOutline } from "react-icons/io";
import { nanoid } from "nanoid";
import { Modal } from "react-responsive-modal";
import Rating from "@mui/material/Rating";
import Checkbox from "@mui/material/Checkbox";

function getHotels() {
  const hotels = localStorage.getItem("hotels");
  if (!hotels) {
    localStorage.setItem("hotels", []);
    return [];
  } else {
    return JSON.parse(hotels);
  }
}

export default function Home(props) {
  const pageSize = 10;
  const alert = useRef(null);
  const [hotels, setHotels] = useState(getHotels);
  const [filterName, setFilterName] = useState("");
  const [filterOrder, setFilterOrder] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [isFavoriteOnly, setIsFavoriteOnly] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [hotel, setHotel] = useState({
    id: nanoid(),
    name: "",
    description: "",
    img: "",
    imgExtra1: "",
    imgExtra2: "",
    imgExtra3: "",
    imgExtra4: "",
    dailyRate: 0,
    city: "",
    state: "",
    classification: 0,
    isFavorite: false,
  });
  const [hotelErrors, setHotelErrors] = useState({
    nameError: "",
    imgError: "",
    dailyRateError: "",
    cityError: "",
    stateError: "",
  });

  function addHotel(hotel) {
    try {
      const clone = [...getHotels()];
      clone.push(hotel);
      localStorage.setItem("hotels", JSON.stringify(clone));
      setHotels(clone);
      OpenAlert(true, "Cadastro do hotel concluída com sucesso!");
    } catch (error) {
      console.log(error);
      OpenAlert(false, "Houve um erro no cadastro do hotel!");
    }
  }

  function editHotel(hotel) {
    try {
      const clone = [...getHotels()];
      const htIndex = clone.findIndex((h) => h.id === hotel.id);
      if (htIndex !== -1) {
        clone.splice(htIndex, 1, hotel);
        localStorage.setItem("hotels", JSON.stringify(clone));
        setHotels(clone);
        OpenAlert(true, "Edição do hotel concluída com sucesso!");
      } else {
        OpenAlert(false, "Hotel não encontrado para realizar a edição!");
      }
    } catch (error) {
      console.log(error);
      OpenAlert(false, "Houve um erro na edição do hotel!");
    }
  }

  function removeHotel(hotel) {
    try {
      const filtered = getHotels().filter((ht) => ht.id !== hotel.id);
      localStorage.setItem("hotels", JSON.stringify(filtered));
      setHotels(filtered);
      OpenAlert(true, "Remoção do hotel concluída com sucesso!");
    } catch (error) {
      console.log(error);
      OpenAlert(false, "Houve um erro na remoção do hotel!");
    }
  }

  function resetFilters() {
    //setPageIndex(1);
    setIsFavoriteOnly(false);
    setFilterOrder("");
    setFilterName("");
  }

  function resetModal() {
    setModalVisibility(false);
    setIsModalEdit(false);
    setHotel({
      id: nanoid(),
      name: "",
      description: "",
      img: "",
      imgExtra1: "",
      imgExtra2: "",
      imgExtra3: "",
      imgExtra4: "",
      dailyRate: 0,
      city: "",
      state: "",
      classification: 0,
      isFavorite: false,
    });
    setHotelErrors({
      nameError: "",
      imgError: "",
      dailyRateError: "",
      cityError: "",
      stateError: "",
    });
  }

  function validateModal() {
    let isValid = true;
    let error = {
      nameError: "",
      imgError: "",
      dailyRateError: "",
      cityError: "",
      stateError: "",
    };

    if (hotel.name.trim().length === 0) {
      error.nameError = "O nome do hotel é obrigatório";
      isValid = false;
    }

    if (hotel.img.trim().length === 0) {
      error.imgError = "A imagem (url) do hotel é obrigatória";
      isValid = false;
    }

    if (hotel.city.trim().length === 0) {
      error.cityError = "A cidade do hotel é obrigatória";
      isValid = false;
    }

    if (hotel.state.trim().length === 0) {
      error.stateError = "O estado do hotel é obrigatório";
      isValid = false;
    }

    if (hotel.dailyRate < 0 || isNaN(hotel.dailyRate)) {
      error.dailyRateError =
        "O valor da diaria do hotel é obrigatório e deve ser um valor númerico maior ou igual a zero";
      isValid = false;
    }

    setHotelErrors(error);
    return isValid;
  }

  function saveModal() {
    let isValid = validateModal();

    if (isValid) {
      const clone = { ...hotel };

      if (isModalEdit) {
        editHotel(clone);
      } else {
        addHotel(clone);
      }

      resetModal();
    }
  }

  function showModal(hotel) {
    resetFilters();
    setIsModalEdit(hotel != null ? true : false);
    setModalVisibility(true);
    if (hotel) {
      setHotel(hotel);
    }
  }

  function OpenAlert(isSucess, text) {
    alert.current?.openAlert(isSucess, text);
  }

  useEffect(() => {
    let filtered = getHotels();

    if (filterName.length > 0) {
      filtered = filtered.filter((ht) =>
        ht.name.toLowerCase().includes(filterName.trim().toLowerCase())
      );
    }

    if (isFavoriteOnly) {
      filtered = filtered.filter((ht) => ht.isFavorite);
    }

    if (filterOrder.length > 0) {
      switch (filterOrder) {
        case "classification-desc":
          filtered = filtered.sort(
            (a, b) => b.classification - a.classification
          );
          break;
        case "classification-asc":
          filtered = filtered.sort(
            (a, b) => a.classification - b.classification
          );
          break;
        case "daily-desc":
          filtered = filtered.sort((a, b) => b.dailyRate - a.dailyRate);
          break;
        case "daily-asc":
          filtered = filtered.sort((a, b) => a.dailyRate - b.dailyRate);
          break;
        case "name-desc":
          filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "name-asc":
          filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          break;
      }
    }

    filtered = filtered.filter((ht, index) => index < pageSize);

    setPageIndex(1);
    setHotels(filtered);
  }, [filterName, isFavoriteOnly, filterOrder]);

  useEffect(() => {
    let filtered = getHotels();

    if (filterName.length > 0) {
      filtered = filtered.filter((ht) =>
        ht.name.toLowerCase().includes(filterName.trim().toLowerCase())
      );
    }

    if (isFavoriteOnly) {
      filtered = filtered.filter((ht) => ht.isFavorite);
    }

    if (filterOrder.length > 0) {
      switch (filterOrder) {
        case "classification-desc":
          filtered = filtered.sort(
            (a, b) => b.classification - a.classification
          );
          break;
        case "classification-asc":
          filtered = filtered.sort(
            (a, b) => a.classification - b.classification
          );
          break;
        case "daily-desc":
          filtered = filtered.sort((a, b) => b.dailyRate - a.dailyRate);
          break;
        case "daily-asc":
          filtered = filtered.sort((a, b) => a.dailyRate - b.dailyRate);
          break;
        case "name-desc":
          filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "name-asc":
          filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          break;
      }
    }
    const indexInit = (pageIndex - 1) * pageSize;
    const indexFinal = indexInit + pageSize;

    filtered = filtered.filter(
      (ht, index) => index >= indexInit && index < indexFinal
    );

    setHotels(filtered);
  }, [pageIndex]);

  return (
    <div id={style.home_card}>
      <IoMdAddCircleOutline
        id={style.home_add_button}
        onClick={() => showModal()}
      />
      <input
        type="text"
        id={style.home_filter}
        value={filterName}
        onChange={(ev) => setFilterName(ev.target.value)}
      />

      <select
        id={style.home_filter_order}
        value={filterOrder}
        onChange={(ev) => setFilterOrder(ev.target.value)}
      >
        <option value="">Selecione um método de ordenação</option>
        <option value="classification-desc">Classificação DESC</option>
        <option value="classification-asc">Classificação ASC</option>
        <option value="daily-desc">Diária DESC</option>
        <option value="daily-asc">Diária ASC</option>
        <option value="name-desc">Nome DESC</option>
        <option value="name-asc">Nome ASC</option>
      </select>

      <div className={style.filter_form_control}>
        <label htmlFor={style.home_filter_favorite}>Apenas Favoritos</label>
        <Checkbox
          id={style.home_filter_favorite}
          value={isFavoriteOnly}
          onChange={(ev) => setIsFavoriteOnly(ev.target.checked)}
          sx={{
            color: "var(--text-color)",
            "&.Mui-checked": {
              color: "var(--text-color)",
            },
          }}
        />
      </div>

      <div id={style.home_list}>
        {hotels.length > 0 ? (
          hotels.map((h) => (
            <Card
              key={h.id}
              hotel={h}
              showModal={showModal}
              editHotel={(ht) => {
                resetFilters();
                editHotel(ht);
              }}
              removeHotel={(ht) => {
                resetFilters();
                removeHotel(ht);
              }}
            />
          ))
        ) : (
          <div id={style.home_empty_list}>Lista de hotéis vazia</div>
        )}
      </div>
      {hotels.length >= pageSize ? (
        <Pagination
          size="large"
          id={style.home_list_pagination}
          count={Math.ceil(hotels.length / pageSize)}
          page={pageIndex}
          onChange={(event, page) => setPageIndex(page)}
        />
      ) : null}

      <Modal
        animationDuration={800}
        center
        open={modalVisibility}
        closeOnEsc={false}
        closeOnOverlayClick={false}
        onClose={resetModal}
      >
        <div className={style.modal_container}>
          <div className={style.modal_form_control}>
            <label htmlFor={style.modal_name}>Nome</label>
            <input
              id={style.modal_name}
              type="text"
              value={hotel.name}
              onChange={(ev) => setHotel({ ...hotel, name: ev.target.value })}
            />
            <span className={style.modal_error}>{hotelErrors.nameError}</span>
          </div>
          <div className={style.modal_form_control}>
            <label htmlFor={style.modal_dailyRate}>Diaria (R$)</label>
            <input
              id={style.modal_dailyRate}
              type="number"
              value={hotel.dailyRate}
              onChange={(ev) =>
                setHotel({ ...hotel, dailyRate: Number(ev.target.value) })
              }
            />
            <span className={style.modal_error}>
              {hotelErrors.dailyRateError}
            </span>
          </div>
          <div className={style.modal_form_control}>
            <label htmlFor={style.modal_city}>Cidade</label>
            <input
              id={style.modal_city}
              type="text"
              value={hotel.city}
              onChange={(ev) => setHotel({ ...hotel, city: ev.target.value })}
            />
            <span className={style.modal_error}>{hotelErrors.cityError}</span>
          </div>
          <div className={style.modal_form_control}>
            <label htmlFor={style.modal_state}>Estado</label>
            <select
              id={style.modal_state}
              value={hotel.state}
              onChange={(ev) => setHotel({ ...hotel, state: ev.target.value })}
            >
              <option value="">Selecione um estado</option>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </select>
            <span className={style.modal_error}>{hotelErrors.stateError}</span>
          </div>
          <div className={`${style.modal_form_control}`}>
            <label htmlFor={style.modal_classification}>Classificação</label>
            <Rating
              id={style.modal_classification}
              value={hotel.classification}
              precision={1}
              onChange={(ev, value) =>
                setHotel({ ...hotel, classification: value })
              }
            />
          </div>
          <div className={`${style.modal_form_control}`}>
            <label htmlFor={style.modal_img}>Imagem (Url)</label>
            <input
              id={style.modal_img}
              type="url"
              value={hotel.img}
              onChange={(ev) => setHotel({ ...hotel, img: ev.target.value })}
            />
            <span className={style.modal_error}>{hotelErrors.imgError}</span>
          </div>
          <div className={`${style.modal_form_control}`}>
            <label htmlFor={style.modal_img_ex1}>Extra IMG 1 (Url)</label>
            <input
              id={style.modal_img_ex1}
              type="url"
              value={hotel.imgExtra1}
              onChange={(ev) =>
                setHotel({ ...hotel, imgExtra1: ev.target.value })
              }
            />
          </div>
          <div className={`${style.modal_form_control}`}>
            <label htmlFor={style.modal_img_ex2}>Extra IMG 2 (Url)</label>
            <input
              id={style.modal_img_ex2}
              type="url"
              value={hotel.imgExtra2}
              onChange={(ev) =>
                setHotel({ ...hotel, imgExtra2: ev.target.value })
              }
            />
          </div>
          <div className={`${style.modal_form_control}`}>
            <label htmlFor={style.modal_img_ex3}>Extra IMG 3 (Url)</label>
            <input
              id={style.modal_img_ex3}
              type="url"
              value={hotel.imgExtra3}
              onChange={(ev) =>
                setHotel({ ...hotel, imgExtra3: ev.target.value })
              }
            />
          </div>
          <div className={`${style.modal_form_control}`}>
            <label htmlFor={style.modal_img_ex4}>Extra IMG 4 (Url)</label>
            <input
              id={style.modal_img_ex4}
              type="url"
              value={hotel.imgExtra4}
              onChange={(ev) =>
                setHotel({ ...hotel, imgExtra4: ev.target.value })
              }
            />
          </div>
          <div className={`${style.modal_form_control} ${style.textarea}`}>
            <label htmlFor={style.modal_description}>Descrição</label>
            <textarea
              id={style.modal_description}
              value={hotel.description}
              onChange={(ev) =>
                setHotel({ ...hotel, description: ev.target.value })
              }
            />
          </div>
          <div className={style.modal_actions}>
            <button onClick={saveModal}>Salvar</button>
            <button onClick={resetModal}>Cancelar</button>
          </div>
        </div>
      </Modal>

      <Alert ref={alert} />
    </div>
  );
}
