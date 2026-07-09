Best Cars Dealership Review Portal
<!-- ============================================================ Task 1 required fields (do not remove) Replace the values below with your own details. ============================================================ -->
Repository Name: best-cars-dealership-review-capstone
Project Name: Best Cars - Dealership Review Portal

Overview
Best Cars is a full-stack web application where users can browse car
dealerships, filter dealers by U.S. state, read customer reviews,
and (once logged in) submit their own reviews. Every submitted
review is automatically run through a sentiment analyzer that
classifies the review as positive, neutral, or negative.

The project is the capstone for the IBM Full-Stack Application
Development course, combining Django REST Framework on the backend,
a React frontend, a sentiment analysis microservice, GitHub Actions
CI/CD, and deployment to a cloud platform.

Features
Browse all dealerships on the home page
Filter dealerships by state (e.g. Kansas)
View individual dealer details and associated reviews
User registration, login, and logout (Django auth + CSRF)
Post new reviews with car purchase details
Automatic sentiment analysis of review text (positive / neutral / negative)
Django admin panel for managing makes, models, dealers, and reviews
Responsive "About Us" and "Contact Us" static pages
CI/CD pipeline via GitHub Actions
Cloud deployment with a public URL
Tech Stack
Layer	Technology
Backend	Django, Django REST Framework
Frontend	React, JSX, Bootstrap/CSS
Database	SQLite (dev), Cloudant/Mongo (review & dealer services)
Sentiment AI	IBM Watson Natural Language Understanding (or in-process analyzer)
Auth	Django session auth with CSRF tokens
CI/CD	GitHub Actions
Deployment	IBM Cloud Code Engine (or equivalent)
Project Structure
text

best-cars-dealership-review-capstone/
├── server/
│   ├── manage.py
│   ├── requirements.txt
│   ├── DjangoApps/
│   │   ├── djangoapp/          # main Django app (views, models, urls)
│   │   └── authapp/            # user registration / auth
│   ├── frontend/
│   │   ├── static/             # About.html, Contact.html, CSS, images
│   │   ├── templates/          # Django HTML templates
│   │   └── src/
│   │       └── components/
│   │           ├── Register/Register.jsx
│   │           ├── Login/
│   │           ├── Dealers/
│   │           ├── Dealer/
│   │           └── AddReview/
│   └── ...
├── sentiment_analysis/         # NLU sentiment service
├── database/                   # dealer / review data fixtures
├── .github/
│   └── workflows/
│       └── django-ci-cd.yml    # GitHub Actions workflow
├── deploymentURL               # text file containing deployed URL
├── media/                      # screenshots and cURL output files
│   ├── django_server
│   ├── loginuser
│   ├── logoutuser
│   ├── getdealerreviews
│   ├── getalldealers
│   ├── getdealerbyid
│   ├── getdealersbyState
│   ├── getallcarmakes
│   ├── analyzereview
│   ├── CICD
│   ├── admin_login.png
│   ├── admin_logout.png
│   ├── get_dealers.png
│   ├── get_dealers_loggedin.png
│   ├── dealersbystate.png
│   ├── dealer_id_reviews.png
│   ├── dealership_review_submission.png
│   ├── added_review.png
│   ├── deployed_landingpage.png
│   ├── deployed_loggedin.png
│   ├── deployed_dealer_detail.png
│   └── deployed_add_review.png
└── README.md
Getting Started
1. Clone the repository
Bash

git clone https://github.com/<YOUR_GITHUB_USERNAME>/best-cars-dealership-review-capstone.git
cd best-cars-dealership-review-capstone
2. Set up the backend (Django)
Bash

cd server
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser  # create the root/admin account
python manage.py runserver
The Django server will start at http://localhost:8000.

3. Build and serve the frontend (React)
Bash

cd server/frontend
npm install
npm run build
# Static build output is served by Django from server/frontend/static
4. Run the sentiment analysis service
Bash

cd sentiment_analysis
pip install -r requirements.txt
python sentiment_analysis.py
API Endpoints
Method	Endpoint	Description
POST	/djangoapps/api/register	Register a new user
POST	/djangoapps/api/login	Log in an existing user
GET	/djangoapps/api/logout	Log out the current user
GET	/djangoapps/api/get_dealers	List all dealers
GET	/djangoapps/api/get_dealers/<state>	List dealers in a given state
GET	/djangoapps/api/get_dealer/<id>	Get a single dealer by ID
GET	/djangoapps/api/get_reviews/<dealer_id>	Get reviews for a dealer
POST	/djangoapps/api/review	Submit a new review
GET	/djangoapps/api/get_cars/<dealer_id>	Get car makes/models for a dealer
cURL examples for each endpoint are saved in the media/ directory
for the capstone submission.

CI/CD
A GitHub Actions workflow (.github/workflows/django-ci-cd.yml)
runs on every push to main:

Checks out the repository
Sets up Python and installs dependencies
Runs Django migrations and tests
Builds the React frontend
Deploys the application to the configured cloud target
A saved copy of a successful workflow run is included in media/CICD.

Deployment
The application is deployed to IBM Cloud Code Engine (or an equivalent
cloud platform). The live deployment URL is stored in the
deploymentURL file at the root of this repository.

Screenshots of the deployed application (landing page, logged-in
view, dealer details, and posted review) are included in the
media/ directory.

About & Contact Pages
About Us (server/frontend/static/About.html) — team members with
photos, roles, bios, and contact emails.
Contact Us (server/frontend/static/Contact.html) — company
contact details, address, phone, email, and a contact form.
Author
Your Name — GitHub
Built as the capstone project for the IBM Full Stack Application
Development Professional Certificate on Coursera.
