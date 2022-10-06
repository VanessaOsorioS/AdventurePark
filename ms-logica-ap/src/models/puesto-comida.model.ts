import {Entity, model, property} from '@loopback/repository';

@model()
export class PuestoComida extends Entity {
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
  imagen: string;

  @property({
    type: 'string',
    required: true,
  })
  menu: string;


  constructor(data?: Partial<PuestoComida>) {
    super(data);
  }
}

export interface PuestoComidaRelations {
  // describe navigational properties here
}

export type PuestoComidaWithRelations = PuestoComida & PuestoComidaRelations;
