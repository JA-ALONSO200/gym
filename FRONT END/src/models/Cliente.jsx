class Cliente {
  constructor({ idCliente, nombre, cedula, telefono, correoElectronico, edad, estatura, responsable, createdAt, updatedAt }) {
    this.idCliente = idCliente;
    this.nombre = nombre;
    this.cedula = cedula;
    this.telefono = telefono;
    this.correoElectronico = correoElectronico;
    this.edad = edad;
    this.estatura = estatura;
    this.responsable = responsable;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default Cliente;
