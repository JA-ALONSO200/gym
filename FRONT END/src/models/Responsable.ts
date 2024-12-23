export default class Responsable {
    idResponsable: number | null;
    nombre: string;
    cedula: string;
    telefono: string;
    correoElectronico: string;
    createdAt: Date | null;
    updatedAt: Date | null;
  
    constructor(
      idResponsable: number | null = null,
      nombre: string = '',
      cedula: string = '',
      telefono: string = '',
      correoElectronico: string = '',
      createdAt: Date | null = null,
      updatedAt: Date | null = null
    ) {
      this.idResponsable = idResponsable;
      this.nombre = nombre;
      this.cedula = cedula;
      this.telefono = telefono;
      this.correoElectronico = correoElectronico;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  
    static fromApiResponse(data: any): Responsable {
      return new Responsable(
        data.idResponsable,
        data.nombre,
        data.cedula,
        data.telefono,
        data.correoElectronico,
        data.createdAt,
        data.updatedAt
      );
    }
  }