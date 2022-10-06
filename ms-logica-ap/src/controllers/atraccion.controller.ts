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
import {Atraccion} from '../models';
import {AtraccionRepository} from '../repositories';

export class AtraccionController {
  constructor(
    @repository(AtraccionRepository)
    public atraccionRepository : AtraccionRepository,
  ) {}

  @post('/atraccion')
  @response(200, {
    description: 'Atraccion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Atraccion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atraccion, {
            title: 'NewAtraccion',
            exclude: ['codigo'],
          }),
        },
      },
    })
    atraccion: Omit<Atraccion, 'codigo'>,
  ): Promise<Atraccion> {
    return this.atraccionRepository.create(atraccion);
  }

  @get('/atraccion/count')
  @response(200, {
    description: 'Atraccion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Atraccion) where?: Where<Atraccion>,
  ): Promise<Count> {
    return this.atraccionRepository.count(where);
  }

  @get('/atraccion')
  @response(200, {
    description: 'Array of Atraccion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Atraccion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Atraccion) filter?: Filter<Atraccion>,
  ): Promise<Atraccion[]> {
    return this.atraccionRepository.find(filter);
  }

  @patch('/atraccion')
  @response(200, {
    description: 'Atraccion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atraccion, {partial: true}),
        },
      },
    })
    atraccion: Atraccion,
    @param.where(Atraccion) where?: Where<Atraccion>,
  ): Promise<Count> {
    return this.atraccionRepository.updateAll(atraccion, where);
  }

  @get('/atraccion/{id}')
  @response(200, {
    description: 'Atraccion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Atraccion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Atraccion, {exclude: 'where'}) filter?: FilterExcludingWhere<Atraccion>
  ): Promise<Atraccion> {
    return this.atraccionRepository.findById(id, filter);
  }

  @patch('/atraccion/{id}')
  @response(204, {
    description: 'Atraccion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atraccion, {partial: true}),
        },
      },
    })
    atraccion: Atraccion,
  ): Promise<void> {
    await this.atraccionRepository.updateById(id, atraccion);
  }

  @put('/atraccion/{id}')
  @response(204, {
    description: 'Atraccion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() atraccion: Atraccion,
  ): Promise<void> {
    await this.atraccionRepository.replaceById(id, atraccion);
  }

  @del('/atraccion/{id}')
  @response(204, {
    description: 'Atraccion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.atraccionRepository.deleteById(id);
  }
}
