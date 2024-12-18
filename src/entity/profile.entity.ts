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

  @Column({ unique: true })
  handle: string;

  @Column({ name: 'profile_picture', nullable: true })
  profilePicture: string;

  @Column('geometry', { spatialFeatureType: 'Point', srid: 4326 })
  @Index({ spatial: true })
  location: Geometry;

  @OneToOne(() => Store, (store) => store.owner)
  store: Store;

  @ManyToMany(() => Post, (post) => post.likedUsers)
  @JoinTable({
    name: 'user_post_likes',
    joinColumn: { name: 'user_profile_id' },
    inverseJoinColumn: { name: 'post_id' },
  })
  likedPosts: Post[];

  @ManyToMany(() => Store, (store) => store.subscribers)
  favorites: Store[];
}
