# Expenditure Tracker & Financial Recommendation

The app is a proof of concept for an ideal app that does the following:
- Records users' expenditures over a period of time (a month)
- Takes in their income and saving objectives (as numerical values)
- Provides data insights on income expenditures using graphs and visualizations
- Predict the possible and potential savings based on the data
- Finally, it provides personalized recommendations on how to adjust expenditures to bring a balance between expenditures, savings, and income to meet financial goals.

## Application

- API (Hosted on Heroku): [https://extracker-api.onrender.com](https://extracker-api.onrender.com)
- Web Client (Hosted on Netlify): [https://ex-tracker.cedricmurairi.tech](https://ex-tracker.cedricmurairi.tech)

## How to Run (this guide assumes you are on a UNIX OS like Linux or Mac OS)

To run the app on your local machine, proceed with the following:

- Cloning the repository on your computer
    ```
    git clone https://github.com/CedricMurairi/expense_tracker.git 
    ```
- Navigate into the project folder
    ```
    cd expense_tracker/
    ```
### To run the API, do the following:
- Make sure you have the latest `python`, `pip`, and `python venv` installed
- Navigate into the `api/` folder
    ```
    cd api/
    ```
- Create a virtual environment using `python venv`
    ```
    python -m venv mlenv
    ```
- Activate the `mlenv`
    ```
    source mlenv/bin/activate
    ```
- Install dependencies using `pip`
    ```
    pip install -r requirements.txt
    ```
- Run the app
    ```
    python setup.py
    ```
### To run the web app, do the following:
- Make sure you have the latest versions of `nodejs` and `npm` installed
- Navigate to `web/` folder in the project directory
- Create an environment file
    ```
    touch .env.local
    ```
- Set the API URL to the location of your local running API (Replace with your location and port)
    ```
    echo NEXT_PUBLIC_API_URL="http://yourlocation:yourport" >> .env.local
    ```
- Install/Update dependencies
    ```
    npm install
    ```
- Run the app
    ```
    npm run dev
    ```
- Have fun testing the app
