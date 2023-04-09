const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function getDashboardData(data) {

    const enrolledPlaylistCount = data.length;

    let videos = [];

    data.forEach(playlist => {
        videos =  [...videos, ...playlist.video_id]
    })

    const analysis = {
        "Sunday": 0,
        "Monday": 0,
        "Tuesday": 0,
        "Wednesday": 0,
        "Thursday": 0,
        "Friday": 0,
        "Saturday": 0,
    }

    videos.forEach(video => {
        const date = new Date(video.date);
        const day = days[date.getDay()];
        analysis[day] += 1
    })

    return {
        enrolledPlaylistCount,
        videoCount: videos.length,
        analysis
    }
}