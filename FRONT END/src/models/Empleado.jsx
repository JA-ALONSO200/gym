export default class Empleado {
    constructor(
      idEmpleado = null,
      nombre = '',
      cedula = '',
      telefono = '',
      correoElectronico = '',
      tipoEmpleado = '',
      horarioLaboral = '',
      createdAt = null,
      updatedAt = null
    ) {
      this.idEmpleado = idEmpleado;
      this.nombre = nombre;
      this.cedula = cedula;
      this.telefono = telefono;
      this.correoElectronico = correoElectronico;
      this.tipoEmpleado = tipoEmpleado;
      this.horarioLaboral = horarioLaboral;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }

  }
  