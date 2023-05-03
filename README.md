# Expenditure Tracker & Financial Recommendation

The app is a proof of concept for an ideal app that does the following:
- Records users' expenditures over a period of time (a month)
- Takes in their income and saving objectives (as numerical values)
- Provides data insights on income, expenditures using graphs and visualizations
- Predict the possible and potential savings based on the data
- Finally, it provides personalized recommendation on how to adjust expenditures to bring a balance between expenditures, savings and income to meet financial goals.

## Application

- API (Hosted on Heroku): [https://cashless-tracker-api.herokuapp.com](https://cashless-tracker-api.herokuapp.com)
- Web Client (Hosted on Netlify): [https://expenditures-tracker.netlify.app](https://expenditures-tracker.netlify.app)

## How to Run (this guide assumes you as on a UNIX OS like Linux or Mac OS)

To run the app on your local machine proceed with:

- Cloning the repository on your computer
    ```
    git clone https://github.com/CedricMurairi/expense_tracker.git 
    ```
- Navigate into the project folder
    ```
    cd expense_tracker/
    ```
### To run the api do the following:
- Make sure you have the latest `python`, `pip` and `python venv` installed
- Navigate into the `api/` folder
    ```
    cd api/
    ```
- Create a virtual environement using `python venv`
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
    python app.py
    ```
### To run the web app do the following:
- Make sure you have the latest versions of `nodejs` and `npm` installed
- Navigate to `web/` folder in project directory
- Create and environement file
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

**Note**: For custom data input you can edit the `user_*.json` files under the `mock` folder. This app is currently using mock data in `.json` files for test.

### Video

Link to the demo video: [https://drive.google.com/file/d/1wS6Kmap-K8Cguoe3vYOt0g8CH3Lhm4zm/view?usp=sharing](https://drive.google.com/file/d/1wS6Kmap-K8Cguoe3vYOt0g8CH3Lhm4zm/view?usp=sharing)