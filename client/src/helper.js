const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "b9879e1850mshf1077a3346ff045p19618ajsnb13d9e1ab40c",
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
  },
};

export async function getPlaylistBySearch(query) {
  try {
    query = query.replaceAll(" ", "%20");

    const response = await fetch(
      `https://youtube-search-and-download.p.rapidapi.com/search?query=${query}&hl=en&gl=US&type=p&sort=r`,
      options
    );

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err.message);
  }
}

export async function getPlaylistById(playlistId) {
    try {
        const response = await fetch(`https://youtube-search-and-download.p.rapidapi.com/playlist?id=${playlistId}`, options)

        const data = await response.json()
        return data
    } catch(err){
        console.log(err)
    }
}
