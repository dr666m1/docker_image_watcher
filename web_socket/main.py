from websocket_server import WebsocketServer
import os
import time
import datetime

def search_new_figure(client, server):
    latest_update = datetime.datetime.now().timestamp()
    while True:
        tmp_update = []
        figures = [x for x in os.listdir("./sync") if x.split(".")[-1] in ["png", "PNG", "html"]]
        for i in figures:
            update = os.path.getmtime(f"./sync/{i}")
            if update <= latest_update:
                continue
            tmp_update.append(update)
            server.send_message(client, f"{i}?dummy={int(update)}")
        latest_update = max([latest_update] + tmp_update)
        time.sleep(5)
if __name__ == "__main__":
    server = WebsocketServer(9999, host="0.0.0.0")
    server.set_fn_new_client(search_new_figure)
    server.run_forever()
