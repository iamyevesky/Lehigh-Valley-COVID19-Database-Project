# Lehigh-Valley-COVID19-Database-Project
The fully implemented website can be accessed at the following URL:
http://139.147.9.198

To host the website locally on your computer, follow the steps below.

1. Install Node.js and NPM usingcommands:

• sudo apt-get update

• sudo apt-get install nodejs

• sudo apt-get install npm

2. Git Clone Application

git clone https://github.com/rphan038/Lehigh-Valley-COVID19-Database-Project.git

3. Install all necessary packages in the package.json using command:

• npm install express

• npm install pg

4. Enter command node dbpg.js to run the server

5. Navigate to the "public" directory and enter nano index.html

Change <script src="/public/main.js"></script>
to 
<script src="main.js"></script>

Change '<link rel="stylesheet" href="public/style.css">'
to
'<link rel="stylesheet" href="style.css">'

6. Open index.html in your web browser
