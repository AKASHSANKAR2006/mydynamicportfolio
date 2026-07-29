from flask import Flask, render_template, request, redirect
import mariadb
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Database Connection
db = mariadb.connect(
    host=os.getenv("DB_HOST"),
    port=int(os.getenv("DB_PORT")),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME"),
    ssl=True
)

cursor = db.cursor()

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/projects")
def projects():
    return render_template("projects.html")

@app.route("/contact", methods=["GET", "POST"])
def contact():

    if request.method == "POST":

        name = request.form["name"]
        email = request.form["email"]
        message = request.form["message"]

        sql = "INSERT INTO contact(name,email,message) VALUES(%s,%s,%s)"
        values = (name, email, message)

        cursor.execute(sql, values)
        db.commit()

        return redirect("/")

    return render_template("contact.html")


@app.route("/login", methods=["GET","POST"])
def login():

    if request.method == "POST":

        username = request.form["username"]
        password = request.form["password"]

        sql = "SELECT * FROM users WHERE username=%s AND password=%s"
        cursor.execute(sql, (username,password))

        user = cursor.fetchone()

        if user:
            return redirect("/dashboard")
        else:
            return "Invalid Username or Password"

    return render_template("login.html")


@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)