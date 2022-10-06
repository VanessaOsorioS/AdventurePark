import {Entity, model, property, hasMany} from '@loopback/repository';
import {PuestoComida} from './puesto-comida.model';
import {Atraccion} from './atraccion.model';

@model()
export class Zona extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  codigo: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre?: string;

  @property({
    type: 'string',
  })
  color?: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
  })
  parqueId?: number;

  @hasMany(() => PuestoComida)
  puestosDeComida: PuestoComida[];

  @hasMany(() => Atraccion)
  atracciones: Atraccion[];

  constructor(data?: Partial<Zona>) {
    super(data);
  }
}

export interface ZonaRelations {
  // describe navigational properties here
}

export type ZonaWithRelations = Zona & ZonaRelations;
