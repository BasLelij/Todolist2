export async function postData(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    console.log(response);
    const jsonData = await response.json();
    console.log(jsonData);
    console.log(jsonData.description);
  } catch (error) {
    console.log(error);
  }
}
