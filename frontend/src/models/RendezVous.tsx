import { Doctor, specialite } from "./Doctor";
import { Patient } from "./Patient";

export class RendezVous {
    
    ID_RDV: number;
    titre: string;
    date: Date;
    patient: Patient;
    doctor: Doctor;
    passed: boolean;
    service: specialite;
    constructor(ID_RDV:number, date:Date, patient:Patient, doctor:Doctor, passed:boolean, titre:string, service:specialite) {
        this.ID_RDV = ID_RDV;
        this.date = date;
        this.patient = patient;
        this.doctor = doctor;
        this.passed = passed;
        this.titre = titre;
        this.service = service;
    }

}

export interface RendezVousJson {
    ID_RDV: number;
    Titre: string;
    Date: Date;
    Heure: string;
    Patient: number;
    Medecin: number;
    passed: boolean;
    service: number;
}

export const specialiteToService = (spec: specialite): string => {
    switch (spec) {
        case specialite.Cardiologue:
            return "Cardiologie";
        case specialite.Neurologue:
            return "Neurologie";
        case specialite.Urologue:
            return "Urologie";
        case specialite.Rhumatologue:
            return "Rhumatologie";
        case specialite.ORL:
            return "ORL";
        case specialite.Generaliste:
            return "Generaliste";
        default:
            throw new Error("Invalid specialite");
    }
}