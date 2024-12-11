import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Store } from './store.entity';

@Entity()
export class Tag {
  @Column({ unique: true })
  value: string;

  @ManyToMany(() => Store, (store) => store.keywords)
  @JoinTable({
    name: 'tagged',
    joinColumn: { name: 'tag', referencedColumnName: 'value' },
    inverseJoinColumn: { name: 'store', referencedColumnName: 'id' },
  })
  stores: Store[];
}
