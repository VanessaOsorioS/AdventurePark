import {Entity, model, property} from '@loopback/repository';

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
    required:true,
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


  constructor(data?: Partial<Zona>) {
    super(data);
  }
}

export interface ZonaRelations {
  // describe navigational properties here
}

export type ZonaWithRelations = Zona & ZonaRelations;
