import {Entity, model, property, hasMany} from '@loopback/repository';
import {Mantenimiento} from './mantenimiento.model';

@model()
export class TipoMantenimiento extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @hasMany(() => Mantenimiento)
  mantenimientos: Mantenimiento[];

  constructor(data?: Partial<TipoMantenimiento>) {
    super(data);
  }
}

export interface TipoMantenimientoRelations {
  // describe navigational properties here
}

export type TipoMantenimientoWithRelations = TipoMantenimiento & TipoMantenimientoRelations;
