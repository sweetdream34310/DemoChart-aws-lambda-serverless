import {
    AllowNull,
    Column,
    Model,
    PrimaryKey,
    Table
  } from 'sequelize-typescript';
  
  @Table({ paranoid: true })
  export class Category extends Model {
      @PrimaryKey
      @Column
      categoryCode!: number;
  
      @AllowNull(false)
      @Column
      name!: string;
  }
  