import numpy as np
from sklearn.linear_model import LinearRegression
import requests

def fetch_expenses():
    try:
        res = requests.get("http://localhost:8080/api/expenses")
        data = res.json()

        # sort by date
        data = sorted(data, key=lambda x: x["date"])

        expenses = [e["amount"] for e in data]

        return expenses if len(expenses) > 1 else [10000, 12000, 15000]

    except:
        return [10000, 12000, 15000, 18000]


def predict_next_expense():
    expenses = fetch_expenses()

    months = np.arange(1, len(expenses) + 1).reshape(-1, 1)
    expenses = np.array(expenses)

    model = LinearRegression()
    model.fit(months, expenses)

    next_month = np.array([[len(expenses) + 1]])

    prediction = model.predict(next_month)

    return round(prediction[0], 2)