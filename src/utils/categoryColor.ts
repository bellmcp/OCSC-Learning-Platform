import {
    purple,
    indigo,
    pink,
    orange,
    green,
    blue,
    brown,
    grey,
  } from '@material-ui/core/colors'
  
  export default function categoryColor(id:any) {
    switch (id) {
      case 1:
        return purple[500]
      case 2:
        return indigo[500]
      case 3:
        return pink[500]
      case 4:
        return orange[500]
      case 5:
        return green[500]
      case 6:
        return blue[500]
      case 7:
        return brown[500]
      default:
        return grey[500]
    }
  }
  