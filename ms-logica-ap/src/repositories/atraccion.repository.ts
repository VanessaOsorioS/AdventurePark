import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Atraccion, AtraccionRelations, Mantenimiento} from '../models';
import {MantenimientoRepository} from './mantenimiento.repository';

export class AtraccionRepository extends DefaultCrudRepository<
  Atraccion,
  typeof Atraccion.prototype.codigo,
  AtraccionRelations
> {

  public readonly mantenimientos: HasManyRepositoryFactory<Mantenimiento, typeof Atraccion.prototype.codigo>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('MantenimientoRepository') protected mantenimientoRepositoryGetter: Getter<MantenimientoRepository>,
  ) {
    super(Atraccion, dataSource);
    this.mantenimientos = this.createHasManyRepositoryFactoryFor('mantenimientos', mantenimientoRepositoryGetter,);
    this.registerInclusionResolver('mantenimientos', this.mantenimientos.inclusionResolver);
  }
}
