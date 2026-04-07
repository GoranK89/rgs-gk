const BASE_URL = "http://localhost:3000";

const spin = async ({ token, betAmount, gameId }) => {
  try {
    const response = await fetch(`${BASE_URL}/api/spin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ betAmount, gameId }),
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

export { spin };
