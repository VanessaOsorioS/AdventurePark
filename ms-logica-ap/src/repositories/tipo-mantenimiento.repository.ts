import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {TipoMantenimiento, TipoMantenimientoRelations, Mantenimiento} from '../models';
import {MantenimientoRepository} from './mantenimiento.repository';

export class TipoMantenimientoRepository extends DefaultCrudRepository<
  TipoMantenimiento,
  typeof TipoMantenimiento.prototype.id,
  TipoMantenimientoRelations
> {

  public readonly mantenimientos: HasManyRepositoryFactory<Mantenimiento, typeof TipoMantenimiento.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('MantenimientoRepository') protected mantenimientoRepositoryGetter: Getter<MantenimientoRepository>,
  ) {
    super(TipoMantenimiento, dataSource);
    this.mantenimientos = this.createHasManyRepositoryFactoryFor('mantenimientos', mantenimientoRepositoryGetter,);
    this.registerInclusionResolver('mantenimientos', this.mantenimientos.inclusionResolver);
  }
}
