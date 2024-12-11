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
  @JoinColumn()
  owner: Profile;

  @ManyToMany(() => Profile, (profile) => profile.favorites)
  @JoinTable({
    name: 'subscriptions',
    joinColumn: { name: 'store', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user', referencedColumnName: 'user' },
  })
  subscribers: Profile[];

  @OneToMany(() => Post, (post) => post.publishedBy)
  posts: Post[];

  @ManyToMany(() => Tag, (keyword) => keyword.stores)
  keywords: Tag[];

  @OneToOne(() => Post)
  @JoinColumn()
  featuredPost: Post;
}
