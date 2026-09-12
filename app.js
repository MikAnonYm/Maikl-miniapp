
const tg=window.Telegram?.WebApp;if(tg){tg.ready();tg.expand();}
const BOOK='https://204515.журналзаписей.рф/';
const sheet=document.getElementById('sheet'), content=document.getElementById('content');
const pages={
speaking:`<h2>⭐ Разговорный с MAiKL.</h2><p>Разговорная практика без заранее подготовленных тем и сценариев — как встреча с друзьями, только по-французски.</p><ul><li>Индивидуально: 60 минут — 2 000 ₽</li><li>Группа: 90 минут — 1 500 ₽ с человека</li><li>Комфортнее от B1, но попробовать можно с любым уровнем</li></ul><button class="cta" data-book>📅 Записаться</button>`,
lessons:`<h2>📚 Уроки</h2><p>Французский для общего прогресса, практики и подготовки к экзаменам.</p><ul><li>B1/B2 — 2 000 ₽ / 60 мин</li><li>C1/C2 — 3 000 ₽ / 60 мин</li><li>DELF/DALF — 3 000 ₽ / 60 мин</li><li>ОГЭ/ЕГЭ — 3 000 ₽ / 60 мин</li></ul><button class="cta" data-book>📅 Выбрать время</button>`,
consultation:`<h2>🗣 Консультация</h2><p>Когда нужен конкретный ответ, объяснение или совет по французскому.</p><ul><li>15 минут — 750 ₽</li><li>30 минут — 1 000 ₽</li><li>60 минут — 2 000 ₽</li></ul><button class="cta" data-book>📅 Записаться</button>`,
contact:`<h2>📱 MAiKL. на связи</h2><p>Гибкая практика французского через звонки, сообщения и голосовые.</p><p><b>Звонки:</b><br>15 мин — 750 ₽ · 30 мин — 1 000 ₽ · 60 мин — 1 500 ₽</p><p><b>Сообщения + голосовые:</b><br>15 мин — 500 ₽ · 30 мин — 750 ₽ · 60 мин — 1 000 ₽</p>`,
plus:`<h2>💎 MAiKL.+</h2><p>Чем выше уровень, тем ближе контакт с MAiKL.</p><p><b>💎 MAiKL.+ — 350 ₽</b><br>Контент вне открытого доступа + закрытый чат подписчиков.</p><p><b>⚡ MAiKL.++ — 750 ₽</b><br>Плюс вопросы о французском, ответы и разборы.</p><p><b>🎓 MAiKL. Premium — 2 000 ₽</b><br>Плюс 1 индивидуальная онлайн-встреча 60 минут в месяц.</p><p><b>👑 MAiKL. VIP — 5 000 ₽</b><br>2 встречи по 60 минут, личная связь между встречами и приоритет при выборе времени.</p>`,
faq:`<h2>❓ ЧаВо</h2><p><b>Где проходят занятия?</b><br>Онлайн.</p><p><b>Как записаться?</b><br>Нажми «Записаться», выбери услугу и свободное время.</p><p><b>Можно заниматься просто для себя?</b><br>Да. Экзамен не обязателен.</p>`
};
function openUrl(url){if(tg?.openLink)tg.openLink(url);else window.open(url,'_blank','noopener')}
document.addEventListener('click',e=>{
const u=e.target.closest('[data-url]');if(u){openUrl(u.dataset.url);return}
const p=e.target.closest('[data-page]');if(p){content.innerHTML=pages[p.dataset.page]||'';sheet.showModal();return}
if(e.target.closest('.close')){sheet.close();return}
if(e.target.closest('[data-book]'))openUrl(BOOK);
});
sheet.addEventListener('click',e=>{if(e.target===sheet)sheet.close()});
