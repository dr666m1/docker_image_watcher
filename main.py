from flask import Flask, render_template

app = Flask(__name__, static_url_path="/static", static_folder="./sync")

@app.route("/")
def main():
    return render_template("index.html")

@app.errorhandler(404)
def page_not_found(error):
    return "this page does not exist", 404

if __name__ == "__main__":
    app.run(debug=True, host="localhost", port="8888")
