import { create } from 'zustand';
import { Patient, PatientFormData } from '../types/patient';
import axios from 'axios';

interface PatientStore {
  patients: Patient[];
  isLoading: boolean;
  error: string | null;
  fetchPatients: () => Promise<void>;
  addPatient: (patient: PatientFormData) => void;
  updatePatient: (id: string, patient: PatientFormData) => void;
  deletePatient: (id: string) => void;
}

const API_URL = 'https://63bedcf7f5cfc0949b634fc8.mockapi.io/users';

export const usePatientStore = create<PatientStore>((set) => ({
  patients: [],
  isLoading: false,
  error: null,

  fetchPatients: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<Patient[]>(API_URL);
      set({ patients: response.data });
    } catch (error) {
      set({ error: 'Failed to fetch patients' });
    } finally {
      set({ isLoading: false });
    }
  },

  addPatient: (patientData: PatientFormData) => {
    const newPatient: Patient = {
      ...patientData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ patients: [...state.patients, newPatient] }));
  },

  updatePatient: (id: string, patientData: PatientFormData) => {
    set((state) => ({
      patients: state.patients.map((patient) =>
        patient.id === id ? { ...patient, ...patientData } : patient
      ),
    }));
  },

  deletePatient: (id: string) => {
    set((state) => ({
      patients: state.patients.filter((patient) => patient.id !== id),
    }));
  },
})); 