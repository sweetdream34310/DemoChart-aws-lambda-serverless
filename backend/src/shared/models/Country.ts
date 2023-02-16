import {
  AllowNull,
  Column,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';

@Table({ paranoid: true })
export class Country extends Model {
	@PrimaryKey
	@Column
	countryCode!: number;

	@AllowNull(false)
	@Column
	name!: string;
}
