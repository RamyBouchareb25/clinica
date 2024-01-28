import { ConsultationJson } from "./Consultation";
import { DrugJson } from "./Drugs";
import { OperationJson } from "./Operation";
import { Patient } from "./Patient";

export interface MedicalRecordJson {
    ID_Dossier: number;
    Patient: number;
    Allergies: string;
    Antecedents: string;
    DateCreation: string;
    Medicaments: Array<DrugJson>;
    consultations : Array<ConsultationJson>;
    operations : Array<OperationJson>;
}
export class MedicalRecord {
    ID_Dossier: number;
    Patient: Patient | undefined;
    Allergies: string;
    Antecedents: string;
    DateCreation: Date;
    Medicaments: Array<DrugJson>;
    consultations : Array<ConsultationJson>;
    operations : Array<OperationJson>;
    constructor(
        ID_Dossier: number,
        Patient: Patient | undefined,
        Allergies: string,
        Antecedents: string,
        DateCreation: Date,
        Medicaments: Array<DrugJson>,
        consultations : Array<ConsultationJson>,
        operations : Array<OperationJson>
    ) {
        this.ID_Dossier = ID_Dossier;
        this.Patient = Patient;
        this.Allergies = Allergies;
        this.Antecedents = Antecedents;
        this.DateCreation = DateCreation;
        this.Medicaments = Medicaments;
        this.consultations = consultations;
        this.operations = operations;
    }
    static fromJson(json: MedicalRecordJson): MedicalRecord {
        return new MedicalRecord(
            json.ID_Dossier,
            undefined,
            json.Allergies,
            json.Antecedents,
            new Date(json.DateCreation),
            json.Medicaments,
            json.consultations,
            json.operations
        );
    }
}