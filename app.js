
const VK_BOOKING_URL = "https://vk.ru/service-booking-177750329";
const TELEGRAM_CONTACT = "maikl_prod";
const MAIKL_PLUS_URL = "https://t.me/+OLayyhn3yRQ3MWFi";
const MAIKL_TIMEZONE = "Asia/Yekaterinburg";

const WORKING_HOURS = {
  1: ["10:00","22:00"], // Monday
  2: ["10:00","16:30"], // Tuesday
  3: ["10:00","23:00"], // Wednesday
  4: ["10:00","16:30"], // Thursday
  5: ["10:00","22:00"]  // Friday
};
const SLOT_STEP_MIN = 15;

const LESSONS = [
  ["B1/B2","2 000 ₽","60 минут","Для общего прогресса, уверенности и системной практики."],
  ["C1/C2","3 000 ₽","60 минут","Продвинутый французский: точность, нюансы и естественная речь."],
  ["DELF/DALF","3 000 ₽","60 минут","Подготовка к экзамену с фокусом на формат и результат."],
  ["ОГЭ/ЕГЭ","3 000 ₽","60 минут","Стратегия, практика и разбор слабых мест."]
];
const CONSULT = [
  ["15 минут","750 ₽",15],
  ["30 минут","1 000 ₽",30],
  ["60 минут","2 000 ₽",60]
];

function tg(){ return window.Telegram?.WebApp || null; }
function initTelegram(){
  try{
    const app=tg();
    if(app){ app.ready(); app.expand(); app.setHeaderColor?.("#f7f7f2"); app.setBackgroundColor?.("#f7f7f2"); }
  }catch(_){}
}
function openUrl(url){
  try{ const app=tg(); if(app?.openLink) return app.openLink(url); }catch(_){}
  window.location.href=url;
}
function openTelegram(text){
  const url=`https://t.me/${TELEGRAM_CONTACT}?text=${encodeURIComponent(text)}`;
  openUrl(url);
}
function esc(s=""){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function render(html){
  document.getElementById("app").innerHTML=html;
  document.querySelectorAll("[data-back]").forEach(b=>b.onclick=()=>history.back());
  document.querySelectorAll("[data-route]").forEach(b=>b.onclick=()=>navigate(b.dataset.route));
  window.scrollTo({top:0,behavior:"instant"});
}
function topbar(){return `<div class="topbar"><button class="back" data-back>← Назад</button><div class="top-mark">MAiKL.</div></div>`;}
function navigate(route,state={}){
  history.pushState({route,state},"",`#${route}`);
  routeView(route,state);
}
function minutes(v){const [h,m]=v.split(":").map(Number);return h*60+m}
function hhmm(total){const h=Math.floor(total/60),m=total%60;return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`}

function localZone(){
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
}
function ymd(date,zone){
  const parts=new Intl.DateTimeFormat("en-CA",{timeZone:zone,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(date);
  const g=t=>parts.find(p=>p.type===t)?.value;
  return `${g("year")}-${g("month")}-${g("day")}`;
}
function weekdayInZone(date,zone){
  const s=new Intl.DateTimeFormat("en-US",{timeZone:zone,weekday:"short"}).format(date);
  return ({Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6,Sun:7})[s];
}
function offsetMinutesForZone(date,zone){
  const parts = new Intl.DateTimeFormat("en-US",{
    timeZone:zone,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false
  }).formatToParts(date);
  const v={}; parts.forEach(p=>v[p.type]=p.value);
  const asUTC=Date.UTC(+v.year,+v.month-1,+v.day,+v.hour,+v.minute,+v.second);
  return (asUTC-date.getTime())/60000;
}
function zonedDateTimeToUtc(dateStr,timeStr,zone){
  const [y,mo,d]=dateStr.split("-").map(Number);
  const [h,mi]=timeStr.split(":").map(Number);
  let guess=new Date(Date.UTC(y,mo-1,d,h,mi,0));
  for(let i=0;i<2;i++){
    const off=offsetMinutesForZone(guess,zone);
    guess=new Date(Date.UTC(y,mo-1,d,h,mi,0)-off*60000);
  }
  return guess;
}
function formatLocal(date,zone){
  return new Intl.DateTimeFormat("ru-RU",{
    timeZone:zone,weekday:"short",day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"
  }).format(date);
}
function nextWorkingDays(count=7){
  const out=[];
  let cursor=new Date();
  for(let i=0;i<21 && out.length<count;i++){
    const d=new Date(cursor.getTime()+i*86400000);
    const wd=weekdayInZone(d,MAIKL_TIMEZONE);
    if(WORKING_HOURS[wd]) out.push({date:ymd(d,MAIKL_TIMEZONE),wd});
  }
  return out;
}
function slotsFor(dateStr,durationMin){
  const noon=zonedDateTimeToUtc(dateStr,"12:00",MAIKL_TIMEZONE);
  const wd=weekdayInZone(noon,MAIKL_TIMEZONE);
  const hours=WORKING_HOURS[wd];
  if(!hours) return [];
  const start=minutes(hours[0]), end=minutes(hours[1]);
  const arr=[];
  for(let t=start;t+durationMin<=end;t+=SLOT_STEP_MIN) arr.push(hhmm(t));
  return arr;
}

function home(){
  render(`
  <section class="screen">
    <header class="brand-head">
      <div>
        <div class="brand-wrap"><h1 class="brand">MAiKL.</h1><div class="crown">♛</div></div>
        <div class="brush-line"></div>
        <p class="tagline">Французский. По-настоящему.</p>
      </div>
    </header>
    <div class="intro"><h2>С ЧЕГО НАЧНЁМ?</h2><p>Выбери формат — дальше только нужные шаги.</p></div>
    <div class="cards">
      <button class="nav-card" data-route="zoom"><span class="icon">💻</span><span><strong>ВСТРЕТИТЬСЯ С MAiKL. В ZOOM</strong><small>Уроки, разговорный, консультация</small></span><span class="chev">›</span></button>
      <button class="nav-card" data-route="phone"><span class="icon">📱</span><span><strong>MAiKL. В ТВОЁМ СМАРТФОНЕ</strong><small>Звонки, сообщения, консультация</small></span><span class="chev">›</span></button>
      <button class="nav-card" data-route="services"><span class="icon">🎟</span><span><strong>УСЛУГИ</strong><small>Для студентов, компаний, школ и переводчиков</small></span><span class="chev">›</span></button>
      <button class="nav-card" data-route="plus"><span class="icon">💎</span><span><strong>MAiKL.+</strong><small>Закрытый Telegram • 250 ⭐ / месяц</small></span><span class="chev">›</span></button>
    </div>
  </section>`);
}
function zoom(){
  render(`<section class="screen">${topbar()}<div class="kicker">УРОВЕНЬ 2</div><h1 class="page-title">ВСТРЕТИТЬСЯ С MAiKL. В ZOOM</h1><p class="lead">Выбери формат встречи.</p>
  <div class="cards">
    <button class="choice-card" data-route="lesson-list"><span class="icon">📚</span><span><strong>Уроки французского</strong><small>B1/B2 • C1/C2 • DELF/DALF • ОГЭ/ЕГЭ</small></span><span class="chev">›</span></button>
    <button class="choice-card" data-route="conversation-list"><span class="icon">⭐</span><span><strong>Разговорный с MAiKL.</strong><small>Индивидуально или в группе</small></span><span class="chev">›</span></button>
    <button class="choice-card" data-route="consult-list"><span class="icon">🗣</span><span><strong>Консультация</strong><small>15 / 30 / 60 минут</small></span><span class="chev">›</span></button>
  </div></section>`);
}
function lessonList(){
  render(`<section class="screen">${topbar()}<div class="kicker">УРОВЕНЬ 2</div><h1 class="page-title">УРОКИ ФРАНЦУЗСКОГО</h1><p class="lead">Выбери направление.</p>
  <div class="cards">${LESSONS.map((x,i)=>`<button class="choice-card" data-lesson="${i}"><span class="icon">📘</span><span><strong>${x[0]}</strong><small>${x[1]} • ${x[2]}</small></span><span class="chev">›</span></button>`).join("")}</div></section>`);
  document.querySelectorAll("[data-lesson]").forEach(b=>b.onclick=()=>{
    const x=LESSONS[+b.dataset.lesson]; navigate("bookable",{title:x[0],price:x[1],duration:x[2],desc:x[3]});
  });
}
function conversationList(){
  render(`<section class="screen">${topbar()}<div class="kicker">УРОВЕНЬ 2</div><h1 class="page-title">РАЗГОВОРНЫЙ С MAiKL.</h1><p class="lead">Выбери формат.</p>
  <div class="cards">
    <button class="choice-card" id="conv1"><span class="icon">👤</span><span><strong>Индивидуально</strong><small>2 000 ₽ • 60 минут</small></span><span class="chev">›</span></button>
    <button class="choice-card" id="conv2"><span class="icon">👥</span><span><strong>В группе</strong><small>1 500 ₽ / человек • 90 минут</small></span><span class="chev">›</span></button>
  </div></section>`);
  document.getElementById("conv1").onclick=()=>navigate("bookable",{title:"Разговорный с MAiKL. — индивидуально",price:"2 000 ₽",duration:"60 минут",desc:"Естественная разговорная практика один на один."});
  document.getElementById("conv2").onclick=()=>navigate("request",{title:"Разговорный с MAiKL. — в группе",price:"1 500 ₽ / человек",durationMin:90,durationText:"90 минут",type:"Разговорный в группе",cta:"ХОЧУ В ГРУППУ"});
}
function consultList(){
  render(`<section class="screen">${topbar()}<div class="kicker">УРОВЕНЬ 2</div><h1 class="page-title">КОНСУЛЬТАЦИЯ</h1><p class="lead">Выбери длительность.</p>
  <div class="cards">${CONSULT.map((x,i)=>`<button class="choice-card" data-cons="${i}"><span class="icon">🗣</span><span><strong>${x[0]}</strong><small>${x[1]}</small></span><span class="chev">›</span></button>`).join("")}</div></section>`);
  document.querySelectorAll("[data-cons]").forEach(b=>b.onclick=()=>{
    const x=CONSULT[+b.dataset.cons];navigate("bookable",{title:`Консультация • ${x[0]}`,price:x[1],duration:x[0],desc:"Конкретный вопрос, объяснение, совет или разбор."});
  });
}
function bookable(s){
  render(`<section class="screen">${topbar()}<div class="kicker">УРОВЕНЬ 3</div><div class="detail"><h3>${esc(s.title)}</h3><p>${esc(s.desc||"")}</p><div class="price">${esc(s.price||"")}</div><div class="meta">${esc(s.duration||"")}</div><button class="cta" id="book">ЗАПИСАТЬСЯ</button><p class="helper">Откроется VK «Моё время» — без промежуточного экрана.</p></div></section>`);
  document.getElementById("book").onclick=()=>openUrl(VK_BOOKING_URL);
}
function phone(){
  render(`<section class="screen">${topbar()}<div class="kicker">УРОВЕНЬ 2</div><h1 class="page-title">MAiKL. В ТВОЁМ СМАРТФОНЕ</h1><p class="lead">Выбери формат.</p>
  <div class="cards">
    <button class="choice-card" data-route="phone-maikl"><span class="icon">📱</span><span><strong>MAiKL. на связи</strong><small>Аудиозвонок или сообщения + голосовые</small></span><span class="chev">›</span></button>
    <button class="choice-card" data-route="phone-cons"><span class="icon">🗣</span><span><strong>Консультация</strong><small>Конкретный вопрос / помощь / совет</small></span><span class="chev">›</span></button>
  </div></section>`);
}
function phoneMaikl(){
  render(`<section class="screen">${topbar()}<div class="kicker">УРОВЕНЬ 2</div><h1 class="page-title">MAiKL. НА СВЯЗИ</h1><p class="lead">Выбери формат и длительность.</p>
  <div class="detail" style="margin-top:20px">
    <h3>Аудиозвонок</h3>
    <div class="option-list">
      ${[["15 минут","750 ₽",15],["30 минут","1 000 ₽",30],["60 минут","1 500 ₽",60]].map(x=>`<button class="option req" data-format="Аудиозвонок" data-dur="${x[2]}" data-durtxt="${x[0]}" data-price="${x[1]}"><b>${x[0]}</b><span>${x[1]} ›</span></button>`).join("")}
    </div><div class="hr"></div>
    <h3>Сообщения + голосовые</h3>
    <div class="option-list">
      ${[["15 минут","500 ₽",15],["30 минут","750 ₽",30],["60 минут","1 000 ₽",60]].map(x=>`<button class="option req" data-format="Сообщения + голосовые" data-dur="${x[2]}" data-durtxt="${x[0]}" data-price="${x[1]}"><b>${x[0]}</b><span>${x[1]} ›</span></button>`).join("")}
    </div>
  </div></section>`);
  document.querySelectorAll(".req").forEach(b=>b.onclick=()=>navigate("request",{title:`MAiKL. на связи • ${b.dataset.format}`,type:`MAiKL. на связи — ${b.dataset.format}`,price:b.dataset.price,durationMin:+b.dataset.dur,durationText:b.dataset.durtxt,cta:"ОТПРАВИТЬ ЗАЯВКУ"}));
}
function phoneCons(){
  render(`<section class="screen">${topbar()}<div class="kicker">УРОВЕНЬ 2</div><h1 class="page-title">КОНСУЛЬТАЦИЯ В TELEGRAM</h1><p class="lead">Выбери длительность.</p>
  <div class="cards">${CONSULT.map((x,i)=>`<button class="choice-card" data-pc="${i}"><span class="icon">🗣</span><span><strong>${x[0]}</strong><small>${x[1]}</small></span><span class="chev">›</span></button>`).join("")}</div></section>`);
  document.querySelectorAll("[data-pc]").forEach(b=>b.onclick=()=>{const x=CONSULT[+b.dataset.pc];navigate("request",{title:"Консультация в Telegram",type:"Консультация в Telegram",price:x[1],durationMin:x[2],durationText:x[0],cta:"ОТПРАВИТЬ ЗАЯВКУ"});});
}
const SERVICE_TYPES=[["Услуги для студентов","🎓"],["Составление документов","📄"],["Услуги для компаний","🏢"],["Услуги для языковых школ","🏫"],["Услуги для переводчиков","🌍"]];
function services(){
  render(`<section class="screen">${topbar()}<div class="kicker">УРОВЕНЬ 2</div><h1 class="page-title">УСЛУГИ</h1><p class="lead">Выбери направление.</p><div class="cards">${SERVICE_TYPES.map((x,i)=>`<button class="choice-card" data-srv="${i}"><span class="icon">${x[1]}</span><span><strong>${x[0]}</strong><small>Стоимость — по запросу</small></span><span class="chev">›</span></button>`).join("")}</div></section>`);
  document.querySelectorAll("[data-srv]").forEach(b=>b.onclick=()=>{const x=SERVICE_TYPES[+b.dataset.srv];navigate("request",{title:x[0],type:x[0],price:"По запросу",durationMin:30,durationText:"Связь / уточнение запроса",cta:"ОТПРАВИТЬ ЗАЯВКУ",serviceMode:true});});
}
function requestForm(s){
  const zone=localZone();
  const days=nextWorkingDays(8);
  render(`<section class="screen">${topbar()}<div class="kicker">УРОВЕНЬ 3 • ЗАЯВКА</div>
  <div class="detail">
    <h3>${esc(s.title)}</h3>
    ${s.price?`<div class="price">${esc(s.price)}</div>`:""}
    ${s.durationText?`<div class="meta">${esc(s.durationText)}</div>`:""}
    <div class="schedule-head"><strong>🕒 Время отображается по твоему часовому поясу</strong>Твой пояс: ${esc(zone)}<br>Рабочий график MAiKL. хранится в Asia/Yekaterinburg (UTC+5).</div>
    <div class="notice">Это желаемое время. Заявка не считается подтверждённой, пока MAiKL. её не подтвердит.</div>
    <div class="days" id="days">${days.map((d,i)=>`<button class="day ${i===0?"active":""}" data-date="${d.date}"><strong>${new Intl.DateTimeFormat("ru-RU",{timeZone:MAIKL_TIMEZONE,weekday:"short"}).format(zonedDateTimeToUtc(d.date,"12:00",MAIKL_TIMEZONE))}</strong><span>${new Intl.DateTimeFormat("ru-RU",{timeZone:MAIKL_TIMEZONE,day:"2-digit",month:"2-digit"}).format(zonedDateTimeToUtc(d.date,"12:00",MAIKL_TIMEZONE))}</span></button>`).join("")}</div>
    <div class="slots" id="slots"></div>
    <div class="form">
      <div class="field"><label>Уровень французского / пометка</label><input id="level" placeholder="Например: B1"></div>
      <div class="field"><label>Комментарий для MAiKL.</label><textarea id="note" placeholder="Вопрос, задача, пожелания..."></textarea></div>
      <div class="summary" id="summary">Выбери дату и время.</div>
      <button class="cta secondary" id="send" disabled>${esc(s.cta||"ОТПРАВИТЬ ЗАЯВКУ")}</button>
    </div>
  </div></section>`);

  let selectedDate=days[0]?.date || null;
  let selectedTime=null;

  function drawSlots(){
    const root=document.getElementById("slots");
    const slots=slotsFor(selectedDate,s.durationMin||30);
    root.innerHTML=slots.length?slots.map(t=>{
      const utc=zonedDateTimeToUtc(selectedDate,t,MAIKL_TIMEZONE);
      const local=new Intl.DateTimeFormat("ru-RU",{timeZone:zone,hour:"2-digit",minute:"2-digit"}).format(utc);
      return `<button class="slot" data-time="${t}">${local}</button>`;
    }).join(""):`<div class="empty" style="grid-column:1/-1">Нет доступных слотов.</div>`;
    root.querySelectorAll(".slot").forEach(b=>b.onclick=()=>{
      root.querySelectorAll(".slot").forEach(x=>x.classList.remove("active"));
      b.classList.add("active");selectedTime=b.dataset.time;updateSummary();
    });
    selectedTime=null;updateSummary();
  }
  function updateSummary(){
    const box=document.getElementById("summary"),send=document.getElementById("send");
    if(!selectedDate||!selectedTime){box.textContent="Выбери дату и время.";send.disabled=true;return;}
    const utc=zonedDateTimeToUtc(selectedDate,selectedTime,MAIKL_TIMEZONE);
    const local=formatLocal(utc,zone);
    const maikl=formatLocal(utc,MAIKL_TIMEZONE);
    box.textContent=`Твоё время: ${local} (${zone})\nДля MAiKL.: ${maikl} (${MAIKL_TIMEZONE})`;
    send.disabled=false;
  }
  document.querySelectorAll(".day").forEach(b=>b.onclick=()=>{
    document.querySelectorAll(".day").forEach(x=>x.classList.remove("active"));b.classList.add("active");
    selectedDate=b.dataset.date;drawSlots();
  });
  drawSlots();

  document.getElementById("send").onclick=()=>{
    if(!selectedDate||!selectedTime)return;
    const utc=zonedDateTimeToUtc(selectedDate,selectedTime,MAIKL_TIMEZONE);
    const level=document.getElementById("level").value.trim();
    const note=document.getElementById("note").value.trim();
    const text=[
      "Привет, MAiKL.! 👋",
      `Заявка: ${s.type||s.title}`,
      s.durationText?`Формат / длительность: ${s.durationText}`:null,
      s.price?`Стоимость: ${s.price}`:null,
      `Желаемое время клиента: ${formatLocal(utc,zone)} (${zone})`,
      `Время MAiKL.: ${formatLocal(utc,MAIKL_TIMEZONE)} (${MAIKL_TIMEZONE})`,
      level?`Уровень / пометка: ${level}`:null,
      note?`Комментарий: ${note}`:null,
      "",
      "Заявка требует подтверждения."
    ].filter(Boolean).join("\n");
    openTelegram(text);
  };
}
function plus(){
  render(`<section class="screen">${topbar()}<div class="kicker">УРОВЕНЬ 3</div><div class="detail"><span class="badge">💎 TELEGRAM</span><h3 style="margin-top:14px">MAiKL.+</h3><p>Эксклюзивный контент, закрытый чат подписчиков, где есть сам MAiKL., и поддержка развития проекта.</p><div class="price">250 ⭐ / месяц</div><button class="cta" id="plus">ПОДПИСАТЬСЯ</button></div></section>`);
  document.getElementById("plus").onclick=()=>openUrl(MAIKL_PLUS_URL);
}
function routeView(route,state={}){
  ({home,zoom,"lesson-list":lessonList,"conversation-list":conversationList,"consult-list":consultList,bookable,phone,"phone-maikl":phoneMaikl,"phone-cons":phoneCons,services,request:requestForm,plus}[route]||home)(state);
}
window.addEventListener("popstate",()=>routeView((location.hash||"#home").slice(1),history.state?.state||{}));
document.addEventListener("DOMContentLoaded",()=>{initTelegram();routeView((location.hash||"#home").slice(1),{});});
