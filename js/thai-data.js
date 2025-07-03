// Données des nombres thaï
const thaiMap = {
  0: "ศูนย์", 1: "หนึ่ง", 2: "สอง", 3: "สาม", 4: "สี่", 5: "ห้า", 
  6: "หก", 7: "เจ็ด", 8: "แปด", 9: "เก้า", 10: "สิบ", 11: "สิบเอ็ด", 
  12: "สิบสอง", 13: "สิบสาม", 14: "สิบสี่", 15: "สิบห้า", 16: "สิบหก",
  17: "สิบเจ็ด", 18: "สิบแปด", 19: "สิบเก้า", 20: "ยี่สิบ", 21: "ยี่สิบเอ็ด", 
  22: "ยี่สิบสอง", 23: "ยี่สิบสาม", 24: "ยี่สิบสี่", 25: "ยี่สิบห้า", 
  26: "ยี่สิบหก", 27: "ยี่สิบเจ็ด", 28: "ยี่สิบแปด", 29: "ยี่สิบเก้า", 
  30: "สามสิบ", 31: "สามสิบเอ็ด", 32: "สามสิบสอง", 33: "สามสิบสาม", 
  34: "สามสิบสี่", 35: "สามสิบห้า", 36: "สามสิบหก", 40: "สี่สิบ", 
  50: "ห้าสิบ", 60: "หกสิบ", 70: "เจ็ดสิบ", 80: "แปดสิบ", 100: "หนึ่งร้อย", 
  105: "หนึ่งร้อยห้า", 200: "สองร้อย", 300: "สามร้อย", 400: "สี่ร้อย", 
  1000: "หนึ่งพัน", 1500: "พันห้า", 2000: "สองพัน", 10000: "หนึ่งหมื่น"
};

const availableNumbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,
  25,26,27,28,29,30,31,32,33,34,35,36,40,50,60,70,80,100,105,200,300,400,1000,1500,2000,10000];

// Prononciations phonétiques
const phoneticMap = {
  0: "suun", 1: "neung", 2: "song", 3: "saam", 4: "sii", 5: "haa",
  6: "hok", 7: "jet", 8: "paet", 9: "gao", 10: "sip",
  // ... plus de prononciations
};

// Explications détaillées
const explanations = {
  0: {
    text: "ศูนย์ (suun) - Zéro, le point de départ de tous les nombres. Mot d'origine sanskrit.",
    difficulty: "facile",
    tips: "Se prononce comme 'soon' en anglais mais plus court."
  },
  1: {
    text: "หนึ่ง (neung) - Un, le premier nombre. Très important car utilisé dans de nombreuses expressions.",
    difficulty: "facile", 
    tips: "La prononciation 'neung' doit être claire et nette."
  },
  2: {
    text: "สอง (song) - Deux, facile à retenir car ressemble au mot anglais 'song'.",
    difficulty: "facile",
    tips: "Attention au ton montant sur 'song'."
  },
  // ... plus d'explications
};

// Catégories d'apprentissage
const learningCategories = {
  basics: {
    name: "Nombres de base",
    numbers: [0,1,2,3,4,5,6,7,8,9],
    description: "Les chiffres fondamentaux"
  },
  teens: {
    name: "Nombres de 10 à 19", 
    numbers: [10,11,12,13,14,15,16,17,18,19],
    description: "Les nombres adolescents"
  },
  twenties: {
    name: "Vingtaines",
    numbers: [20,21,22,23,24,25,26,27,28,29],
    description: "Les nombres de 20 à 29"
  },
  // ... plus de catégories
};