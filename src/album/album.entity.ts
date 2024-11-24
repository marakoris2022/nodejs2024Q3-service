import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('albums')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  artistId: string;

  @Column()
  releaseDate: string;
}
