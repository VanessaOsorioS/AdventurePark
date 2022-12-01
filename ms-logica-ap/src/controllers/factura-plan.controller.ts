import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Factura,
  Plan,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaPlanController {
  constructor(
    @repository(FacturaRepository)
    public facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/plan', {
    responses: {
      '200': {
        description: 'Plan belonging to Factura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plan)},
          },
        },
      },
    },
  })
  async getPlan(
    @param.path.number('id') id: typeof Factura.prototype.id,
  ): Promise<Plan> {
    return this.facturaRepository.plan(id);
  }
}
