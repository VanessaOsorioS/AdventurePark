import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {TipoDepartamento, TipoDepartamentoRelations} from '../models';

export class TipoDepartamentoRepository extends DefaultCrudRepository<
  TipoDepartamento,
  typeof TipoDepartamento.prototype.id,
  TipoDepartamentoRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(TipoDepartamento, dataSource);
  }
}
