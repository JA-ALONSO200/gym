// Equipos.ts

export default class Equipos {
    idEquipoMaquina: number | null;
    nombre: string;
    estado: string;
    descripcion: string;
    createdAt: Date | null;
    updatedAt: Date | null;
  
    constructor(
      idEquipoMaquina: number | null = null,
      nombre: string = '',
      estado: string = '',
      descripcion: string = '',
      createdAt: Date | null = null,
      updatedAt: Date | null = null
    ) {
      this.idEquipoMaquina = idEquipoMaquina;
      this.nombre = nombre;
      this.estado = estado;
      this.descripcion = descripcion;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  
    static fromApiResponse(data: any): Equipos {
      return new Equipos(
        data.idEquipoMaquina,
        data.nombre,
        data.estado,
        data.descripcion,
        data.createdAt,
        data.updatedAt
      );
    }
  }
  