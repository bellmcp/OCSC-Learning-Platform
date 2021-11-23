//@ts-nocheck
function isBetween(min, max, current) {
  var d1 = '';
  var d2 = '';
  var c = '';

  d1 = min?.slice(0, 10)?.split('-');
  d2 = max?.slice(0, 10)?.split('-');
  c = current?.slice(0, 10)?.split('-');

  var from = new Date(d1[0], parseInt(d1[1]) - 1, d1[2]);
  var to = new Date(d2[0], parseInt(d2[1]) - 1, d2[2]);
  var check = new Date(c[0], parseInt(c[1]) - 1, c[2]);

  return check >= from && check <= to;
}

export default function signatureType(completeDate) {
  if (isBetween('2000-01-01T00:00:00', '2021-09-30T00:00:00', completeDate))
    return 1;
  else if (
    isBetween('2021-10-01T00:00:00', '2021-10-26T00:00:00', completeDate)
  )
    return 2;
  else if (
    isBetween('2021-10-27T00:00:00', '3000-01-01T00:00:00', completeDate)
  )
    return 3;
  else return 3;
}
