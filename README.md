# Movie Recommendation API

This is a simple movie recommendation system built with Python and FastAPI. It uses the K-Nearest Neighbors algorithm to provide movie recommendations based on the input movie title.

## Features

- Load and preprocess movie data
- Scale features for machine learning
- Train a K-Nearest Neighbors model
- Provide movie recommendations via an API endpoint

## Installation

To get started with this project, you need to have Python installed. Follow the steps below to set up the project:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/movie-recommendation-api.git
    cd movie-recommendation-api
    ```

2. Create a virtual environment and activate it:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Place your `movies.csv` file in the `data/` directory.

## Usage

1. Start the FastAPI server:
    ```bash
    uvicorn main:app --reload
    ```

2. Open your browser and go to `http://127.0.0.1:8000`. You should see a welcome message.

3. To get movie recommendations, send a POST request to `http://127.0.0.1:8000/recommend` with the following JSON body:
    ```json
    {
      "title": "Toy Story",
      "n_recommendations": 5
    }
    ```

## Project Structure

- `main.py`: Contains the FastAPI application and endpoints.
- `movie_recommender.py`: Contains functions for loading data, preprocessing, training the model, and making recommendations.
- `data/movies.csv`: The dataset containing movie information.

