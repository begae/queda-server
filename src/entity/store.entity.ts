import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { Geometry } from './geometry.interface';
import { Profile } from './profile.entity';
import { Tag } from './tag.entity';

@Entity()
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'cover_picture' })
  coverPicture: string;

  @Column({ name: 'profile_picture' })
  profilePicture: string;

  @Column({ select: false })
  registration: number;

  @Column('geometry', { spatialFeatureType: 'Point', srid: 4326 })
  @Index({ spatial: true })
  location: Geometry;

  @OneToOne(() => Profile, (profile) => profile.store)
  @JoinColumn({ name: 'owner_profile_id' })
  owner: Profile;

  @ManyToMany(() => Profile, (profile) => profile.favorites)
  @JoinTable({
    name: 'store_user_subscriptions',
    joinColumn: { name: 'store_id' },
    inverseJoinColumn: { name: 'user_profile_id' },
  })
  subscribers: Profile[];

  @OneToMany(() => Post, (post) => post.publishedBy)
  posts: Post[];

  @ManyToMany(() => Tag, (tag) => tag.stores)
  tags: Tag[];

  @OneToOne(() => Post)
  @JoinColumn()
  featuredPost: Post;

  @OneToOne(() => Post)
  @JoinColumn()
  latestPost: Post;
}
