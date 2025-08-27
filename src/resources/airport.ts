interface Airport {
    code: string;
    name: string;
    city: string;
    province: string;
    type: 'International' | 'Domestic' | 'Regional';
    terminals: number;
    airlines: string[];
    destinations: string[];
}

const airportsData: Airport[] = [
    {
      "code": "SCL",
      "name": "Arturo Merino Benítez International Airport",
      "city": "Santiago",
      "province": "Región Metropolitana",
      "type": "International",
      "terminals": 2,
      "airlines": ["LATAM", "Sky Airline", "JetSmart"],
      "destinations": ["Buenos Aires", "Lima", "Miami", "Madrid", "Sydney"]
    },
    {
      "code": "ANF",
      "name": "Andrés Sabella Gálvez International Airport",
      "city": "Antofagasta",
      "province": "Antofagasta",
      "type": "International",
      "terminals": 1,
      "airlines": ["LATAM", "Sky Airline", "JetSmart"],
      "destinations": ["Santiago", "Calama", "Iquique"]
    },
    {
      "code": "CCP",
      "name": "Carriel Sur International Airport",
      "city": "Concepción",
      "province": "Bío Bío",
      "type": "International",
      "terminals": 1,
      "airlines": ["LATAM", "Sky Airline", "JetSmart"],
      "destinations": ["Santiago", "Puerto Montt", "Temuco"]
    },
    {
      "code": "PMC",
      "name": "El Tepual International Airport",
      "city": "Puerto Montt",
      "province": "Los Lagos",
      "type": "International",
      "terminals": 1,
      "airlines": ["LATAM", "Sky Airline", "JetSmart"],
      "destinations": ["Santiago", "Punta Arenas", "Concepción"]
    },
    {
      "code": "PUQ",
      "name": "Presidente Carlos Ibáñez del Campo International Airport",
      "city": "Punta Arenas",
      "province": "Magallanes",
      "type": "International",
      "terminals": 1,
      "airlines": ["LATAM", "Sky Airline", "JetSmart", "Aerovías DAP"],
      "destinations": ["Santiago", "Puerto Montt", "Porvenir"]
    },
    {
      "code": "IQQ",
      "name": "Diego Aracena International Airport",
      "city": "Iquique",
      "province": "Tarapacá",
      "type": "International",
      "terminals": 1,
      "airlines": ["LATAM", "Sky Airline", "JetSmart"],
      "destinations": ["Santiago", "Antofagasta", "Arica"]
    },
    {
      "code": "ARI",
      "name": "Chacalluta International Airport",
      "city": "Arica",
      "province": "Arica y Parinacota",
      "type": "International",
      "terminals": 1,
      "airlines": ["LATAM", "Sky Airline", "JetSmart"],
      "destinations": ["Santiago", "Iquique", "Tacna (Perú)"]
    },
    {
      "code": "IPC",
      "name": "Mataveri International Airport",
      "city": "Easter Island",
      "province": "Valparaíso",
      "type": "International",
      "terminals": 1,
      "airlines": ["LATAM"],
      "destinations": ["Santiago", "Papeete (Tahití)"]
    },
    {
      "code": "CJC",
      "name": "El Loa Airport",
      "city": "Calama",
      "province": "Antofagasta",
      "type": "Domestic",
      "terminals": 1,
      "airlines": ["LATAM", "Sky Airline", "JetSmart"],
      "destinations": ["Santiago", "Antofagasta", "Iquique"]
    },
    {
      "code": "LSC",
      "name": "La Florida Airport",
      "city": "La Serena",
      "province": "Coquimbo",
      "type": "Domestic",
      "terminals": 1,
      "airlines": ["LATAM", "Sky Airline", "JetSmart"],
      "destinations": ["Santiago", "Antofagasta", "Copiapó"]
    },
    {
      "code": "ZCO",
      "name": "Maquehue Airport",
      "city": "Temuco",
      "province": "La Araucanía",
      "type": "Domestic",
      "terminals": 1,
      "airlines": ["LATAM", "Sky Airline", "JetSmart"],
      "destinations": ["Santiago", "Concepción", "Puerto Montt"]
    },
    {
      "code": "BBA",
      "name": "Balmaceda Airport",
      "city": "Balmaceda",
      "province": "Aysén",
      "type": "Regional",
      "terminals": 1,
      "airlines": ["LATAM", "Sky Airline", "JetSmart"],
      "destinations": ["Santiago", "Puerto Montt", "Coyhaique"]
    },
    {
      "code": "WCA",
      "name": "Gamboa Airport",
      "city": "Castro",
      "province": "Los Lagos",
      "type": "Regional",
      "terminals": 1,
      "airlines": ["LATAM"],
      "destinations": ["Puerto Montt", "Santiago"]
    },
    {
      "code": "CNR",
      "name": "Chañaral Airport",
      "city": "Chañaral",
      "province": "Atacama",
      "type": "Regional",
      "terminals": 1,
      "airlines": ["LATAM"],
      "destinations": ["Copiapó"]
    },
    {
      "code": "ESR",
      "name": "Ricardo García Posada Airport",
      "city": "El Salvador",
      "province": "Atacama",
      "type": "Regional",
      "terminals": 1,
      "airlines": ["LATAM"],
      "destinations": ["Copiapó"]
    }
  ];

  export async function getAirportsResource() : Promise<{contents: Array<{uri: string, mimeType: string, text: string}>}> {
    return {
        contents: [{
            uri:'airports',
            mimeType: 'application/json',
            text: JSON.stringify(airportsData, null, 2)
        }]
    }    
  }