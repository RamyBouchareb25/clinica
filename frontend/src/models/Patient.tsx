export class Patient {
    id: number;
    nom: string;
    prenom: string;
    dateNaissance: Date;
    sexe: Sexe;
    adresse: string;
    numTel: string;
    email: string;
    age: number;
    [key: string]: string | number | Date | Sexe;
    constructor(id: number, nom: string, prenom: string, dateNaissance: Date, sexe: Sexe, adresse: string, numTel: string, email: string) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.dateNaissance = dateNaissance;
        this.sexe = sexe;
        this.adresse = adresse;
        this.numTel = numTel;
        this.email = email;
        this.age = Patient.calculateAge(dateNaissance);
    }
    static calculateAge(dateNaissance: Date): number {
        const diff = Date.now() - dateNaissance.getTime();
        const age = new Date(diff);
        return Math.abs(age.getUTCFullYear() - 1970);
    }
        
    
    
    static fromJson(json: unknown): Patient {
        if (this.isValidPatientJson(json)) {
            return new Patient(json.ID_Patient, json.Nom, json.Prenom, new Date(json.DateNaissance), numberToSexe(+json.sexe), json.Adresse, json.num_tel, json.email);
        } else {
            throw new Error("Invalid JSON structure for Patient");
        }
    }
    static toJson(patient: Patient): unknown {
        return {
            Nom: patient.nom,
            Prenom: patient.prenom,
            sexe: enumToNumber(patient.sexe),
            Adresse: patient.adresse,
            DateNaissance: patient.dateNaissance.toISOString().split('T')[0],
            num_tel: patient.numTel,
            email: patient.email
        };
    }
    
    static isValidPatientJson(json: unknown): json is PatientJson {
        return typeof json === 'object' &&
               json !== null &&
               'ID_Patient' in json && typeof json['ID_Patient'] === 'number' &&
               'Nom' in json && typeof json['Nom'] === 'string' &&
               'Prenom' in json && typeof json['Prenom'] === 'string' &&
               'DateNaissance' in json && typeof json['DateNaissance'] === 'string' &&
               'sexe' in json && typeof json['sexe'] === 'number' &&
               'Adresse' in json && typeof json['Adresse'] === 'string' &&
               'num_tel' in json && typeof json['num_tel'] === 'number' &&
               'email' in json && typeof json['email'] === 'string';
    }
}
export interface PatientJson {
    ID_Patient: number;
    Nom: string;
    Prenom: string;
    DateNaissance: string;
    sexe: Sexe;
    Adresse: string;
    num_tel: string;
    email: string;
}
export enum Sexe {
    Homme = "Homme",
    Femme = "Femme"
}
export const enumToNumber = (sexe: Sexe): number => {
    switch (sexe) {
        case Sexe.Homme:
            return 1;
        case Sexe.Femme:
            return 2;
        default:
            throw new Error("Invalid Sexe");
    }
}

export const numberToSexe = (n: number): Sexe => {
    switch (n) {
        case 1:
            return Sexe.Homme;
        case 2:
            return Sexe.Femme;
        default:
            throw new Error("Invalid number for Sexe");
    }
}