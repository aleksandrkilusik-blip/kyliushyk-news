/**
 * Підписка на молитовний лист — Google Apps Script
 * Олександр Килюшик · Military Ministry · Україна для Христа
 *
 * Що робить:
 *   1) записує підписника рядком у Google Таблицю
 *   2) надсилає тобі лист «Новий партнер молитовного листа»
 *   3) повертає людину назад на сайт із зеленим «Дякуємо»
 *
 * Куди вставляти: Google Таблиця → Розширення → Apps Script →
 * видалити все, що там є, вставити цей код, зберегти.
 */

const NOTIFY_TO = 'oleksandr.kyliushyk@cru.org';
const SHEET_NAME = 'Підписники';
const REDIRECT_URL =
  'https://aleksandrkilusik-blip.github.io/kyliushyk-news/index.html?subscribed=1#newsletters';

function doPost(e) {
  const p = (e && e.parameter) || {};

  // Пастка для ботів: люди це поле не бачать, боти його заповнюють.
  if (p._honey) return backToSite();

  const name = String(p.name || '').trim();
  const surname = String(p.surname || '').trim();
  const email = String(p.email || '').trim();

  if (!email) return backToSite();

  // 1. Рядок у таблицю
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Дата', 'Ім’я', 'Прізвище', 'Пошта']);
    }
    sheet.appendRow([new Date(), name, surname, email]);
  } catch (err) {
    // Якщо скрипт не прив’язаний до таблиці — лист усе одно має піти.
    console.error('Не вдалося записати в таблицю: ' + err);
  }

  // 2. Лист тобі
  MailApp.sendEmail({
    to: NOTIFY_TO,
    subject: 'Новий партнер молитовного листа',
    body:
      'Новий підписник на молитовний лист:\n\n' +
      'Ім’я:      ' + (name || '—') + '\n' +
      'Прізвище:  ' + (surname || '—') + '\n' +
      'Пошта:     ' + email + '\n\n' +
      'Додано: ' + Utilities.formatDate(new Date(), 'Europe/Kyiv', 'dd.MM.yyyy HH:mm'),
    replyTo: email
  });

  return backToSite();
}

function doGet() {
  return backToSite();
}

/** Повертає людину на сайт — без CORS, бо це звичайний перехід. */
function backToSite() {
  return HtmlService.createHtmlOutput(
    '<!doctype html><meta charset="utf-8">' +
    '<script>window.top.location.href = ' + JSON.stringify(REDIRECT_URL) + ';<\/script>' +
    '<p>Дякуємо! Повертаємо вас на сайт…</p>'
  ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
