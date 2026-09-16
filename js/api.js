(()=>{
const C=window.MAIKL_CONFIG;
const demoKey="maikl_v41_demo_bookings";
const configured=()=>Boolean(C.apiBaseUrl&&/^https:\/\//.test(C.apiBaseUrl));
const read=()=>{try{return JSON.parse(localStorage.getItem(demoKey)||"[]")}catch{return []}};
const write=x=>localStorage.setItem(demoKey,JSON.stringify(x));
async function request(path,opts={}){const r=await fetch(C.apiBaseUrl+path,{...opts,headers:{"Content-Type":"application/json",...(opts.headers||{})}});if(!r.ok)throw new Error((await r.text())||`HTTP ${r.status}`);return r.status===204?null:r.json()}
async function listBookings(from,to){if(configured())return request(`/bookings?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);return read().filter(x=>x.starts_at<to&&x.ends_at>from&&x.status!=="cancelled")}
async function createBooking(payload){if(configured())return request("/bookings",{method:"POST",body:JSON.stringify(payload)});const rows=read();const cap=payload.group?C.groupCapacity:1;const overlap=rows.filter(x=>x.status!=="cancelled"&&x.service_id===payload.service_id&&x.starts_at===payload.starts_at);if(overlap.length>=cap)throw new Error("Этот слот уже занят.");const row={...payload,id:crypto.randomUUID(),status:"confirmed",created_at:new Date().toISOString()};rows.push(row);write(rows);return row}
async function myBookings(userKey){if(configured())return request(`/bookings/mine?user_key=${encodeURIComponent(userKey)}`);return read().filter(x=>x.user_key===userKey&&x.status!=="cancelled").sort((a,b)=>a.starts_at.localeCompare(b.starts_at))}
window.MAiKLAPI={configured,listBookings,createBooking,myBookings};
})();
