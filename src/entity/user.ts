import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm'

export enum CurrentTimeStamp {
  CURRENT_TIMESTAMP = 'CURRENT_TIMESTAMP',
}

@Entity('USERS')
export class user extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number | undefined

  @Column('text')
  name: string | undefined

  @Column('text')
  first_last_name: string | undefined

  @Column({ type: 'text', nullable: true })
  second_last_name: string | undefined

  @Column('text') // TODO: email validation
  email: string | undefined

  @Column('text')
  password: string | undefined

  @CreateDateColumn({
    name: 'created_at',
  })
  created_at: Date | undefined

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updated_at: Date | undefined
}
