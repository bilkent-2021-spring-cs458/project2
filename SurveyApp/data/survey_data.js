import cities_of_turkey from "../data/cities_of_turkey.json";

export const cities = cities_of_turkey
  .map((obj) => {
    return { title: obj.name };
  })
  .sort((a, b) => a.title.localeCompare(b.title, "tr"));

export const genders = ["Male", "Female", "Other"];

export const vaccines = [
  "BNT162b2/COMIRNATY Tozinameran (INN)",
  "AZD1222",
  "Covishield (ChAdOx1_nCoV19)",
  "SARS-CoV-2 Vaccine (VeroCell), Inactivated (lnCoV)",
  "SARS-CoV-2 Vaccine (VeroCell), Inactivated",
  "mRNA-1273",
  "Ad26.COV2.S",
  "Ad5-nCoV",
  "EpiVacCorona",
  "Recombinant Novel Coronavirus Vaccine（CHOCell)",
  "SARS-CoV-2 Vaccine, Inactivated (Vero Cell)",
  "Inactivated SARS-CoV-2 Vaccine (Vero Cell)",
  "Other",
];

export const sideEffects = [
  "Pain",
  "Redness",
  "Swelling",
  "Tiredness",
  "Headache",
  "Muscle pain",
  "Chills",
  "Nausea",
  "Fever",
  "Other",
];
