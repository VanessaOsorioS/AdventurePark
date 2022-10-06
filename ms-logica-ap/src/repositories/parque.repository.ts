import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Parque, ParqueRelations, Plan, Zona} from '../models';
import {PlanRepository} from './plan.repository';
import {ZonaRepository} from './zona.repository';

export class ParqueRepository extends DefaultCrudRepository<
  Parque,
  typeof Parque.prototype.codigo,
  ParqueRelations
> {

  public readonly planes: HasManyRepositoryFactory<Plan, typeof Parque.prototype.codigo>;

  public readonly zonas: HasManyRepositoryFactory<Zona, typeof Parque.prototype.codigo>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('ZonaRepository') protected zonaRepositoryGetter: Getter<ZonaRepository>,
  ) {
    super(Parque, dataSource);
    this.zonas = this.createHasManyRepositoryFactoryFor('zonas', zonaRepositoryGetter,);
    this.registerInclusionResolver('zonas', this.zonas.inclusionResolver);
    this.planes = this.createHasManyRepositoryFactoryFor('planes', planRepositoryGetter,);
    this.registerInclusionResolver('planes', this.planes.inclusionResolver);
  }
}
