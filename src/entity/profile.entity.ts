import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Geometry } from 'src/entity/geometry.interface';
import { Store } from './store.entity';
import { Post } from './post.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  @Column()
  nickname: string;

  @Column({ name: 'profile_picture' })
  profilePicture: string;

  @Column('geometry', { spatialFeatureType: 'Point', srid: 4326 })
  @Index({ spatial: true })
  location: Geometry;

  @OneToOne(() => Store, (store) => store.owner)
  store: Store;

  @ManyToMany(() => Post, (post) => post.likes)
  @JoinTable({
    name: 'likes',
    joinColumn: { name: 'user', referencedColumnName: 'user' },
    inverseJoinColumn: { name: 'post', referencedColumnName: 'id' },
  })
  liked: Post[];

  @ManyToMany(() => Store, (store) => store.subscribers)
  favorites: Store[];
}