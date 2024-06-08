import React from "react";
import WatchAnime from "../../WatchAnime/WatchAnime";

export default async function page({ params, searchParams }) {
  const epis = searchParams.ep;

  const resp = await fetch(
    `https://api-aniwatch.onrender.com/anime/episodes/${params.id}`
  );
  const data = await resp.json();

  const epId = epis ? params.id + "?ep=" + epis : data?.episodes[0]?.episodeId;
  let epiod = 0;
  let i = 0;
  for (i > 0; i < data.episodes.length; i++) {
    if (data?.episodes[i].episodeId.includes(epis.toSting())) {
      console.log(data.episodes[i].number);
      epiod = data.episodes[i].number;
    }
  }
  const epiox = searchParams.ep;
  const respo = await fetch(
    `https://api-aniwatch.onrender.com/anime/servers?episodeId=${epId}`
  );
  const datal = await respo?.json();

  const serverId =
    datal?.sub.length > 0 ? datal?.sub[0]?.serverId : datal?.raw[0]?.serverId;
  const respi = await fetch(
    `https://api-aniwatch.onrender.com/anime/episode-srcs?id=${epId}&serverId=${serverId}&category=sub`
  );
  const datai = await respi.json();

  const respl = await fetch(
    `https://api-aniwatch.onrender.com/anime/info?id=${params.id}`
  );
  const datao = await respl.json();

  const respu = await fetch(
    `https://api-aniwatch.onrender.com/anime/search/suggest?q=${params.id}`
  );
  const datau = await respu.json();
  console.log(datau);
  let jname = ''
  datau.map((i)=>{
    if(i.id===params.id){
      jname = i.jname
    }
  }) 
  return (
    <div>
      <WatchAnime
        data={data}
        datal={datal}
        datai={datai}
        anId={params.id}
        datao={datao}
        epiox={epiox}
        jname={datau}
      />
    </div>
  );
}
