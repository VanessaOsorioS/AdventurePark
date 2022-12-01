import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Plan, PlanRelations, Factura} from '../models';
import {FacturaRepository} from './factura.repository';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.codigo,
  PlanRelations
> {

  public readonly facturas: HasManyRepositoryFactory<Factura, typeof Plan.prototype.codigo>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(Plan, dataSource);
    this.facturas = this.createHasManyRepositoryFactoryFor('facturas', facturaRepositoryGetter,);
    this.registerInclusionResolver('facturas', this.facturas.inclusionResolver);
  }
}
