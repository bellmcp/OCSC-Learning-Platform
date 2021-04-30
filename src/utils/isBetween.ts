//@ts-nocheck
export default function isBetween(min, max) {
  var d1 = min?.slice(0, 10)?.split("-");
  var d2 = max?.slice(0, 10)?.split("-");
  var c = new Date().toISOString().slice(0, 10).split("-");

  var from = new Date(d1[0], parseInt(d1[1]) - 1, d1[2]);
  var to = new Date(d2[0], parseInt(d2[1]) - 1, d2[2]);
  var check = new Date(c[0], parseInt(c[1]) - 1, c[2]);

  return check > from && check < to;
}
