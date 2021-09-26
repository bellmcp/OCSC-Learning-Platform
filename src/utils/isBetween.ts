//@ts-nocheck
export default function isBetween(min, max, current) {
  let formatter = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  var d1 = '';
  var d2 = '';
  var c = '';

  d1 = min?.slice(0, 10)?.split('-');
  d2 = max?.slice(0, 10)?.split('-');

  if (current) {
    c = current;
  } else {
    c = formatter
      .format(new Date())
      .replaceAll(' ', 'T')
      .slice(0, 10)
      .split('-');
  }

  var from = new Date(d1[0], parseInt(d1[1]) - 1, d1[2]);
  var to = new Date(d2[0], parseInt(d2[1]) - 1, d2[2]);
  var check = new Date(c[0], parseInt(c[1]) - 1, c[2]);

  return check >= from && check <= to;
}
