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
  Zona,
  Atraccion,
} from '../models';
import {ZonaRepository} from '../repositories';

export class ZonaAtraccionController {
  constructor(
    @repository(ZonaRepository) protected zonaRepository: ZonaRepository,
  ) { }

  @get('/zonas/{id}/atraccions', {
    responses: {
      '200': {
        description: 'Array of Zona has many Atraccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Atraccion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Atraccion>,
  ): Promise<Atraccion[]> {
    return this.zonaRepository.atracciones(id).find(filter);
  }

  @post('/zonas/{id}/atraccions', {
    responses: {
      '200': {
        description: 'Zona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Atraccion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Zona.prototype.codigo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atraccion, {
            title: 'NewAtraccionInZona',
            exclude: ['codigo'],
            optional: ['zonaId']
          }),
        },
      },
    }) atraccion: Omit<Atraccion, 'codigo'>,
  ): Promise<Atraccion> {
    return this.zonaRepository.atracciones(id).create(atraccion);
  }

  @patch('/zonas/{id}/atraccions', {
    responses: {
      '200': {
        description: 'Zona.Atraccion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atraccion, {partial: true}),
        },
      },
    })
    atraccion: Partial<Atraccion>,
    @param.query.object('where', getWhereSchemaFor(Atraccion)) where?: Where<Atraccion>,
  ): Promise<Count> {
    return this.zonaRepository.atracciones(id).patch(atraccion, where);
  }

  @del('/zonas/{id}/atraccions', {
    responses: {
      '200': {
        description: 'Zona.Atraccion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Atraccion)) where?: Where<Atraccion>,
  ): Promise<Count> {
    return this.zonaRepository.atracciones(id).delete(where);
  }
}
