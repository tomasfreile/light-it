export type Patient = {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
  description: string;
  website: string;
};

export type PatientFormData = Omit<Patient, 'id' | 'createdAt'>; 