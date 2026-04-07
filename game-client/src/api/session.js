const BASE_URL = "http://localhost:3000";

const createSession = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playerId: "testacc1",
        operatorId: "genericCasino",
        balance: 1000,
        currency: "EUR",
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export { createSession };
