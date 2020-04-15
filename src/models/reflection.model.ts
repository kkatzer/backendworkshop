import {Entity, model, property} from '@loopback/repository';

@model()
export class Reflection extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  text: string;

  @property({
    type: 'date',
    required: false
  })
  creationTime: string;


  constructor(data?: Partial<Reflection>) {
    super(data);
  }
}

export interface ReflectionRelations {
  // describe navigational properties here
}

export type ReflectionWithRelations = Reflection & ReflectionRelations;
