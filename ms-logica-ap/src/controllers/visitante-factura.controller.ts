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
  Visitante,
  Factura,
} from '../models';
import {VisitanteRepository} from '../repositories';

export class VisitanteFacturaController {
  constructor(
    @repository(VisitanteRepository) protected visitanteRepository: VisitanteRepository,
  ) { }

  @get('/visitantes/{id}/facturas', {
    responses: {
      '200': {
        description: 'Array of Visitante has many Factura',
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
    return this.visitanteRepository.facturas(id).find(filter);
  }

  @post('/visitantes/{id}/facturas', {
    responses: {
      '200': {
        description: 'Visitante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Factura)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Visitante.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {
            title: 'NewFacturaInVisitante',
            exclude: ['id'],
            optional: ['visitanteId']
          }),
        },
      },
    }) factura: Omit<Factura, 'id'>,
  ): Promise<Factura> {
    return this.visitanteRepository.facturas(id).create(factura);
  }

  @patch('/visitantes/{id}/facturas', {
    responses: {
      '200': {
        description: 'Visitante.Factura PATCH success count',
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
    return this.visitanteRepository.facturas(id).patch(factura, where);
  }

  @del('/visitantes/{id}/facturas', {
    responses: {
      '200': {
        description: 'Visitante.Factura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.visitanteRepository.facturas(id).delete(where);
  }
}
