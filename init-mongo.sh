#!/bin/bash
set -e

# Define array of databases
databases=(${MONGO_INITDB_DATABASES//,/ })

# Loop through each database and initialize
for db in "${databases[@]}"; do
    mongo admin -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" <<EOF
    use $db
    db.createUser({
        user: "admin",
        pwd: "admin",
        roles: ["readWrite", "dbAdmin"]
    })
EOF
done