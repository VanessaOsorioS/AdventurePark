import {Entity, model, property, hasMany} from '@loopback/repository';
import {Plan} from './plan.model';
import {Zona} from './zona.model';

@model()
export class Parque extends Entity {
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
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'number',
    required: true,
  })
  cantMaxVisitantes: number;

  @property({
    type: 'string',
  })
  logo?: string;

  @property({
    type: 'string',
  })
  mapa?: string;

  @property({
    type: 'string',
    required: true,
  })
  eslogan: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @property({
    type: 'number',
  })
  ciudadId?: number;

  @hasMany(() => Plan)
  planes: Plan[];

  @hasMany(() => Zona)
  zonas: Zona[];

  constructor(data?: Partial<Parque>) {
    super(data);
  }
}

export interface ParqueRelations {
  // describe navigational properties here
}

export type ParqueWithRelations = Parque & ParqueRelations;
