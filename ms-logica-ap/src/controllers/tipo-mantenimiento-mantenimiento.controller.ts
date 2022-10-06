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
  TipoMantenimiento,
  Mantenimiento,
} from '../models';
import {TipoMantenimientoRepository} from '../repositories';

export class TipoMantenimientoMantenimientoController {
  constructor(
    @repository(TipoMantenimientoRepository) protected tipoMantenimientoRepository: TipoMantenimientoRepository,
  ) { }

  @get('/tipo-mantenimientos/{id}/mantenimientos', {
    responses: {
      '200': {
        description: 'Array of TipoMantenimiento has many Mantenimiento',
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
    return this.tipoMantenimientoRepository.mantenimientos(id).find(filter);
  }

  @post('/tipo-mantenimientos/{id}/mantenimientos', {
    responses: {
      '200': {
        description: 'TipoMantenimiento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mantenimiento)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TipoMantenimiento.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mantenimiento, {
            title: 'NewMantenimientoInTipoMantenimiento',
            exclude: ['id'],
            optional: ['tipoMantenimientoId']
          }),
        },
      },
    }) mantenimiento: Omit<Mantenimiento, 'id'>,
  ): Promise<Mantenimiento> {
    return this.tipoMantenimientoRepository.mantenimientos(id).create(mantenimiento);
  }

  @patch('/tipo-mantenimientos/{id}/mantenimientos', {
    responses: {
      '200': {
        description: 'TipoMantenimiento.Mantenimiento PATCH success count',
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
    return this.tipoMantenimientoRepository.mantenimientos(id).patch(mantenimiento, where);
  }

  @del('/tipo-mantenimientos/{id}/mantenimientos', {
    responses: {
      '200': {
        description: 'TipoMantenimiento.Mantenimiento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Mantenimiento)) where?: Where<Mantenimiento>,
  ): Promise<Count> {
    return this.tipoMantenimientoRepository.mantenimientos(id).delete(where);
  }
}
