import {Entity, model, property} from '@loopback/repository';

@model()
export class Visitante extends Entity {
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
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;


  constructor(data?: Partial<Visitante>) {
    super(data);
  }
}

export interface VisitanteRelations {
  // describe navigational properties here
}

export type VisitanteWithRelations = Visitante & VisitanteRelations;
