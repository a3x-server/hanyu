#!/bin/bash

if git diff-index --quiet HEAD --; then
    echo "No hay cambios para agregar."
    exit 0
fi

git log --pretty=format:"%h, %ar : %s"
git add .

# Solicita un mensaje de commit al usuario
fecha_actual=$(LC_TIME=es_ES.UTF-8 date +"%Y%b%d" | awk '{print toupper($0)}')
echo "Introduce la versión del commit:"
read commit_version
echo "Introduce el mensaje del commit:"
read commit_message
commit_message="$fecha_actual: $commit_version: $commit_message"
git commit -m "$commit_message"
git push -ufv main main
echo "Repo remoto MAIN actualizado."
sleep 2
clear
git log -1 --oneline