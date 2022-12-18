import { authenticate } from '@loopback/authentication';
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
import {Parque} from '../models';
import {ParqueRepository} from '../repositories';

@authenticate("admin")
export class ParqueController {
  constructor(
    @repository(ParqueRepository)
    public parqueRepository : ParqueRepository,
  ) {}

  @post('/parque')
  @response(200, {
    description: 'Parque model instance',
    content: {'application/json': {schema: getModelSchemaRef(Parque)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parque, {
            title: 'NewParque',
            
          }),
        },
      },
    })
    parque: Parque,
  ): Promise<Parque> {
    return this.parqueRepository.create(parque);
  }

  @get('/parque/count')
  @response(200, {
    description: 'Parque model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Parque) where?: Where<Parque>,
  ): Promise<Count> {
    return this.parqueRepository.count(where);
  }

  @get('/parque')
  @response(200, {
    description: 'Array of Parque model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Parque, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Parque) filter?: Filter<Parque>,
  ): Promise<Parque[]> {
    return this.parqueRepository.find(filter);
  }

  @patch('/parque')
  @response(200, {
    description: 'Parque PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parque, {partial: true}),
        },
      },
    })
    parque: Parque,
    @param.where(Parque) where?: Where<Parque>,
  ): Promise<Count> {
    return this.parqueRepository.updateAll(parque, where);
  }

  @get('/parque/{id}')
  @response(200, {
    description: 'Parque model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Parque, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Parque, {exclude: 'where'}) filter?: FilterExcludingWhere<Parque>
  ): Promise<Parque> {
    return this.parqueRepository.findById(id, filter);
  }

  @patch('/parque/{id}')
  @response(204, {
    description: 'Parque PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parque, {partial: true}),
        },
      },
    })
    parque: Parque,
  ): Promise<void> {
    await this.parqueRepository.updateById(id, parque);
  }

  @put('/parque/{id}')
  @response(204, {
    description: 'Parque PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() parque: Parque,
  ): Promise<void> {
    await this.parqueRepository.replaceById(id, parque);
  }

  @del('/parque/{id}')
  @response(204, {
    description: 'Parque DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.parqueRepository.deleteById(id);
  }
}
