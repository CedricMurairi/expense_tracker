async function fetch_recommendations(input_data) {
  let API_URL = process.env.NEXT_PUBLIC_DEV_API_URL;
  if (process.env.NODE_ENV === "production") {
    API_URL = process.env.NEXT_PUBLIC_PROD_API_URL;
  }

  const res = await fetch(`${API_URL}/recommendation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input_data),
  });
  if (res.status === 200) {
    return res.json().then((data) => {
      return data;
    });
  }
}

export default fetch_recommendations;
