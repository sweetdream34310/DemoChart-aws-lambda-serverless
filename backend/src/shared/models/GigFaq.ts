import {
    AllowNull, BelongsTo, BelongsToMany, Column,
    DataType,
    Default,
    ForeignKey,
    HasMany,
    Model,
  
    PrimaryKey, Table
  } from 'sequelize-typescript';
  import { Gig } from './Gig';
  import { GigGenres } from './GigGenres';
  
  @Table({ paranoid: true })
  export class GigFaq extends Model {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.STRING({ length: 64 }))
	uid!: number;

	@ForeignKey(() => Gig)
	@Column(DataType.STRING({ length: 64 }))
	gigUid!: string;

	@BelongsTo(() => Gig)
	gig!: Gig;

  @Column
	question!: string;

  @Column
	answer!: string;
  
  @Column
	arrayPosition!: string;
  }
  