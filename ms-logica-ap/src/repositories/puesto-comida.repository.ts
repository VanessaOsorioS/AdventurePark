import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {PuestoComida, PuestoComidaRelations} from '../models';

export class PuestoComidaRepository extends DefaultCrudRepository<
  PuestoComida,
  typeof PuestoComida.prototype.id,
  PuestoComidaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(PuestoComida, dataSource);
  }
}
