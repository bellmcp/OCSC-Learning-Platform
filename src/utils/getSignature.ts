import signatureBoonpluk from 'assets/images/cert-signature-boonpluk.png';
import signatureSima from 'assets/images/cert-signature-sima.png';
import signatureBenjawan from 'assets/images/cert-signature-benjawan.png';
import signatureMetinee from 'assets/images/cert-signature-metinee.png';
import signatureNontikorn from 'assets/images/cert-signature-nontikorn.png';
import signaturePatcharapakorn from 'assets/images/cert-signature-patcharapakorn.png';
import signaturePiyawat from 'assets/images/cert-signature-piyawat.png';
import signaturePreecha from 'assets/images/cert-signature-preecha.png';
import signatureWisut from 'assets/images/cert-signature-wisut.png';
import signatureNull from 'assets/images/cert-signature-null.png';

export default function getSignature(type: number) {
  switch (type) {
    case 1:
      return signatureBoonpluk;
    case 2:
      return signatureSima;
    case 3:
      return signaturePreecha;
    case 4:
      return signatureBenjawan;
    case 5:
      return signatureNontikorn;
    case 6:
      return signatureWisut;
    case 7:
      return signatureMetinee;
    case 8:
      return signaturePatcharapakorn;
    case 9:
      return signaturePiyawat;
    case 0:
    default:
      return signatureNull;
  }
}
