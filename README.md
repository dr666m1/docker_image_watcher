# concept
docker images to show figures instantly.

# usage
run the command below.

```
docker container run --rm -it -v $(pwd):/work/sync -p 9999:9999 ghcr.io/dr666m1/image_watcher
# if you use fish shell
# docker container run --rm -it -v (pwd):/work/sync -p 9999:9999 ghcr.io/dr666m1/image_watcher
```

then open `localhost:9999`.

the figures in the current directory is shown everytime they are changed.
