1. Ensure that `task-shuffler` database is created in postgres.
2. If you need to generate a migration, run `npx typeorm-ts-node-commonjs migration:generate ./src/migrations/task -d ./src/data-source.ts`
3. To run the migration, run `npm run typeorm:migrate`
