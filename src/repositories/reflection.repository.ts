import {DefaultCrudRepository} from '@loopback/repository';
import {Reflection, ReflectionRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ReflectionRepository extends DefaultCrudRepository<
  Reflection,
  typeof Reflection.prototype.id,
  ReflectionRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Reflection, dataSource);
  }
}
