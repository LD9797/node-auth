import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

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

  @Column('text')
  second_last_name: string | undefined

  @Column('text') // TODO: email validation
  email: string | undefined

  @Column('text')
  password: string | undefined

  @Column({
    type: 'timestamp',
    default: () => CurrentTimeStamp.CURRENT_TIMESTAMP,
  })
  created_at: Date | undefined

  @Column({
    type: 'timestamp',
    default: () => CurrentTimeStamp.CURRENT_TIMESTAMP,
  })
  updated_at: Date | undefined
}
