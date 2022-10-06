import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {TipoMantenimiento} from '../models';
import {TipoMantenimientoRepository} from '../repositories';

export class TipomantenimientoController {
  constructor(
    @repository(TipoMantenimientoRepository)
    public tipoMantenimientoRepository : TipoMantenimientoRepository,
  ) {}

  @post('/tipomantenimiento')
  @response(200, {
    description: 'TipoMantenimiento model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoMantenimiento)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoMantenimiento, {
            title: 'NewTipoMantenimiento',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoMantenimiento: Omit<TipoMantenimiento, 'od'>,
  ): Promise<TipoMantenimiento> {
    return this.tipoMantenimientoRepository.create(tipoMantenimiento);
  }

  @get('/tipomantenimiento/count')
  @response(200, {
    description: 'TipoMantenimiento model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoMantenimiento) where?: Where<TipoMantenimiento>,
  ): Promise<Count> {
    return this.tipoMantenimientoRepository.count(where);
  }

  @get('/tipomantenimiento')
  @response(200, {
    description: 'Array of TipoMantenimiento model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoMantenimiento, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoMantenimiento) filter?: Filter<TipoMantenimiento>,
  ): Promise<TipoMantenimiento[]> {
    return this.tipoMantenimientoRepository.find(filter);
  }

  @patch('/tipomantenimiento')
  @response(200, {
    description: 'TipoMantenimiento PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoMantenimiento, {partial: true}),
        },
      },
    })
    tipoMantenimiento: TipoMantenimiento,
    @param.where(TipoMantenimiento) where?: Where<TipoMantenimiento>,
  ): Promise<Count> {
    return this.tipoMantenimientoRepository.updateAll(tipoMantenimiento, where);
  }

  @get('/tipomantenimiento/{id}')
  @response(200, {
    description: 'TipoMantenimiento model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoMantenimiento, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TipoMantenimiento, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoMantenimiento>
  ): Promise<TipoMantenimiento> {
    return this.tipoMantenimientoRepository.findById(id, filter);
  }

  @patch('/tipomantenimiento/{id}')
  @response(204, {
    description: 'TipoMantenimiento PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoMantenimiento, {partial: true}),
        },
      },
    })
    tipoMantenimiento: TipoMantenimiento,
  ): Promise<void> {
    await this.tipoMantenimientoRepository.updateById(id, tipoMantenimiento);
  }

  @put('/tipomantenimiento/{id}')
  @response(204, {
    description: 'TipoMantenimiento PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tipoMantenimiento: TipoMantenimiento,
  ): Promise<void> {
    await this.tipoMantenimientoRepository.replaceById(id, tipoMantenimiento);
  }

  @del('/tipomantenimiento/{id}')
  @response(204, {
    description: 'TipoMantenimiento DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tipoMantenimientoRepository.deleteById(id);
  }
}
