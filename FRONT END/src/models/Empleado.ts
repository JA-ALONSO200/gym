// Empleado.ts

export default class Empleado {
  idEmpleado: number | null;
  nombre: string;
  cedula: string;
  telefono: string;
  correoElectronico: string;
  tipoEmpleado: string;
  horarioLaboral: string;
  createdAt: Date | null;
  updatedAt: Date | null;

  constructor(
    idEmpleado: number | null = null,
    nombre: string = '',
    cedula: string = '',
    telefono: string = '',
    correoElectronico: string = '',
    tipoEmpleado: string = '',
    horarioLaboral: string = '',
    createdAt: Date | null = null,
    updatedAt: Date | null = null
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

  static fromApiResponse(data: any): Empleado {
    return new Empleado(
      data.idEmpleado,
      data.nombre,
      data.cedula,
      data.telefono,
      data.correoElectronico,
      data.tipoEmpleado,
      data.horarioLaboral,
      data.createdAt,
      data.updatedAt
    );
  }
}
