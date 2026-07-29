/*from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/projects")
def projects():
    return render_template("projects.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

if __name__ == "__main__":
    app.run(debug=True)

Your Flask code is correct. The error you showed earlier:

jinja2.exceptions.TemplateNotFound: index.html

means Flask cannot find your HTML files, not that your Python code is wrong.

Correct Folder Structure

Your project should look exactly like this:

MyProject/
│
├── app.py
│
├── templates/
│   ├── index.html
│   ├── about.html
│   ├── projects.html
│   ├── contact.html
│   ├── login.html
│   └── dashboard.html
│
└── static/
    ├── style.css
    ├── script.js
    └── images/
Example HTML files

templates/index.html

<!DOCTYPE html>
<html>
<head>
    <title>Home</title>
</head>
<body>
    <h1>Welcome to Home Page</h1>

    <a href="/">Home</a> |
    <a href="/about">About</a> |
    <a href="/projects">Projects</a> |
    <a href="/contact">Contact</a> |
    <a href="/login">Login</a> |
    <a href="/dashboard">Dashboard</a>
</body>
</html>

templates/about.html

<!DOCTYPE html>
<html>
<head>
    <title>About</title>
</head>
<body>
    <h1>About Page</h1>
</body>
</html>

Similarly create:

projects.html
contact.html
login.html
dashboard.html

Each should contain simple HTML.

Check these points
1. Is the folder name exactly?
templates

Not:

Templates
template
TEMPLATES
2. Is app.py outside the templates folder?

Correct:

app.py
templates/

Wrong:

templates/
    app.py
3. Are the file names correct?
index.html
about.html
projects.html
contact.html
login.html
dashboard.html

Not

Index.html
index.HTML
home.html
4. Run Flask from the project folder

Open CMD inside your project folder:

cd C:\Users\Admin\Desktop\MyProject

Then run

python app.py

You should see

* Running on http://127.0.0.1:5000

Open

http://127.0.0.1:5000/
If you still get TemplateNotFound

Please send:

A screenshot of your project folder (showing app.py and the templates folder).
The output of:
dir

inside your project folder.

or tell me:

Which editor are you using? (VS Code / PyCharm / Notepad)
What is the exact location of app.py?

I'll help you fix it step by step.

Excellent! Now let's connect your Flask portfolio to a MySQL database so you can store contact form messages and login information.

Step 1: Create the Database

Open MySQL and run:

CREATE DATABASE portfolio_db;

USE portfolio_db;
Create a Contact Table
CREATE TABLE contact (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    message TEXT
);
Create a Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(100)
);
Insert a Sample User
INSERT INTO users(username, password)
VALUES ('admin', 'admin123');
Step 2: Install MySQL Connector

Open CMD:

pip install mysql-connector-python
Step 3: Update app.py
from flask import Flask, render_template, request, redirect
import mysql.connector

app = Flask(__name__)

# Database Connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="YOUR_PASSWORD",
    database="portfolio_db"
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
    app.run(debug=True)
Step 4: Update contact.html
<form method="POST">

<input type="text" name="name" placeholder="Name" required><br><br>

<input type="email" name="email" placeholder="Email" required><br><br>

<textarea name="message" placeholder="Message"></textarea><br><br>

<button type="submit">Send</button>

</form>
Step 5: Update login.html
<form method="POST">

<input type="text" name="username" placeholder="Username" required><br><br>

<input type="password" name="password" placeholder="Password" required><br><br>

<button type="submit">Login</button>

</form>
Step 6: Test the Application
Run:
python app.py
Open:
http://127.0.0.1:5000
Fill in the contact form. The data should be stored in the contact table.
Login with:
Username: admin
Password: admin123
Suggested Project Structure
portfolio/
│
├── app.py
├── templates/
│   ├── index.html
│   ├── about.html
│   ├── projects.html
│   ├── contact.html
│   ├── login.html
│   └── dashboard.html
│
├── static/
│   ├── style.css
│   └── images/
│
└── database.sql
Recommended Improvements

For a real-world portfolio, you should also add:

User registration (sign up)
Password hashing using Flask's werkzeug.security.generate_password_hash() and check_password_hash() instead of storing plain-text passwords
Flask sessions so only logged-in users can access the dashboard
An admin panel to view contact messages
CRUD operations (Create, Read, Update, Delete) for projects
Resume upload functionality
Profile image upload
A responsive frontend using Bootstrap

These features will make the project much closer to a professional full-stack Flask portfolio application.


C:\Users\Admin>mysql -p -u:
Enter password: ********
ERROR 1045 (28000): Access denied for user ':'@'localhost' (using password: YES)

The error happened because you typed the MySQL command incorrectly.

You entered:

mysql -p -u:

Here, MySQL thinks your username is : (colon), which is not a valid user.

Correct Command

If your MySQL username is root, use:

Then press Enter.

You will see:

Type your MySQL root password and press Enter.

Note: While typing the password, nothing will appear on the screen (no stars, no dots). That is normal.

Example

If the password is correct, you should get:

After Login, Create Your Portfolio Database

Copy and paste these commands one by one:

To Check Everything Worked

Run:

You should see:

Expected Output

Database

Tables

portfolio_db

contact

users

If You Forgot the MySQL Root Password

Tell me exactly what happens when you run:

and I'll help you fix it step by step.

from flask import Flask, render_template, request, redirect
import mysql.connector

app = Flask(__name__)

# Database Connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="YOUR_PASSWORD",
    database="portfolio_db"
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
    app.run(debug=True) is it existing code is to be replaced

Yes. This code should replace your existing app.py, but only after you have created the MySQL database and tables.

Option 1 (Recommended): Replace your app.py

Replace your current code with the new version that includes:

✅ MySQL connection
✅ Contact form data storage
✅ Login verification
✅ Dashboard route

Just remember to change this line:

password="YOUR_PASSWORD"

to your actual MySQL root password, for example:

password="root123"

or if your root password is blank:

password=""
Before running the app, make sure you have:
Installed the MySQL connector:
pip install mysql-connector-python
Created the database:
CREATE DATABASE portfolio_db;
Created the tables:
USE portfolio_db;

CREATE TABLE contact (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    message TEXT
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(100)
);

INSERT INTO users(username, password)
VALUES ('admin', 'admin123');
If you haven't created the database yet

Do not replace the code yet. First create the database and tables, otherwise you'll get an error like:

mysql.connector.errors.ProgrammingError: 1049 (42000): Unknown database 'portfolio_db'
I can also help you build a professional portfolio

Instead of this basic version, we can create a portfolio with:

🎨 Modern Bootstrap UI
👤 Admin login
📂 Add/Edit/Delete projects (CRUD)
🖼️ Image upload
📄 Resume upload
📧 Contact messages stored in MySQL
🔐 Secure login with hashed passwords
📊 Admin dashboard showing statistics

This is the kind of project that's s*/