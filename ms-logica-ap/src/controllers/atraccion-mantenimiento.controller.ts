import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Atraccion,
  Mantenimiento,
} from '../models';
import {AtraccionRepository} from '../repositories';

export class AtraccionMantenimientoController {
  constructor(
    @repository(AtraccionRepository) protected atraccionRepository: AtraccionRepository,
  ) { }

  @get('/atraccions/{id}/mantenimientos', {
    responses: {
      '200': {
        description: 'Array of Atraccion has many Mantenimiento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mantenimiento)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Mantenimiento>,
  ): Promise<Mantenimiento[]> {
    return this.atraccionRepository.mantenimientos(id).find(filter);
  }

  @post('/atraccions/{id}/mantenimientos', {
    responses: {
      '200': {
        description: 'Atraccion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mantenimiento)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Atraccion.prototype.codigo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mantenimiento, {
            title: 'NewMantenimientoInAtraccion',
            exclude: ['id'],
            optional: ['atraccionId']
          }),
        },
      },
    }) mantenimiento: Omit<Mantenimiento, 'id'>,
  ): Promise<Mantenimiento> {
    return this.atraccionRepository.mantenimientos(id).create(mantenimiento);
  }

  @patch('/atraccions/{id}/mantenimientos', {
    responses: {
      '200': {
        description: 'Atraccion.Mantenimiento PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mantenimiento, {partial: true}),
        },
      },
    })
    mantenimiento: Partial<Mantenimiento>,
    @param.query.object('where', getWhereSchemaFor(Mantenimiento)) where?: Where<Mantenimiento>,
  ): Promise<Count> {
    return this.atraccionRepository.mantenimientos(id).patch(mantenimiento, where);
  }

  @del('/atraccions/{id}/mantenimientos', {
    responses: {
      '200': {
        description: 'Atraccion.Mantenimiento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Mantenimiento)) where?: Where<Mantenimiento>,
  ): Promise<Count> {
    return this.atraccionRepository.mantenimientos(id).delete(where);
  }
}
