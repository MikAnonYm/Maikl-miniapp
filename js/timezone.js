window.MAiKLTime = (()=>{
  const cfg=()=>window.MAIKL_CONFIG;
  const pad=n=>String(n).padStart(2,"0");
  const minutes=s=>{const [h,m]=s.split(":").map(Number);return h*60+m};
  const hhmm=n=>`${pad(Math.floor(n/60))}:${pad(n%60)}`;
  function localZone(){return Intl.DateTimeFormat().resolvedOptions().timeZone||"UTC"}
  function parts(date,zone){const a=new Intl.DateTimeFormat("en-US",{timeZone:zone,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false}).formatToParts(date);const v={};a.forEach(p=>v[p.type]=p.value);return v}
  function offset(date,zone){const v=parts(date,zone);return (Date.UTC(+v.year,+v.month-1,+v.day,+v.hour%24,+v.minute,+v.second)-date.getTime())/60000}
  function toUtc(dateStr,timeStr,zone){const [y,m,d]=dateStr.split("-").map(Number),[h,mi]=timeStr.split(":").map(Number);let x=new Date(Date.UTC(y,m-1,d,h,mi));for(let i=0;i<2;i++)x=new Date(Date.UTC(y,m-1,d,h,mi)-offset(x,zone)*60000);return x}
  function ymd(date,zone){const v=parts(date,zone);return `${v.year}-${v.month}-${v.day}`}
  function weekday(date,zone){const s=new Intl.DateTimeFormat("en-US",{timeZone:zone,weekday:"short"}).format(date);return {Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6,Sun:7}[s]}
  function formatDate(date,zone){return new Intl.DateTimeFormat("ru-RU",{timeZone:zone,weekday:"long",day:"numeric",month:"long"}).format(date)}
  function formatTime(date,zone){return new Intl.DateTimeFormat("ru-RU",{timeZone:zone,hour:"2-digit",minute:"2-digit"}).format(date)}
  function addDays(date,n){return new Date(date.getTime()+n*86400000)}
  function weekDays(offsetWeeks=0){const zone=cfg().maiklTimezone, now=new Date(); const wd=weekday(now,zone); const monday=addDays(now,-(wd-1)+offsetWeeks*7);return Array.from({length:7},(_,i)=>ymd(addDays(monday,i),zone))}
  function individualSlots(dateStr,duration){const zone=cfg().maiklTimezone,noon=toUtc(dateStr,"12:00",zone),wd=weekday(noon,zone),hours=window.MAIKL_WORKING_HOURS[wd];if(!hours)return[];const out=[];for(let t=minutes(hours[0]);t+duration<=minutes(hours[1]);t+=cfg().slotStepMinutes)out.push(hhmm(t));return out}
  function groupSlots(dateStr){const zone=cfg().groupTimezone,noon=toUtc(dateStr,"12:00",zone),wd=weekday(noon,zone);return window.MAIKL_GROUP_HOURS[wd]||[]}
  return {localZone,toUtc,ymd,weekday,formatDate,formatTime,weekDays,individualSlots,groupSlots};
})();
