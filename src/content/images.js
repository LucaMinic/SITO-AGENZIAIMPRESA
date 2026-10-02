// Fotografie da Unsplash (https://unsplash.com/license): uso commerciale gratuito,
// nessuna attribuzione obbligatoria. Servite dal CDN di Unsplash con formato e
// dimensione automatici (auto=format → AVIF/WebP). Da sostituire con foto proprie
// secondo le guideline (Human Soul / Smart Interaction / Pure Tech) quando disponibili.

export const photos = {
  // Hero slider (Home)
  skyline: { id: '1486406146926-c627a92ad1ab', alt: 'Grattacieli di un distretto direzionale visti dal basso' },
  officeView: { id: '1497215728101-856f4ea42174', alt: 'Ufficio luminoso con vista sulla città' },
  teamwork: { id: '1600880292203-757bb62b4baf', alt: 'Due professionisti si danno il cinque durante una riunione' },

  // Sezioni e pagine
  executiveOffice: { id: '1497366811353-6870744d04b2', alt: 'Ufficio direzionale con grandi vetrate' },
  boardroom: { id: '1497366858526-0766cadbe8fa', alt: 'Sala riunioni con tavolo e grandi finestre' },
  glassOffice: { id: '1497366412874-3415097a27e7', alt: 'Uffici moderni con pareti vetrate' },
  towers: { id: '1449157291145-7efd050a4d0e', alt: 'Grattacieli nella nebbia visti dal basso' },
  glassTowers: { id: '1511818966892-d7d671e672a2', alt: 'Grattacieli in vetro di un distretto direzionale' },
  laptop: { id: '1484807352052-23338990c6c6', alt: 'Professionista al lavoro su un computer portatile' },
  portaNuova: { id: '1662114800275-9a641a2dad03', alt: 'Il Bosco Verticale nel quartiere Porta Nuova a Milano' },
  milanoTower: { id: '1741513542741-26c8d5cdedf6', alt: 'La Torre UniCredit a Milano Porta Nuova vista dal basso' },
  handshake: { id: '1521790797524-b2497295b8a0', alt: 'Stretta di mano tra due professionisti' },
  contact: { id: '1505409859467-3a796fd5798e', alt: 'Uffici moderni con area di accoglienza e vista sulla città' },

  // Aree di servizio
  pen: { id: '1455390582262-044cdead277a', alt: 'Firma con penna stilografica su un documento' },
  palette: { id: '1561070791-2526d30994b5', alt: 'Studio di design con palette di colori e campioni' },
  tax: { id: '1554224155-8d04cb21cd6c', alt: 'Calcoli con lo smartphone su documenti fiscali' },
  house: { id: '1600585154340-be6161a56a0c', alt: 'Abitazione moderna immersa nel verde' },
  restaurant: { id: '1517248135467-4c7edcad34c4', alt: 'Sala di un ristorante elegante' },
  wind: { id: '1466611653911-95081537e5b7', alt: 'Pale eoliche al tramonto' },
  containers: { id: '1494412519320-aa613dfb7738', alt: 'Vista aerea di container in un terminal portuale' },
  courthouse: { id: '1701605920759-7b523ee7748c', alt: 'Palazzo di giustizia con colonnato neoclassico' },
  workstation: { id: '1555421689-491a97ff2040', alt: 'Postazione di lavoro digitale con tastiera' },
  clipboard: { id: '1586282391129-76a6df230234', alt: 'Cartellina con documenti accanto a un computer portatile' },
}

// Immagine di ogni area di servizio.
export const areaPhotos = {
  'registro-imprese-comunica': photos.pen,
  marchi: photos.palette,
  'agenzia-entrate-adm': photos.tax,
  'agenzia-territorio': photos.house,
  'pratiche-suap': photos.restaurant,
  'servizi-ambientali': photos.wind,
  'servizio-estero': photos.containers,
  'uffici-esterni': photos.courthouse,
  'servizi-digitali': photos.workstation,
  varie: photos.clipboard,
}

const WIDTHS = [480, 768, 1080, 1440, 1920, 2400]

export const photoUrl = (p, w = 1600) => `https://images.unsplash.com/photo-${p.id}?auto=format&fit=crop&q=75&w=${w}`
export const photoSrcSet = (p) => WIDTHS.map((w) => `${photoUrl(p, w)} ${w}w`).join(', ')
