import React from "react";

export default function useAnime() {
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
      const data = await fetch(location.origin + "/api/anime/home", {cache: 'no-store'})
      let json = await data.json();
      console.log(json);
      return json;
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
    let json = await data.json();
    console.log(json);
    return json;
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
      const datal = await fetch(location.origin + "/api/anime/complete", {cache: 'no-store'})
      let json = await datal.json();
      console.log(json);
      return json;
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
      const data = await fetch(location.origin + "/api/anime/popular", {cache: 'no-store'})
      let json = await data.json();
      console.log(json);
      return json;
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
      const data = await fetch(location.origin + "/api/anime/favourite", {cache: 'no-store'})
      let json = await data.json();
      console.log(json);
      return json;
    }
  }
  async function getInfo(id) {
    const data = await fetch(location.origin + "/api/anime/info/" + id);
    let json = await data.json();
    console.log(json);
    return json;
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

  async function getSuggestSearch(id) {
    try {
      let data = await fetch(location.origin + "/api/anime/suggest/" + id, {
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
      cache: 'force-cache',
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
      const data = await fetch(location.origin + "/api/anime/infoT/" + id, {cache: 'no-store'})
      let json = await data.json();
      console.log(json);
      return json;
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
      const data = await fetch(location.origin + "/api/anime/ova", {cache: 'no-store'})
      let json = await data.json();
      console.log(json);
      return json;
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
      const data = await fetch(location.origin + "/api/anime/ona", {cache: 'no-store'})
      let json = await data.json();
      console.log(json);
      return json;
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
      const data = await fetch(location.origin + "/api/anime/movie", {cache: 'no-store'})
      let json = await data.json();
      console.log(json);
      return json;
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
      const data = await fetch(location.origin + "/api/anime/latestepi", {cache: 'no-store'})
      let json = await data.json();
      console.log(json);
      return json;
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
      const data = await fetch(location.origin + "/api/anime/newanime", {cache: 'no-store'})
      let json = await data.json();
      console.log(json);
      return json;
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
      const data = await fetch(location.origin + "/api/anime/upcoming", {cache: 'no-store'})
      let json = await data.json();
      console.log(json);
      return json;
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
      const data = await fetch(location.origin + "/api/anime/special", {cache: 'no-store'})
      let json = await data.json();
      console.log(json);
      return json;
    }
  }
  async function getRandomAnime(hours, minute, hour, min) {
    const data = await fetch(
      "https://aniwatch-api-8fti.onrender.com/anime/random?page=1",
      { cache: "force-cache" }
    );
    let json = await data.json();
    console.log(json);
    return json;
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
      `https://aniwatch-api-8fti.onrender.com/anime/episodes/${id}`
    );
    const data = await resp.json();
    console.log(data);
    return data;
  }
  async function getSuggest(id) {
    const respu = await fetch(
      `https://aniwatch-api-8fti.onrender.com/anime/search/suggest?q=${id}`,
      { cache: "force-cache" }
    );
    const datau = await respu.json();
    return datau;
  }
  async function getZoroStream(episo, server, sub) {
    const resp = await fetch(
      `https://aniwatch-api-8fti.onrender.com/anime/episode-srcs?id=${episo}&serverId=${server}&category=${sub}`,
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
    getEpisodesAnify,
    getLatestEpi,
    getNewAnime,
    getUpcoming,
    getZoroStream,
    getZoroBroStream,
    getSuggestSearch,
  };
}
