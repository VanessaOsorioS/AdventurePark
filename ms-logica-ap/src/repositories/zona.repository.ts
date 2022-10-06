import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Zona, ZonaRelations, PuestoComida, Atraccion} from '../models';
import {PuestoComidaRepository} from './puesto-comida.repository';
import {AtraccionRepository} from './atraccion.repository';

export class ZonaRepository extends DefaultCrudRepository<
  Zona,
  typeof Zona.prototype.codigo,
  ZonaRelations
> {

  public readonly puestosDeComida: HasManyRepositoryFactory<PuestoComida, typeof Zona.prototype.codigo>;

  public readonly atracciones: HasManyRepositoryFactory<Atraccion, typeof Zona.prototype.codigo>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PuestoComidaRepository') protected puestoComidaRepositoryGetter: Getter<PuestoComidaRepository>, @repository.getter('AtraccionRepository') protected atraccionRepositoryGetter: Getter<AtraccionRepository>,
  ) {
    super(Zona, dataSource);
    this.atracciones = this.createHasManyRepositoryFactoryFor('atracciones', atraccionRepositoryGetter,);
    this.registerInclusionResolver('atracciones', this.atracciones.inclusionResolver);
    this.puestosDeComida = this.createHasManyRepositoryFactoryFor('puestosDeComida', puestoComidaRepositoryGetter,);
    this.registerInclusionResolver('puestosDeComida', this.puestosDeComida.inclusionResolver);
  }
}
