## Title

- <b> Battle Simulator Simulater API </b>

## Assumption

## Tools/Libraries Used

- Node v14.\*
- Postgres DB
- Socket.IO - back/front
- db-migrate
- winston Logger

## Set-Up

- Clone repo.
- Create `.env` file into the root location of this app.
- Populate the `.env` as follows.
- Port is set in config/envroment-variables.json to - 3100

```bash
NODE_ENV=<environment>

PGUSER_PR=<pg user>
PGPASSWORD_PR=<db password>
PGHOST_PR=<db host>
PGDATABASE_PR=<db-name>
PGPORT_PR=<db-port>
```

## Operation

- Run `npm install` to install all app dependencies.
- Run `db-migrate up` to run database migrations.
- Run `db-migrate reset` to reset the database.
- Run `npm run dev` to launch the application

### Seed Database

- Trigger following POST endpoint

| Endpoint                       | Method | Description      |
| ------------------------------ | ------ | ---------------- |
| [host]/seed/seed-data | POST   | Add a new Battle |

## Database Tables

- battles - seeded
- armies - seeded
- attack_strategy - seeded
- games

## Documentation

- [Click Here](./doc/index.doc.md)
