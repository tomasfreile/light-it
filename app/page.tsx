'use client';

import { useEffect, useState } from 'react';
import { PatientCard } from './components/PatientCard';
import { Modal } from './components/Modal';
import { PatientForm } from './components/PatientForm';
import { Toast } from './components/Toast';
import { usePatientStore } from './store/usePatientStore';
import { Patient, PatientFormData } from './types/patient';
import { ToastState, createToastMessage } from './types/ui';
import { Skeleton } from './components/Skeleton';
import { Header } from './components/Header';
import { StatsCards } from './components/StatsCards';

export default function Home() {
  const { patients, isLoading, error, fetchPatients, addPatient, updatePatient, deletePatient } = usePatientStore();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [toast, setToast] = useState<ToastState>({
    open: false,
    title: '',
    description: '',
    type: 'success',
  });

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const handleAddPatient = () => {
    setSelectedPatient(null);
    setIsModalOpen(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleDeletePatient = (patient: Patient) => {
    deletePatient(patient.id);
  };

  const showToast = (message: Omit<ToastState, 'open'>) => {
    setToast({ ...message, open: true });
  };

  const handleSubmit = (data: PatientFormData) => {
    try {
      if (selectedPatient) {
        updatePatient(selectedPatient.id, data);
        showToast(createToastMessage('success', 'Success', 'Patient updated successfully'));
      } else {
        addPatient(data);
        showToast(createToastMessage('success', 'Success', 'Patient added successfully'));
      }
      setIsModalOpen(false);
    } catch (error) {
      showToast(createToastMessage('error', 'Error', 'Something went wrong'));
    }
  };

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showNoResults = !isLoading && patients.length > 0 && filteredPatients.length === 0;

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-neutral-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <Header
        onAddPatient={handleAddPatient}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsCards patients={patients} isLoading={isLoading} />

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} />
            ))}
          </div>
        ) : showNoResults ? (
          <div className="text-center py-12">
            <p className="text-neutral-600">No patients found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPatients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onEdit={handleEditPatient}
                onDelete={handleDeletePatient}
              />
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedPatient ? 'Edit Patient' : 'Add Patient'}
      >
        <PatientForm
          onSubmit={handleSubmit}
          initialData={selectedPatient || undefined}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <Toast
        open={toast.open}
        onOpenChange={(open) => setToast((prev) => ({ ...prev, open }))}
        title={toast.title}
        description={toast.description}
        type={toast.type}
      />
    </main>
  );
}
