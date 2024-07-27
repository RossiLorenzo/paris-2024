export default function clean_schedules(s){
    // Create a reshaped array containing events for the italians
    const schedule_italians = s.units.filter(x => (x['competitors'] || []).filter(y => y.noc === 'ITA').length > 0);
    if (schedule_italians.length == 0) {
      return([]);
    }
    return(
        schedule_italians.map((event) => {
          // Extract info
          const is_h2h = event.competitors.length == 2;
          const italians = event.competitors.filter(x => x.noc === 'ITA');
          const non_italians = event.competitors.filter(x => x.noc != 'ITA');
          // Reshaped data
          return({
            "id": event.id,
            "disciplineName": event.disciplineName,
            "eventUnitName": event.eventUnitName,
            "disciplineCode": event.disciplineCode,
            "medalFlag": event.medalFlag,
            "liveFlag": event.liveFlag,
            "is_h2h": is_h2h,
            "status": event.status,
            "italians_names": italians.map(x => x.name),
            "italians_ids": italians.map(x => x.code),
            "italians_winners": italians.map(x => ((x['results'] || [])["winnerLoserTie"] || '')),
            "opponents_names": non_italians.map(x => x.name),
            "opponents_nocs": non_italians.map(x => x.noc),
            "url": event.extraData.detailUrl,
            "startDate": (new Date(event.startDate)).toLocaleTimeString().slice(0, 5)
          })
        })
    )
}