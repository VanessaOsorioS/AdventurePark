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
  Plan,
  Factura,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanFacturaController {
  constructor(
    @repository(PlanRepository) protected planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/facturas', {
    responses: {
      '200': {
        description: 'Array of Plan has many Factura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Factura)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Factura>,
  ): Promise<Factura[]> {
    return this.planRepository.facturas(id).find(filter);
  }

  @post('/plans/{id}/facturas', {
    responses: {
      '200': {
        description: 'Plan model instance',
        content: {'application/json': {schema: getModelSchemaRef(Factura)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Plan.prototype.codigo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {
            title: 'NewFacturaInPlan',
            exclude: ['id'],
            optional: ['planId']
          }),
        },
      },
    }) factura: Omit<Factura, 'id'>,
  ): Promise<Factura> {
    return this.planRepository.facturas(id).create(factura);
  }

  @patch('/plans/{id}/facturas', {
    responses: {
      '200': {
        description: 'Plan.Factura PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {partial: true}),
        },
      },
    })
    factura: Partial<Factura>,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.planRepository.facturas(id).patch(factura, where);
  }

  @del('/plans/{id}/facturas', {
    responses: {
      '200': {
        description: 'Plan.Factura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.planRepository.facturas(id).delete(where);
  }
}
