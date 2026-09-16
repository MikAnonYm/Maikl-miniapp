window.MAIKL_CONFIG = {
  apiBaseUrl: "",
  maiklTimezone: "Asia/Yekaterinburg",
  groupTimezone: "Europe/Moscow",
  slotStepMinutes: 30,
  groupCapacity: 4,
  minimumBookingLeadMinutes: 120,
  socials: {
    telegram: "https://t.me/maikl_prod",
    vk: "https://vk.com/maikl_prod",
    instagram: "https://www.instagram.com/maikl_prod/"
  },

  serviceLinks: {
    students: {title:"Для студентов", telegram:"https://t.me/maikl_prod/23/237", vk:"https://vk.ru/market/product/127891-uslugi-dlya-studentov-177750329-13886367"},
    documents: {title:"Работа с документами", telegram:"https://t.me/maikl_prod/23/236", vk:"https://vk.ru/market/product/999765039-sostavlenie-dokumentov-177750329-13886370"},
    companies: {title:"Для компаний", telegram:"https://t.me/maikl_prod/23/229", vk:"https://vk.ru/market/product/128188-uslugi-dlya-kompanij-177750329-13886351"},
    schools: {title:"Для языковых школ", telegram:"https://t.me/maikl_prod/23/234", vk:"https://vk.ru/market/product/127979-uslugi-dlya-yazykovykh-shkol-177750329-13886368"},
    translators: {title:"Для переводчиков", telegram:"https://t.me/maikl_prod/23/235", vk:"https://vk.ru/market/product/127757-uslugi-dlya-perevodchikov-177750329-13886355"}
  },
  maiklPlusTelegramUrl: "https://t.me/+OLayyhn3yRQ3MWFi", // abonnement MAiKL.+ · 250 Stars / mois
  maiklPlusVkUrl: "https://vk.ru/maikl_prod?analytics_screen=group&source=donut_banner&w=donut_payment-177750329"
};
window.MAIKL_SERVICES = [
  {id:"b1b2",section:"lessons",title:"B1 · B2",price:2000,duration:60,description:"Уверенно говорить и двигаться дальше."},
  {id:"c1c2",section:"lessons",title:"C1 · C2",price:3000,duration:60,description:"Точность, свобода и живой французский."},
  {id:"delfdalf",section:"lessons",title:"DELF · DALF",price:3000,duration:60,description:"Подготовка к экзамену с конкретной целью."},
  {id:"conversation_individual",section:"conversation",title:"Разговорный с MAiKL. — индивидуально",listTitle:"Индивидуально",price:2000,duration:60,description:"Живая разговорная практика один на один."},
  {id:"conversation_group",section:"conversation",title:"Разговорный с MAiKL. — в группе",listTitle:"В группе",price:1500,duration:90,group:true,description:"Разговорная практика в небольшой группе до 4 человек."},

  {id:"consult_zoom_focus",section:"consult_zoom",title:"ZOOM · FOCUS",listTitle:"FOCUS · 15 минут",price:1000,duration:15,description:"Быстро разобрать конкретный вопрос."},
  {id:"consult_zoom_smalltalk",section:"consult_zoom",title:"ZOOM · SMALL-TALK",listTitle:"SMALL-TALK · 30 минут",price:1500,duration:30,description:"Обсудить тему без спешки."},
  {id:"consult_zoom_discussion",section:"consult_zoom",title:"ZOOM · DISCUSSION",listTitle:"DISCUSSION · 60 минут",price:2000,duration:60,description:"Полноценно погрузиться в вопрос."},
  {id:"consult_phone_focus",section:"consult_phone_call",title:"Смартфон · Аудиозвонок · FOCUS",listTitle:"FOCUS · 15 минут",price:750,duration:15,description:"Коротко и по существу."},
  {id:"consult_phone_smalltalk",section:"consult_phone_call",title:"Смартфон · Аудиозвонок · SMALL-TALK",listTitle:"SMALL-TALK · 30 минут",price:1000,duration:30,description:"Спокойно обсудить нужную тему."},
  {id:"consult_phone_discussion",section:"consult_phone_call",title:"Смартфон · Аудиозвонок · DISCUSSION",listTitle:"DISCUSSION · 60 минут",price:2000,duration:60,description:"Подробно разобрать всё голосом."},
  {id:"consult_msg_focus",section:"consult_phone_messages",title:"Смартфон · Сообщения + голосовые · FOCUS",listTitle:"FOCUS · 15 минут",price:500,duration:15,description:"Быстрый разбор в переписке."},
  {id:"consult_msg_smalltalk",section:"consult_phone_messages",title:"Смартфон · Сообщения + голосовые · SMALL-TALK",listTitle:"SMALL-TALK · 30 минут",price:750,duration:30,description:"Обсудить вопрос в удобном темпе."},
  {id:"consult_msg_discussion",section:"consult_phone_messages",title:"Смартфон · Сообщения + голосовые · DISCUSSION",listTitle:"DISCUSSION · 60 минут",price:1000,duration:60,description:"Подробный разбор сообщениями и голосовыми."},

  {id:"call15",section:"phone_call",title:"Аудиозвонок · FOCUS",listTitle:"FOCUS · 15 минут",price:750,duration:15,description:"Быстрый разговор по одному вопросу."},
  {id:"call30",section:"phone_call",title:"Аудиозвонок · SMALL-TALK",listTitle:"SMALL-TALK · 30 минут",price:1000,duration:30,description:"Спокойно обсудить тему голосом."},
  {id:"call60",section:"phone_call",title:"Аудиозвонок · DISCUSSION",listTitle:"DISCUSSION · 60 минут",price:1500,duration:60,description:"Час живого общения с MAiKL."},
  {id:"messages15",section:"phone_messages",title:"Сообщения + голосовые · FOCUS",listTitle:"FOCUS · 15 минут",price:500,duration:15,description:"Короткий обмен сообщениями и голосовыми."},
  {id:"messages30",section:"phone_messages",title:"Сообщения + голосовые · SMALL-TALK",listTitle:"SMALL-TALK · 30 минут",price:750,duration:30,description:"Больше времени на переписку и голосовые."},
  {id:"messages60",section:"phone_messages",title:"Сообщения + голосовые · DISCUSSION",listTitle:"DISCUSSION · 60 минут",price:1000,duration:60,description:"Час связи в удобном текстово-голосовом формате."}
];
window.MAIKL_WORKING_HOURS={1:["10:00","19:30"],2:["10:00","16:00"],3:["10:00","17:00"],4:["10:00","16:00"],5:["10:00","19:30"]};
window.MAIKL_GROUP_HOURS={1:["20:00","22:00"],2:["20:00","22:00"],4:["20:00","22:00"],5:["20:00","22:00"]};
