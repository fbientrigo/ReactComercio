import "./style.css";
import {SliderData} from "./SliderData";
import React, {useState} from "react";
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from "react-icons/fa";
import {FaPlayCircle} from "react-icons/fa";

const ImageSlider = ({slides}) => {
  // Funcion Slider para ir cambiando como un Carrusel las imagenes que vemos
  // esto va junto al titulo de TodoCel

  // todo lo relacionado a la funcion Sliding
  const [current, setCurrent] = useState(0)
  const length = slides.length;

  // Cambiar las imagenes
  const nextSlide = () => {
    //si es que estamos en la ultima imagen -> setCurrent(0)
    // si no es asi, osea False -> setCurrent(current + 1)
    setCurrent(current == length - 1 ? 0: current + 1)
  }

  return (
    <section className="reel">
      <FaArrowAltCircleLeft className="left-arrow"  />
      <FaPlayCircle className="right-arrow" onClick={nextSlide} />
      {SliderData.map( (slide, index) => {
          return(
            <div className={index === current ? 'slide-active' : 'slide'} key={index}>
              {index === current ? <img src={slide.image} alt="imagenes top" className="image" /> : console.log("21")}
            </div>
          )
          
        }) }

    </section>
  )
}

export default ImageSlider
