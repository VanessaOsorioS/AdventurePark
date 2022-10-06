import {Entity, model, property} from '@loopback/repository';

@model()
export class Mantenimiento extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;


  constructor(data?: Partial<Mantenimiento>) {
    super(data);
  }
}

export interface MantenimientoRelations {
  // describe navigational properties here
}

export type MantenimientoWithRelations = Mantenimiento & MantenimientoRelations;
