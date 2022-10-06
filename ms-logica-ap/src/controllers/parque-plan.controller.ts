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
  Parque,
  Plan,
} from '../models';
import {ParqueRepository} from '../repositories';

export class ParquePlanController {
  constructor(
    @repository(ParqueRepository) protected parqueRepository: ParqueRepository,
  ) { }

  @get('/parques/{id}/plans', {
    responses: {
      '200': {
        description: 'Array of Parque has many Plan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plan)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Plan>,
  ): Promise<Plan[]> {
    return this.parqueRepository.planes(id).find(filter);
  }

  @post('/parques/{id}/plans', {
    responses: {
      '200': {
        description: 'Parque model instance',
        content: {'application/json': {schema: getModelSchemaRef(Plan)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Parque.prototype.codigo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plan, {
            title: 'NewPlanInParque',
            exclude: ['codigo'],
            optional: ['parqueId']
          }),
        },
      },
    }) plan: Omit<Plan, 'codigo'>,
  ): Promise<Plan> {
    return this.parqueRepository.planes(id).create(plan);
  }

  @patch('/parques/{id}/plans', {
    responses: {
      '200': {
        description: 'Parque.Plan PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plan, {partial: true}),
        },
      },
    })
    plan: Partial<Plan>,
    @param.query.object('where', getWhereSchemaFor(Plan)) where?: Where<Plan>,
  ): Promise<Count> {
    return this.parqueRepository.planes(id).patch(plan, where);
  }

  @del('/parques/{id}/plans', {
    responses: {
      '200': {
        description: 'Parque.Plan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Plan)) where?: Where<Plan>,
  ): Promise<Count> {
    return this.parqueRepository.planes(id).delete(where);
  }
}
