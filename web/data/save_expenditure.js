export default async function saveExpenditure(data, token) {
  let API_URL = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${API_URL}/expenditures/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (res.status === 200) {
    return res.json().then((data) => {
      return data;
    });
  }
}
