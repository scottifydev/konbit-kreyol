/** Namespaces the Cipher Office may certify: chrome (ui), feed (post), unit
 *  titles (unit), chapter names (kanpay), scene lines (scene), and the
 *  scope-bank lexicon pass (scope). `scene`/`scope` were once missing, so
 *  scene lines and the whole lexicon could not be certified. Certify writes
 *  ONLY the certification overlay — never any ledger/profile/konbit key. */
export const CERT_KEY = /^(ui|post|unit|kanpay|scene|scope):/;
