async function fetch_recommendations(input_data, token) {
  let API_URL = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${API_URL}/recommendations/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
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
