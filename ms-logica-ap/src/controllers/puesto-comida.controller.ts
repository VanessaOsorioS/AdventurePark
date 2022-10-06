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
import {PuestoComida} from '../models';
import {PuestoComidaRepository} from '../repositories';

export class PuestoComidaController {
  constructor(
    @repository(PuestoComidaRepository)
    public puestoComidaRepository : PuestoComidaRepository,
  ) {}

  @post('/puestoComida')
  @response(200, {
    description: 'PuestoComida model instance',
    content: {'application/json': {schema: getModelSchemaRef(PuestoComida)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PuestoComida, {
            title: 'NewPuestoComida',
            exclude: ['id'],
          }),
        },
      },
    })
    puestoComida: Omit<PuestoComida, 'id'>,
  ): Promise<PuestoComida> {
    return this.puestoComidaRepository.create(puestoComida);
  }

  @get('/puestoComida/count')
  @response(200, {
    description: 'PuestoComida model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PuestoComida) where?: Where<PuestoComida>,
  ): Promise<Count> {
    return this.puestoComidaRepository.count(where);
  }

  @get('/puestoComida')
  @response(200, {
    description: 'Array of PuestoComida model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PuestoComida, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PuestoComida) filter?: Filter<PuestoComida>,
  ): Promise<PuestoComida[]> {
    return this.puestoComidaRepository.find(filter);
  }

  @patch('/puestoComida')
  @response(200, {
    description: 'PuestoComida PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PuestoComida, {partial: true}),
        },
      },
    })
    puestoComida: PuestoComida,
    @param.where(PuestoComida) where?: Where<PuestoComida>,
  ): Promise<Count> {
    return this.puestoComidaRepository.updateAll(puestoComida, where);
  }

  @get('/puestoComida/{id}')
  @response(200, {
    description: 'PuestoComida model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PuestoComida, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PuestoComida, {exclude: 'where'}) filter?: FilterExcludingWhere<PuestoComida>
  ): Promise<PuestoComida> {
    return this.puestoComidaRepository.findById(id, filter);
  }

  @patch('/puestoComida/{id}')
  @response(204, {
    description: 'PuestoComida PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PuestoComida, {partial: true}),
        },
      },
    })
    puestoComida: PuestoComida,
  ): Promise<void> {
    await this.puestoComidaRepository.updateById(id, puestoComida);
  }

  @put('/puestoComida/{id}')
  @response(204, {
    description: 'PuestoComida PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() puestoComida: PuestoComida,
  ): Promise<void> {
    await this.puestoComidaRepository.replaceById(id, puestoComida);
  }

  @del('/puestoComida/{id}')
  @response(204, {
    description: 'PuestoComida DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.puestoComidaRepository.deleteById(id);
  }
}
