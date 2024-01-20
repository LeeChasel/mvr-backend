# Prerequisite

1. Already installed [docker](https://www.docker.com/) and [docker compose](https://docs.docker.com/compose/)
2. Make sure the [ports](#ports) are not used by other services

# Installation

```bash
git clone https://github.com/LeeChasel/mvr-backend.git
```

# Execution

In the project directory

```bash
docker compose up
```

## Services

### Ports

| **Service**   | **Port** |
| ------------- | -------- |
| Nestjs        | 64550    |
| PostgreSQL    | 5432     |
| Prisma Studio | 5555     |
| Adminer       | 8080     |

### Adminer

| **Field** | **Value**  |
| --------- | ---------- |
| DBSystem  | PostgreSQL |
| Server    | postgres   |
| Account   | root       |
| Password  | root       |
| DB        | _empty_    |
