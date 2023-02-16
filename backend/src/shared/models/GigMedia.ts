import {
    BelongsTo,
    Column,
    DataType,
    Default,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript';

import { Gig } from './Gig';

@Table({ paranoid: true })
export class GigMedia extends Model {
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
	mediaUrl!: string;

    @Column
	isVideo!: boolean;
	
    @Column
	arrayPosition!: number;
}
