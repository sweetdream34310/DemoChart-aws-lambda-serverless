import {
	Column,
	DataType,
	Default, Model,
	PrimaryKey, Table
} from 'sequelize-typescript';

@Table({ paranoid: true })
export class AdminConfigs extends Model {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.STRING({ length: 64 }))
	uid!: number;

	@Column(DataType.STRING({ length: 64 }))
	key!: string;

	@Column(DataType.STRING({ length: 64 }))
	value!: string;
}
