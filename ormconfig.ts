import { ORM_OPTIONS } from './src/config'

export = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: ORM_OPTIONS.DB_USERNAME,
  password: ORM_OPTIONS.DB_PASSWORD,
  database: ORM_OPTIONS.DB_DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
}
