import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Plan, PlanRelations} from '../models';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.codigo,
  PlanRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Plan, dataSource);
  }
}
