import {Entity, model, property} from '@loopback/repository';

@model()
export class Plan extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
  })
  color?: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'number',
  })
  parqueId?: number;

  @property({
    type: 'number',
  })
  facturaId?: number;

  constructor(data?: Partial<Plan>) {
    super(data);
  }
}

export interface PlanRelations {
  // describe navigational properties here
}

export type PlanWithRelations = Plan & PlanRelations;
