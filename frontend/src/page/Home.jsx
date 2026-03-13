import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.wrapper}>
      
      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>BudgetWise AI</div>
        <div>
          <button style={styles.navBtn} onClick={() => navigate("/login")}>
            Login
          </button>
          <button style={styles.navBtn} onClick={() => navigate("/signup")}>
            Register
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          Smart Financial Decisions Powered by AI
        </h1>

        <p style={styles.heroText}>
          BudgetWise is an AI-driven expense tracker and financial advisor
          that analyzes your spending behavior, predicts financial risks,
          and provides intelligent recommendations to improve your financial stability.
        </p>

        <div style={styles.heroButtons}>
          <button
            style={styles.loginHeroBtn}
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            style={styles.getStartedBtn}
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* WHY SECTION (Smooth Combined Look) */}
      <section style={styles.whySection}>
        <h2 style={styles.whyTitle}>Why Choose BudgetWise?</h2>

        <div style={styles.featuresRow}>
          <div style={styles.featureBlock}>
            <h3 style={styles.featureHeading}>Expense Tracking</h3>
            <p>
              Monitor and categorize your daily expenses effectively
            </p>
          </div>

          <div style={styles.featureBlock}>
            <h3 style={styles.featureHeading}>AI Risk Prediction</h3>
            <p>
              Predict financial risks using machine learning models
            </p>
          </div>

          <div style={styles.featureBlock}>
            <h3 style={styles.featureHeading}>Smart Recommendations</h3>
            <p>
              Get personalized suggestions to improve savings
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

const styles = {
  wrapper: {
    fontFamily: "Segoe UI, sans-serif"
  },

  /* NAVBAR */
  navbar: {
    backgroundColor: "#2e7d32",
    color: "white",
    padding: "18px 60px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  logo: {
    fontSize: "24px",
    fontWeight: "bold"
  },

  navBtn: {
    background: "transparent",
    border: "none",
    color: "white",
    marginLeft: "25px",
    fontSize: "16px",
    cursor: "pointer"
  },

  /* HERO */
  hero: {
    backgroundColor: "#388e3c",
    color: "white",
    textAlign: "center",
    padding: "110px 20px 130px"
  },

  heroTitle: {
    fontSize: "48px",
    fontWeight: "700",
    marginBottom: "25px"
  },

  heroText: {
    maxWidth: "900px",
    margin: "0 auto 40px",
    fontSize: "18px",
    lineHeight: "1.7"
  },

  heroButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "20px"
  },

  loginHeroBtn: {
    backgroundColor: "white",
    color: "#2e7d32",
    border: "none",
    padding: "12px 35px",
    borderRadius: "30px",
    fontSize: "16px",
    cursor: "pointer"
  },

  getStartedBtn: {
    backgroundColor: "transparent",
    color: "white",
    border: "2px solid white",
    padding: "12px 35px",
    borderRadius: "30px",
    fontSize: "16px",
    cursor: "pointer"
  },

  /* WHY SECTION */
  whySection: {
    backgroundColor: "#f4f4f4",
    padding: "90px 20px 100px",
    textAlign: "center"
  },

  whyTitle: {
    fontSize: "32px",
    marginBottom: "70px",
    fontWeight: "600"
  },

  featuresRow: {
    display: "flex",
    justifyContent: "space-evenly",
    maxWidth: "1200px",
    margin: "0 auto",
    flexWrap: "wrap"
  },

  featureBlock: {
    width: "300px",
    marginBottom: "40px"
  },

  featureHeading: {
    color: "#2e7d32",
    fontSize: "20px",
    marginBottom: "15px",
    fontWeight: "600"
  }
};

export default Home;