import {
  BeforeBulkCreate,
  BeforeCreate,
  Model as SeqModel,
} from 'sequelize-typescript';

import { v4 as uuidv4 } from 'uuid';

export class Model<T> extends SeqModel<T> {
  protectedAttributes = [];

  @BeforeCreate
  static setIdBeforeCreate(instance: Model<any>) {
    instance.id = uuidv4();
  }

  @BeforeBulkCreate
  static setIdsBeforeCreate(instances: Model<any>[]) {
    instances.map((instance) => (instance.id = uuidv4()));
  }

  toJSON() {
    const attributes = Object.assign({}, this.get());
    for (const a of this.getProtectedAttributes()) {
      delete attributes[a];
    }
    return attributes;
  }

  getProtectedAttributes() {
    return this.protectedAttributes;
  }
}
