import "../../styles/Login.css";
import Person from "../../assets/file.png";
function Section() {
  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-12 col-md-6 col-lg-5 d-flex justify-content-center">
        <img src={Person} alt="Person" className="img-fluid w-100" />
      </div>
      <div className="col-12 col-md-6 col-lg-7 text-center">
        <h1 className="title-2 mt-5">Hola, Bienvenid@ {localStorage.getItem("User")}</h1>
        <p className="subtitle mt-5">
        <em><b>Bienvenido a <b>FitZone</b>, tu gimnasio de confianza.</b></em> <br/> <br/>
        En <b>FitZone</b>, estamos comprometidos con tu bienestar y transformación. Nuestro espacio está diseñado para brindarte una experiencia única, con equipos de última generación y un equipo de entrenadores profesionales que te apoyarán en cada paso de tu camino hacia una vida más activa y saludable. <br/> <br/>
        Ya sea que estés comenzando tu viaje fitness o buscando nuevos desafíos, en <b>FitZone</b> encontrarás todo lo que necesitas para alcanzar tus metas. Únete a nuestra comunidad y empieza hoy mismo a sentirte mejor, más fuerte y más en forma. ¡Tu mejor versión comienza aquí!
        </p>
        <button className="btn-lg btn btn-dark mt-4">Contactar</button>
      </div>
    </div>
  </div>
  )
}

export default Section