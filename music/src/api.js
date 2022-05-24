import { getToken } from "./bootstrap"

async function getList() {
  const res = await fetch("https://buildingmfe.maxgallo.io/api/songs", {
    headers: {
      "Authorization": `Bearer ${getToken()}`,
      "Accept": "application/json",
    }
  })
  try {
    const {data} = await res.json()
    return data.songs
  }
  catch (e) {
    console.error("Request failed ", e)
    return []
  }
}

export { getList }
