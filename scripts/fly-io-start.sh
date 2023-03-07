#!/usr/bin/env bash

# Exit if any command exits with a non-zero exit code
set -o errexit

# Set volume path for use in PostgreSQL paths if volume directory exists
[ -d "../postgres-volume" ] && VOLUME_PATH=/postgres-volume

echo "Creating folders for PostgreSQL and adding permissions for postgres user..."
mkdir -p $VOLUME_PATH/run/postgresql/data/
chown postgres:postgres $VOLUME_PATH/run/postgresql/ $VOLUME_PATH/run/postgresql/data/

# If PostgreSQL config file exists, start database. Otherwise, initialize, configure and create user and database.
#
# Config file doesn't exist during:
# 1. First deployment of an app with a volume
# 2. Every deployment of an app without a volume
#
if [[ -f $VOLUME_PATH/run/postgresql/data/postgresql.conf ]]; then
  echo "PostgreSQL config file exists, starting database..."
  su postgres -c "pg_ctl start -D /postgres-volume/run/postgresql/data/"
else
  echo "PostgreSQL config file doesn't exist, initializing database..."

  # Initialize a database in the data directory
  su postgres -c "initdb -D $VOLUME_PATH/run/postgresql/data/"

  # Update PostgreSQL config path to use volume location if app has a volume
  sed -i "s/'\/run\/postgresql'/'\/postgres-volume\/run\/postgresql'/g" /postgres-volume/run/postgresql/data/postgresql.conf || echo "PostgreSQL volume not mounted, running database as non-persistent (new deploys erase changes not saved in migrations)"

  # Configure PostgreSQL to listen for connections from any address
  echo "listen_addresses='*'" >> $VOLUME_PATH/run/postgresql/data/postgresql.conf

  # Start database
  su postgres -c "pg_ctl start -D $VOLUME_PATH/run/postgresql/data/"

  # Create database and user with credentials from Fly.io secrets
  psql -U postgres postgres << SQL
    CREATE DATABASE $PGDATABASE;
    CREATE USER $PGUSERNAME WITH ENCRYPTED PASSWORD '$PGPASSWORD';
    GRANT ALL PRIVILEGES ON DATABASE $PGDATABASE TO $PGUSERNAME;
    \\connect $PGDATABASE;
    CREATE SCHEMA $PGUSERNAME AUTHORIZATION $PGUSERNAME;
SQL
fi

yarn migrate up
yarn start
