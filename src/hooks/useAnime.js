import React from "react";

export default function useAnime() {
  async function getRecent(id) {
    const data = await fetch(location.origin + "/api/anime/recent/" + id);
    const json = await data.json();
    return json;
  }
  async function getHome(hours, minute, hour, min) {
    const data = await fetch(
      location.origin + "/api/anime/home",
      (hours === hour && minute === min) ||
        (hours === hour && minute + 1 === min) ||
        (hour < 18 ? hour === hours + 5 && minute === min : "")
        ? { cache: "no-store" }
        : { cache: "force-cache" }
    );
    if (data.length > 0) {
      let json = await data.json();
      console.log(json);
      return json;
    } else {
      const resp = await fetch(
        "https://api-aniwatch.onrender.com/anime/home",
        (hours === hour && minute === min) ||
          (hours === hour && minute + 1 === min) ||
          (hour < 18 ? hour === hours + 5 && minute === min : "")
          ? { cache: "no-store" }
          : { cache: "force-cache" }
      );
      const data = await resp.json();
      console.log(data);
      return data;
    }
  }
  async function getTopAiring(hours, minute, hour, min) {
    const data = await fetch(
      location.origin + "/api/anime/airing",
      (hours === hour && minute === min) ||
        (hours === hour && minute + 1 === min) ||
        (hour < 18 ? hour === hours + 5 && minute === min : "")
        ? { cache: "no-store" }
        : { cache: "force-cache" }
    );
    if (data.length > 0) {
      let json = await data.json();
      console.log(json);
      return json;
    } else {
      // categories -> "most-favorite", "most-popular", "subbed-anime", "dubbed-anime", "recently-updated", "recently-added", "top-upcoming", "top-airing", "movie", "special", "ova", "ona", "tv", "completed"

      const resp = await fetch(
        "https://api-aniwatch.onrender.com/anime/top-airing?page=1",
        (hours === hour && minute === min) ||
          (hours === hour && minute + 1 === min) ||
          (hour < 18 ? hour === hours + 5 && minute === min : "")
          ? { cache: "no-store" }
          : { cache: "force-cache" }
      );
      const data = await resp.json();
      console.log(data);
      return data;
    }
  }
  async function getTopUpcoming(hours, minute, hour, min) {
    const data = await fetch(
      location.origin + "/api/anime/complete",
      (hours === hour && minute === min) ||
        (hours === hour && minute + 1 === min) ||
        (hour < 18 ? hour === hours + 5 && minute === min : "")
        ? { cache: "no-store" }
        : { cache: "force-cache" }
    );
    if (data.length > 0) {
      let json = await data.json();
      console.log(json);
      return json;
    } else {
      // categories -> "most-favorite", "most-popular", "subbed-anime", "dubbed-anime", "recently-updated", "recently-added", "top-upcoming", "top-airing", "movie", "special", "ova", "ona", "tv", "completed"

      const resp = await fetch(
        "https://api-aniwatch.onrender.com/anime/completed?page=1",
        (hours === hour && minute === min) ||
          (hours === hour && minute + 1 === min) ||
          (hour < 18 ? hour === hours + 5 && minute === min : "")
          ? { cache: "no-store" }
          : { cache: "force-cache" }
      );
      const data = await resp.json();
      console.log(data);
      return data;
    }
  }
  async function getTopPopular(hours, minute, hour, min) {
    const data = await fetch(
      location.origin + "/api/anime/popular",
      (hours === hour && minute === min) ||
        (hours === hour && minute + 1 === min) ||
        (hour < 18 ? hour === hours + 5 && minute === min : "")
        ? { cache: "no-store" }
        : { cache: "force-cache" }
    );
    if (data.length > 0) {
      let json = await data.json();
      console.log(json);
      return json;
    } else {
      // categories -> "most-favorite", "most-popular", "subbed-anime", "dubbed-anime", "recently-updated", "recently-added", "top-upcoming", "top-airing", "movie", "special", "ova", "ona", "tv", "completed"

      const resp = await fetch(
        "https://api-aniwatch.onrender.com/anime/most-popular?page=1",
        (hours === hour && minute === min) ||
          (hours === hour && minute + 1 === min) ||
          (hour < 18 ? hour === hours + 5 && minute === min : "")
          ? { cache: "no-store" }
          : { cache: "force-cache" }
      );
      const data = await resp.json();
      console.log(data);
      return data;
    }
  }
  async function getTopFavorite(hours, minute, hour, min) {
    const data = await fetch(
      location.origin + "/api/anime/favourite",
      (hours === hour && minute === min) ||
        (hours === hour && minute + 1 === min) ||
        (hour < 18 ? hour === hours + 5 && minute === min : "")
        ? { cache: "no-store" }
        : { cache: "force-cache" }
    );
    if (data.length > 0) {
      let json = await data.json();
      console.log(json);
      return json;
    } else {
      // categories -> "most-favorite", "most-popular", "subbed-anime", "dubbed-anime", "recently-updated", "recently-added", "top-upcoming", "top-airing", "movie", "special", "ova", "ona", "tv", "completed"

      const resp = await fetch(
        "https://api-aniwatch.onrender.com/anime/most-favorite?page=1",
        (hours === hour && minute === min) ||
          (hours === hour && minute + 1 === min) ||
          (hour < 18 ? hour === hours + 5 && minute === min : "")
          ? { cache: "no-store" }
          : { cache: "force-cache" }
      );
      const data = await resp.json();
      console.log(data);
      return data;
    }
  }
  async function getInfo(id) {
    const data = await fetch(location.origin + "/api/anime/info/" + id);
    if (data.length > 0) {
      let json = await data.json();
      console.log(json);
      return json;
    } else {
      // categories -> "most-favorite", "most-popular", "subbed-anime", "dubbed-anime", "recently-updated", "recently-added", "top-upcoming", "top-airing", "movie", "special", "ova", "ona", "tv", "completed"

      const resp = await fetch(
        "https://api-aniwatch.onrender.com/anime/most?page=1"
      );
      const data = await resp.json();
      console.log(data);
      return data;
    }
  }
  async function getSearch(id) {
    const data = await fetch(
      `https://api-aniwatch.onrender.com/anime/search?q=${id}&page=1`,
      { cache: "force-cache" }
    );
    let json = await data.json();
    console.log(json);
    return json;
  }
  async function getEpisodeGogo(id) {
    try {
      let data = await fetch(location.origin + "/api/anime/gogo/watch" + id, {
        cache: "force-cache",
      });
      let json = await data.json();

      console.log(json);
      return json;
    } catch (error) {
      return [];
    }
  }
  async function getEpisodeAnify(id) {
    let data = await fetch(location.origin + "/api/anime/anify/watch" + id, {
      cache: "force-cache",
    });
    let json = await data.json();

    console.log(json);
    return json;
  }
  async function getAnimeInfo(id, hours, minute, hour, min) {
    let data = await fetch(
      location.origin + `/api/anime/infoT/` + id,
      (hours === hour && minute === min) ||
        (hours === hour && minute + 1 === min) ||
        (hour < 18 ? hour === hours + 5 && minute === min : "")
        ? { cache: "no-store" }
        : { cache: "force-cache" }
    );
    if (data.length > 0) {
      let json = await data.json();
      console.log(json);
      return json;
    } else {
      // categories -> "most-favorite", "most-popular", "subbed-anime", "dubbed-anime", "recently-updated", "recently-added", "top-upcoming", "top-airing", "movie", "special", "ova", "ona", "tv", "completed"

      const resp = await fetch(
        `https://api-aniwatch.onrender.com/anime/info?id=${id}`,
        (hours === hour && minute === min) ||
          (hours === hour && minute + 1 === min) ||
          (hour < 18 ? hour === hours + 5 && minute === min : "")
          ? { cache: "no-store" }
          : { cache: "force-cache" }
      );
      const data = await resp.json();
      console.log(data);
      return data;
    }
  }

  async function getZoroBroStream(id) {
    let data = await fetch(location.origin + `/api/anime/zoroBroStream/` + id, {
      cache: "no-store",
    });
    let json = await data.json();
    console.log(json);
    return json;
  }

  async function getTopOva(hours, minute, hour, min) {
    const data = await fetch(
      location.origin + "/api/anime/ova",
      (hours === hour && minute === min) ||
        (hours === hour && minute + 1 === min) ||
        (hour < 18 ? hour === hours + 5 && minute === min : "")
        ? { cache: "no-store" }
        : { cache: "force-cache" }
    );
    if (data.length > 0) {
      let json = await data.json();
      console.log(json);
      return json;
    } else {
      // categories -> "most-favorite", "most-popular", "subbed-anime", "dubbed-anime", "recently-updated", "recently-added", "top-upcoming", "top-airing", "movie", "special", "ova", "ona", "tv", "completed"

      const resp = await fetch(
        "https://api-aniwatch.onrender.com/anime/ova?page=1",
        (hours === hour && minute === min) ||
          (hours === hour && minute + 1 === min) ||
          (hour < 18 ? hour === hours + 5 && minute === min : "")
          ? { cache: "no-store" }
          : { cache: "force-cache" }
      );
      const data = await resp.json();
      console.log(data);
      return data;
    }
  }
  async function getTopOna(hours, minute, hour, min) {
    const data = await fetch(
      location.origin + "/api/anime/ona",
      (hours === hour && minute === min) ||
        (hours === hour && minute + 1 === min) ||
        (hour < 18 ? hour === hours + 5 && minute === min : "")
        ? { cache: "no-store" }
        : { cache: "force-cache" }
    );
    if (data.length > 0) {
      let json = await data.json();
      console.log(json);
      return json;
    } else {
      // categories -> "most-favorite", "most-popular", "subbed-anime", "dubbed-anime", "recently-updated", "recently-added", "top-upcoming", "top-airing", "movie", "special", "ova", "ona", "tv", "completed"

      const resp = await fetch(
        "https://api-aniwatch.onrender.com/anime/ona?page=1",
        (hours === hour && minute === min) ||
          (hours === hour && minute + 1 === min) ||
          (hour < 18 ? hour === hours + 5 && minute === min : "")
          ? { cache: "no-store" }
          : { cache: "force-cache" }
      );
      const data = await resp.json();
      console.log(data);
      return data;
    }
  }
  async function getTopMovies(hours, minute, hour, min) {
    const data = await fetch(
      location.origin + "/api/anime/movie",
      (hours === hour && minute === min) ||
        (hours === hour && minute + 1 === min) ||
        (hour < 18 ? hour === hours + 5 && minute === min : "")
        ? { cache: "no-store" }
        : { cache: "force-cache" }
    );
    if (data.length > 0) {
      let json = await data.json();
      console.log(json);
      return json;
    } else {
      // categories -> "most-favorite", "most-popular", "subbed-anime", "dubbed-anime", "recently-updated", "recently-added", "top-upcoming", "top-airing", "movie", "special", "ova", "ona", "tv", "completed"

      const resp = await fetch(
        "https://api-aniwatch.onrender.com/anime/movie?page=1",
        (hours === hour && minute === min) ||
          (hours === hour && minute + 1 === min) ||
          (hour < 18 ? hour === hours + 5 && minute === min : "")
          ? { cache: "no-store" }
          : { cache: "force-cache" }
      );
      const data = await resp.json();
      console.log(data);
      return data;
    }
  }
  async function getLatestEpi(hours, minute, hour, min) {
    const data = await fetch(
      location.origin + "/api/anime/latestepi",
      (hours === hour && minute === min) ||
        (hours === hour && minute + 1 === min) ||
        (hour < 18 ? hour === hours + 5 && minute === min : "")
        ? { cache: "no-store" }
        : { cache: "force-cache" }
    );
    if (data.length > 0) {
      let json = await data.json();
      console.log(json);
      return json;
    } else {
      // categories -> "most-favorite", "most-popular", "subbed-anime", "dubbed-anime", "recently-updated", "recently-added", "top-upcoming", "top-airing", "movie", "special", "ova", "ona", "tv", "completed"

      const resp = await fetch(
        "https://api-aniwatch.onrender.com/anime/recently-updated?page=1",
        (hours === hour && minute === min) ||
          (hours === hour && minute + 1 === min) ||
          (hour < 18 ? hour === hours + 5 && minute === min : "")
          ? { cache: "no-store" }
          : { cache: "force-cache" }
      );
      const data = await resp.json();
      console.log(data);
      return data;
    }
  }
  async function getNewAnime(hours, minute, hour, min) {
    const data = await fetch(
      location.origin + "/api/anime/newanime",
      (hours === hour && minute === min) ||
        (hours === hour && minute + 1 === min) ||
        (hour < 18 ? hour === hours + 5 && minute === min : "")
        ? { cache: "no-store" }
        : { cache: "force-cache" }
    );
    if (data.length > 0) {
      let json = await data.json();
      console.log(json);
      return json;
    } else {
      // categories -> "most-favorite", "most-popular", "subbed-anime", "dubbed-anime", "recently-updated", "recently-added", "top-upcoming", "top-airing", "movie", "special", "ova", "ona", "tv", "completed"

      const resp = await fetch(
        "https://api-aniwatch.onrender.com/anime/recently-added?page=1",
        (hours === hour && minute === min) ||
          (hours === hour && minute + 1 === min) ||
          (hour < 18 ? hour === hours + 5 && minute === min : "")
          ? { cache: "no-store" }
          : { cache: "force-cache" }
      );
      const data = await resp.json();
      console.log(data);
      return data;
    }
  }
  async function getUpcoming(hours, minute, hour, min) {
    const data = await fetch(
      location.origin + "/api/anime/upcoming",
      (hours === hour && minute === min) ||
        (hours === hour && minute + 1 === min) ||
        (hour < 18 ? hour === hours + 5 && minute === min : "")
        ? { cache: "no-store" }
        : { cache: "force-cache" }
    );
    if (data.length > 0) {
      let json = await data.json();
      console.log(json);
      return json;
    } else {
      // categories -> "most-favorite", "most-popular", "subbed-anime", "dubbed-anime", "recently-updated", "recently-added", "top-upcoming", "top-airing", "movie", "special", "ova", "ona", "tv", "completed"

      const resp = await fetch(
        "https://api-aniwatch.onrender.com/anime/top-upcoming?page=1",
        (hours === hour && minute === min) ||
          (hours === hour && minute + 1 === min) ||
          (hour < 18 ? hour === hours + 5 && minute === min : "")
          ? { cache: "no-store" }
          : { cache: "force-cache" }
      );
      const data = await resp.json();
      console.log(data);
      return data;
    }
  }
  async function getTopSpecial(hours, minute, hour, min) {
    const data = await fetch(
      location.origin + "/api/anime/special",
      (hours === hour && minute === min) ||
        (hours === hour && minute + 1 === min) ||
        (hour < 18 ? hour === hours + 5 && minute === min : "")
        ? { cache: "no-store" }
        : { cache: "force-cache" }
    );
    if (data.length > 0) {
      let json = await data.json();
      console.log(json);
      return json;
    } else {
      // categories -> "most-favorite", "most-popular", "subbed-anime", "dubbed-anime", "recently-updated", "recently-added", "top-upcoming", "top-airing", "movie", "special", "ova", "ona", "tv", "completed"

      const resp = await fetch(
        "https://api-aniwatch.onrender.com/anime/special?page=1",
        (hours === hour && minute === min) ||
          (hours === hour && minute + 1 === min) ||
          (hour < 18 ? hour === hours + 5 && minute === min : "")
          ? { cache: "no-store" }
          : { cache: "force-cache" }
      );
      const data = await resp.json();
      console.log(data);
      return data;
    }
  }
  async function getRandomAnime(hours, minute, hour, min) {
    const data = await fetch(
      "https://api-aniwatch.onrender.com/anime/random?page=1",
      { cache: "force-cache" }
    );
    if (data.length > 0) {
      let json = await data.json();
      console.log(json);
      return json;
    } else {
      // categories -> "most-favorite", "most-popular", "subbed-anime", "dubbed-anime", "recently-updated", "recently-added", "top-upcoming", "top-airing", "movie", "special", "ova", "ona", "tv", "completed"

      const resp = await fetch(
        "https://api-aniwatch.onrender.com/anime/random?page=1"
      );
      const data = await resp.json();
      console.log(data);
      return data;
    }
  }
  async function getAZ(id) {
    const data = await fetch(`https://api.jikan.moe/v4/anime?letter=${id}`, {
      cache: "force-cache",
    });
    let json = await data.json();
    console.log(json);
    return json;
  }
  async function getEpiZoro(id) {
    const resp = await fetch(
      `https://api-aniwatch.onrender.com/anime/episodes/${id}`
    );
    const data = await resp.json();
    console.log(data);
    return data;
  }
  async function getSuggest(id) {
    const respu = await fetch(
      `https://api-aniwatch.onrender.com/anime/search/suggest?q=${id}`,
      { cache: "force-cache" }
    );
    const datau = await respu.json();
    return datau;
  }
  async function getZoroStream(episo, server, sub) {
    const resp = await fetch(
      `https://api-aniwatch.onrender.com/anime/episode-srcs?id=${episo}&serverId=${server}&category=${sub}`,
      { cache: "force-cache" }
    );
    const data = await resp.json();
    console.log(data);
    return data;
  }

  async function getEpisodesAnify(id) {
    try {
      const resp = await fetch(
        `https://api.anify.tv/sources?providerId=gogoanime&watchId=%2F${id}&episodeNumber=10&id=148969&subType=sub&server=gogocdn`,
        { cache: "force-cache" }
      );

      const data = await resp.json();
      console.log(data);
      return data;
    } catch (error) {
      return [];
    }
  }
  return {
    getEpisodeGogo,
    getEpisodeAnify,
    getInfo,
    getRecent,
    getHome,
    getTopUpcoming,
    getTopPopular,
    getTopAiring,
    getTopFavorite,
    getTopMovies,
    getTopOna,
    getTopOva,
    getTopSpecial,
    getAnimeInfo,
    getRandomAnime,
    getSearch,
    getAZ,
    getEpiZoro,
    getSuggest,
    getZoroStream,
    getEpisodesAnify,
    getLatestEpi,
    getNewAnime,
    getUpcoming,
    getZoroBroStream,
  };
}
