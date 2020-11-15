# concept
docker images to show figures instantly.

# usage
save this script as `docker-compose.yml`.

```
version: "3"
services:
  websocket:
    image: dr666m1/image_watcher_websocket:version-0.0
    volumes:
      - .:/work/sync
    ports:
      - "9999:9999"
  webserver:
    image: dr666m1/image_watcher_webserver:version-0.0
    volumes:
      - .:/work/sync
    ports:
      - "8888:8888"
    depends_on:
      - websocket
```

then run the command below. `$FILE_PATH` means path to `docker-compose.yml`.

```
docker-compose -f $FILE_PATH --project-directory $(pwd) up -d
# if you use fish shell
# docker-compose -f $FILE_PATH --project-directory (pwd) up -d
```

to stop the container, run the command below.

```
docker-compose -f $FILE_PATH --project-directory $(pwd) down
# if you use fish shell
# docker-compose -f $FILE_PATH --project-directory (pwd) down
```

