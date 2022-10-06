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
import {Mantenimiento} from '../models';
import {MantenimientoRepository} from '../repositories';

export class MantenimientoController {
  constructor(
    @repository(MantenimientoRepository)
    public mantenimientoRepository : MantenimientoRepository,
  ) {}

  @post('/mantenimiento')
  @response(200, {
    description: 'Mantenimiento model instance',
    content: {'application/json': {schema: getModelSchemaRef(Mantenimiento)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mantenimiento, {
            title: 'NewMantenimiento',
            exclude: ['id'],
          }),
        },
      },
    })
    mantenimiento: Omit<Mantenimiento, 'id'>,
  ): Promise<Mantenimiento> {
    return this.mantenimientoRepository.create(mantenimiento);
  }

  @get('/mantenimiento/count')
  @response(200, {
    description: 'Mantenimiento model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Mantenimiento) where?: Where<Mantenimiento>,
  ): Promise<Count> {
    return this.mantenimientoRepository.count(where);
  }

  @get('/mantenimiento')
  @response(200, {
    description: 'Array of Mantenimiento model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Mantenimiento, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Mantenimiento) filter?: Filter<Mantenimiento>,
  ): Promise<Mantenimiento[]> {
    return this.mantenimientoRepository.find(filter);
  }

  @patch('/mantenimiento')
  @response(200, {
    description: 'Mantenimiento PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mantenimiento, {partial: true}),
        },
      },
    })
    mantenimiento: Mantenimiento,
    @param.where(Mantenimiento) where?: Where<Mantenimiento>,
  ): Promise<Count> {
    return this.mantenimientoRepository.updateAll(mantenimiento, where);
  }

  @get('/mantenimiento/{id}')
  @response(200, {
    description: 'Mantenimiento model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Mantenimiento, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Mantenimiento, {exclude: 'where'}) filter?: FilterExcludingWhere<Mantenimiento>
  ): Promise<Mantenimiento> {
    return this.mantenimientoRepository.findById(id, filter);
  }

  @patch('/mantenimiento/{id}')
  @response(204, {
    description: 'Mantenimiento PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mantenimiento, {partial: true}),
        },
      },
    })
    mantenimiento: Mantenimiento,
  ): Promise<void> {
    await this.mantenimientoRepository.updateById(id, mantenimiento);
  }

  @put('/mantenimiento/{id}')
  @response(204, {
    description: 'Mantenimiento PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() mantenimiento: Mantenimiento,
  ): Promise<void> {
    await this.mantenimientoRepository.replaceById(id, mantenimiento);
  }

  @del('/mantenimiento/{id}')
  @response(204, {
    description: 'Mantenimiento DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.mantenimientoRepository.deleteById(id);
  }
}
