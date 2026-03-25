def get_analysis():

    total_income = 50000
    total_expense = 32000

    savings = total_income - total_expense

    # 🔥 Top category (dummy)
    top_category = "Food"

    # 🔥 Monthly insight
    monthly_trend = "Expenses increased compared to last month"

    # 🔥 Smart warning
    if total_expense > total_income:
        msg = "⚠️ You are overspending!"
    elif savings < total_income * 0.2:
        msg = "💡 Savings are low. Try saving more."
    else:
        msg = "✅ Financial condition is healthy."

    return {
        "total_income": total_income,
        "total_expense": total_expense,
        "savings": savings,
        "analysis": msg,
        "top_category": top_category,
        "monthly_trend": monthly_trend
    }