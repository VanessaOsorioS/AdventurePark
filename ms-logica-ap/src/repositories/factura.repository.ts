import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Factura, FacturaRelations, Plan} from '../models';
import {PlanRepository} from './plan.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.id,
  FacturaRelations
> {

  public readonly planes: HasManyRepositoryFactory<Plan, typeof Factura.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>,
  ) {
    super(Factura, dataSource);
    this.planes = this.createHasManyRepositoryFactoryFor('planes', planRepositoryGetter,);
    this.registerInclusionResolver('planes', this.planes.inclusionResolver);
  }
}
