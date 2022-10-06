import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Zona, ZonaRelations} from '../models';

export class ZonaRepository extends DefaultCrudRepository<
  Zona,
  typeof Zona.prototype.codigo,
  ZonaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Zona, dataSource);
  }
}
