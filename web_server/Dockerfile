FROM python:3.8.3

ENV WORK /work

WORKDIR $WORK

COPY . .

RUN apt update && \
    pip install --no-cache-dir -r requirements.txt && \
    chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
