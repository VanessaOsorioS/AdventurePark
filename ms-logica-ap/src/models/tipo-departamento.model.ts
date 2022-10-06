import {Entity, model, property} from '@loopback/repository';

@model()
export class TipoDepartamento extends Entity {
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


  constructor(data?: Partial<TipoDepartamento>) {
    super(data);
  }
}

export interface TipoDepartamentoRelations {
  // describe navigational properties here
}

export type TipoDepartamentoWithRelations = TipoDepartamento & TipoDepartamentoRelations;
