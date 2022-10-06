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
  Zona,
} from '../models';
import {ParqueRepository} from '../repositories';

export class ParqueZonaController {
  constructor(
    @repository(ParqueRepository) protected parqueRepository: ParqueRepository,
  ) { }

  @get('/parques/{id}/zonas', {
    responses: {
      '200': {
        description: 'Array of Parque has many Zona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Zona)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Zona>,
  ): Promise<Zona[]> {
    return this.parqueRepository.zonas(id).find(filter);
  }

  @post('/parques/{id}/zonas', {
    responses: {
      '200': {
        description: 'Parque model instance',
        content: {'application/json': {schema: getModelSchemaRef(Zona)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Parque.prototype.codigo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Zona, {
            title: 'NewZonaInParque',
            exclude: ['codigo'],
            optional: ['parqueId']
          }),
        },
      },
    }) zona: Omit<Zona, 'codigo'>,
  ): Promise<Zona> {
    return this.parqueRepository.zonas(id).create(zona);
  }

  @patch('/parques/{id}/zonas', {
    responses: {
      '200': {
        description: 'Parque.Zona PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Zona, {partial: true}),
        },
      },
    })
    zona: Partial<Zona>,
    @param.query.object('where', getWhereSchemaFor(Zona)) where?: Where<Zona>,
  ): Promise<Count> {
    return this.parqueRepository.zonas(id).patch(zona, where);
  }

  @del('/parques/{id}/zonas', {
    responses: {
      '200': {
        description: 'Parque.Zona DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Zona)) where?: Where<Zona>,
  ): Promise<Count> {
    return this.parqueRepository.zonas(id).delete(where);
  }
}
