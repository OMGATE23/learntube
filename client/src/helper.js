import { API_URL } from "./helpers/constants";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "96ff7fd609msh42f0999ddc4f585p157691jsn1f6a8eaf3666",
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
    const response = await fetch(
      `https://youtube-search-and-download.p.rapidapi.com/playlist?id=${playlistId}`,
      options
    );

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function enrollPlaylistById(playlistId) {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user._id, playlistId);

    const response = await fetch(API_URL + "/user/enroll", {
      method: "PUT",
      body: JSON.stringify({
        userId: user._id,
        playlistId: playlistId,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getEnrolledPlaylists(token) {
  try {
    const response = await fetch(API_URL + "/user/getuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    });
    const data = await response.json();
    console.log(data.user.enrolled_playlists);

    return data.user.enrolled_playlists;
  } catch (err) {
    console.log(err.message);
  }
}

export async function updateVideoProgress(playlistId, videoId) {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    const response = await fetch(API_URL + "/user/updateprogress", {
      method: "PUT",
      body: JSON.stringify({
        userId: user._id,
        playlistId: playlistId,
        videoId: videoId,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function addPoint(token) {
  try {
    const response = await fetch(API_URL + "/user/addpoint", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    });
    const data = await response.json();
    console.log(data);

    return data;
  } catch (err) {
    console.log(err.message);
  }
}

export async function getLeaderboard() {
  try {
    const response = await fetch(API_URL + "/user/leaderboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
