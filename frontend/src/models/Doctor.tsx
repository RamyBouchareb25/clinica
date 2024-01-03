import { Sexe, enumToNumber, numberToSexe } from "./Patient";


export enum specialite {
  Cardiologue = "Cardiologue",
  Neurologue = "Neurologue",
  ORL = "ORL",
  Rhumatologue = "Rhumatologue",
  Urologue = "Urologue",
  Generaliste = "Generaliste"
}

export class Doctor {
  ID_Medecin: number;
  Nom: string;
  Prenom: string;
  DateNaissance : Date;
  sexe: Sexe;
  Adresse: string;
  num_tel: number;
  email: string;
  specialite: specialite;
  [key: string]: string | number | Date | Sexe;
  constructor(ID_Medecin: number, Nom: string, Prenom: string, DateNaissance : Date, sexe: Sexe, Adresse: string, num_tel: number, email: string, specialite: specialite) {
    this.ID_Medecin = ID_Medecin;
    this.Nom = Nom;
    this.Prenom = Prenom;
    this.DateNaissance = DateNaissance;
    this.sexe = sexe;
    this.Adresse = Adresse;
    this.num_tel = num_tel;
    this.email = email;
    this.specialite = specialite;
  }
  static SpecialiteToNumber = (spec: specialite): number => {
    switch (spec) {
        case specialite.Cardiologue:
            return 1;
        case specialite.Neurologue:
            return 2;
        case specialite.Urologue:
            return 3;
        case specialite.Rhumatologue:
            return 4;
        case specialite.ORL:
            return 5;
        case specialite.Generaliste:
            return 6;
        default:
            throw new Error("Invalid specialite");
    }
  }
   static numberToSpecialite = (spec: number): specialite => {
    switch (spec) {
        case 1:
            return specialite.Cardiologue;
        case 2:
            return specialite.Neurologue;
        case 3:
            return specialite.Urologue;
        case 4:
            return specialite.Rhumatologue;
        case 5:
            return specialite.ORL;
        case 6:
            return specialite.Generaliste;
        default:
            throw new Error("Invalid specialite");
    }
  }
  static isValidDoctorJson(json: unknown): json is DoctorJson {
    return typeof json === 'object' &&
           json !== null &&
           'ID_Medecin' in json && typeof json['ID_Medecin'] === 'number' &&
           'Nom' in json && typeof json['Nom'] === 'string' &&
           'Prenom' in json && typeof json['Prenom'] === 'string' &&
           'DateNaissance' in json && typeof json['DateNaissance'] === 'string' &&
           'sexe' in json && typeof json['sexe'] === 'number' &&
           'Adresse' in json && typeof json['Adresse'] === 'string' &&
           'num_tel' in json && typeof json['num_tel'] === 'number' &&
           'email' in json && typeof json['email'] === 'string' &&
           'specialite' in json && typeof json['specialite'] === 'number';
  }
  static fromJson(json: unknown): Doctor {
    if (this.isValidDoctorJson(json)) {
      return new Doctor(json.ID_Medecin, json.Nom, json.Prenom, new Date(json.DateNaissance), numberToSexe(+json.sexe), json.Adresse, json.num_tel, json.email, this.numberToSpecialite(+json.specialite));
    } else {
      throw new Error("Invalid JSON structure for Doctor");
    }
  }
  
  static toJson(doctor: Doctor): unknown {
    return {
      Nom: doctor.Nom,
      Prenom: doctor.Prenom,
      sexe: enumToNumber(doctor.sexe),
      Adresse: doctor.Adresse,
      DateNaissance: doctor.DateNaissance.toISOString().split('T')[0],
      num_tel: doctor.num_tel,
      email: doctor.email,
      specialite: this.SpecialiteToNumber(doctor.specialite)
    };
  }
}

export interface DoctorJson {
  ID_Medecin: number;
  Nom: string;
  Prenom: string;
  DateNaissance: string;
  sexe: Sexe;
  Adresse: string;
  num_tel: number;
  email: string;
  specialite: specialite;
}
 