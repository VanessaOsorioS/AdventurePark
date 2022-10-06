import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<TipoMantenimiento>) {
    super(data);
  }
}

export interface TipoMantenimientoRelations {
  // describe navigational properties here
}

export type TipoMantenimientoWithRelations = TipoMantenimiento & TipoMantenimientoRelations;
