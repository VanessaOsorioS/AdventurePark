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
import {CodigosAutenticacion} from '../models';
import {CodigosAutenticacionRepository} from '../repositories';

export class CodigosAutenticacionController {
  constructor(
    @repository(CodigosAutenticacionRepository)
    public codigosAutenticacionRepository : CodigosAutenticacionRepository,
  ) {}

  @post('/codigos-autenticacion')
  @response(200, {
    description: 'CodigosAutenticacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(CodigosAutenticacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CodigosAutenticacion, {
            title: 'NewCodigosAutenticacion',
            exclude: ['_id'],
          }),
        },
      },
    })
    codigosAutenticacion: Omit<CodigosAutenticacion, '_id'>,
  ): Promise<CodigosAutenticacion> {
    return this.codigosAutenticacionRepository.create(codigosAutenticacion);
  }

  @get('/codigos-autenticacion/count')
  @response(200, {
    description: 'CodigosAutenticacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CodigosAutenticacion) where?: Where<CodigosAutenticacion>,
  ): Promise<Count> {
    return this.codigosAutenticacionRepository.count(where);
  }

  @get('/codigos-autenticacion')
  @response(200, {
    description: 'Array of CodigosAutenticacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CodigosAutenticacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CodigosAutenticacion) filter?: Filter<CodigosAutenticacion>,
  ): Promise<CodigosAutenticacion[]> {
    return this.codigosAutenticacionRepository.find(filter);
  }

  @patch('/codigos-autenticacion')
  @response(200, {
    description: 'CodigosAutenticacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CodigosAutenticacion, {partial: true}),
        },
      },
    })
    codigosAutenticacion: CodigosAutenticacion,
    @param.where(CodigosAutenticacion) where?: Where<CodigosAutenticacion>,
  ): Promise<Count> {
    return this.codigosAutenticacionRepository.updateAll(codigosAutenticacion, where);
  }

  @get('/codigos-autenticacion/{id}')
  @response(200, {
    description: 'CodigosAutenticacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CodigosAutenticacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CodigosAutenticacion, {exclude: 'where'}) filter?: FilterExcludingWhere<CodigosAutenticacion>
  ): Promise<CodigosAutenticacion> {
    return this.codigosAutenticacionRepository.findById(id, filter);
  }

  @patch('/codigos-autenticacion/{id}')
  @response(204, {
    description: 'CodigosAutenticacion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CodigosAutenticacion, {partial: true}),
        },
      },
    })
    codigosAutenticacion: CodigosAutenticacion,
  ): Promise<void> {
    await this.codigosAutenticacionRepository.updateById(id, codigosAutenticacion);
  }

  @put('/codigos-autenticacion/{id}')
  @response(204, {
    description: 'CodigosAutenticacion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() codigosAutenticacion: CodigosAutenticacion,
  ): Promise<void> {
    await this.codigosAutenticacionRepository.replaceById(id, codigosAutenticacion);
  }

  @del('/codigos-autenticacion/{id}')
  @response(204, {
    description: 'CodigosAutenticacion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.codigosAutenticacionRepository.deleteById(id);
  }
}
