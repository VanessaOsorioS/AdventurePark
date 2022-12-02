import {Entity, model, property} from '@loopback/repository';

@model()
export class CodigosAutenticacion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  id_usuario: string;

  @property({
    type: 'number',
    required: true,
  })
  codigo: number;

  @property({
    type: 'boolean',
    required: true,
  })
  estado: boolean;


  constructor(data?: Partial<CodigosAutenticacion>) {
    super(data);
  }
}

export interface CodigosAutenticacionRelations {
  // describe navigational properties here
}

export type CodigosAutenticacionWithRelations = CodigosAutenticacion & CodigosAutenticacionRelations;
