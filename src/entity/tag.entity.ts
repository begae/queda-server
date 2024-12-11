import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Store } from './store.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  value: string;

  @ManyToMany(() => Store, (store) => store.tags)
  @JoinTable({
    name: 'tag_store_relation',
    joinColumn: { name: 'tag_id' },
    inverseJoinColumn: { name: 'store_id' },
  })
  stores: Store[];
}
