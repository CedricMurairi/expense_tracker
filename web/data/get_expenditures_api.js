export default async function getExpendituresFromAPI(token) {
    let API_URL = process.env.NEXT_PUBLIC_API_URL;
  
    const res = await fetch(`${API_URL}/expenditures/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      return res.json().then((data) => {
        return data;
      });
    }
  }
  