# teste local
para realizar os testes localmente utilize esse comando para subir uma instancia local do postgres:
``` bash
docker run --name my-postgres \
  -e POSTGRES_USER=myuser \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=mydb \
  -p 5432:5432 \
  -d postgres:latest
```

crie um arquivo .env e adicione as envs:
``` markdown
DATABASE_URL=postgresql://myuser:mypassword@host.docker.internal:5432/mydb
```

execute as migrations do banco:

``` bash
$ npm run db:migrate
```
