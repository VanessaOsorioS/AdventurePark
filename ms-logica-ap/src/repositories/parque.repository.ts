import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Parque, ParqueRelations} from '../models';

export class ParqueRepository extends DefaultCrudRepository<
  Parque,
  typeof Parque.prototype.codigo,
  ParqueRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Parque, dataSource);
  }
}
