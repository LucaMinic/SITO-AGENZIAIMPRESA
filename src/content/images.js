// Fotografie da Unsplash (https://unsplash.com/license): uso commerciale gratuito,
// nessuna attribuzione obbligatoria. Servite dal CDN di Unsplash con formato e
// dimensione automatici (auto=format → AVIF/WebP). Da sostituire con foto proprie
// secondo le guideline (Human Soul / Smart Interaction / Pure Tech) quando disponibili.

export const photos = {
  skyline: { id: '1486406146926-c627a92ad1ab', alt: 'Grattacieli di un distretto direzionale visti dal basso' },
  officeView: { id: '1497215728101-856f4ea42174', alt: 'Ufficio luminoso con vista sulla città' },
  teamwork: { id: '1600880292203-757bb62b4baf', alt: 'Due professionisti si danno il cinque durante una riunione' },
  corridor: { id: '1497366754035-f200968a6e72', alt: 'Corridoio di un ufficio moderno con pareti vetrate' },
  boardroom: { id: '1431540015161-0bf868a2d407', alt: 'Sala riunioni con grandi vetrate' },
  meeting: { id: '1542744173-8e7e53415bb0', alt: 'Riunione aziendale attorno a un tavolo con computer portatili' },
  desk: { id: '1454165804606-c3d57bc86b40', alt: 'Professionisti al lavoro su documenti e computer portatili' },
  milano: { id: '1520440229-6469a149ac59', alt: 'Il Duomo di Milano' },
  handshake: { id: '1521791136064-7986c2920216', alt: 'Stretta di mano tra due professionisti' },
  team: { id: '1552664730-d307ca884978', alt: 'Gruppo di lavoro in riunione davanti a una lavagna' },
  signing: { id: '1450101499163-c8848c66ca85', alt: 'Firma di un documento' },
  design: { id: '1434626881859-194d67b2b86f', alt: 'Tavolo di lavoro con tablet e grafici stampati' },
  tax: { id: '1554224154-26032ffc0d07', alt: 'Modulistica fiscale, calcolatrice e caffè' },
  plans: { id: '1581092160562-40aa08e78837', alt: 'Tecnico al lavoro su disegni e planimetrie' },
  shop: { id: '1556740749-887f6717d7e4', alt: 'Esercente e cliente al banco di un locale' },
  recycling: { id: '1532996122724-e3c354a0b15b', alt: 'Contenitori colorati per la raccolta differenziata' },
  shipping: { id: '1578575437130-527eed3abbec', alt: 'Nave portacontainer in porto' },
  justice: { id: '1589829545856-d10d557cf95f', alt: 'Statua della Giustizia con la bilancia' },
  digital: { id: '1563986768609-322da13575f3', alt: 'Persona che usa smartphone e computer portatile' },
  documents: { id: '1554224155-6726b3ff858f', alt: 'Documenti, ricevute e calcolatrice su una scrivania' },
}

// Immagine di ogni area di servizio.
export const areaPhotos = {
  'registro-imprese-comunica': photos.signing,
  marchi: photos.design,
  'agenzia-entrate-adm': photos.tax,
  'agenzia-territorio': photos.plans,
  'pratiche-suap': photos.shop,
  'servizi-ambientali': photos.recycling,
  'servizio-estero': photos.shipping,
  'uffici-esterni': photos.justice,
  'servizi-digitali': photos.digital,
  varie: photos.documents,
}

const WIDTHS = [480, 768, 1080, 1440, 1920, 2400]

export const photoUrl = (p, w = 1600) => `https://images.unsplash.com/photo-${p.id}?auto=format&fit=crop&q=75&w=${w}`
export const photoSrcSet = (p) => WIDTHS.map((w) => `${photoUrl(p, w)} ${w}w`).join(', ')
