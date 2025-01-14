import { Patient } from '../types/patient';
import { isCurrentMonth } from '../lib/utils';

interface StatsCardsProps {
  patients: Patient[];
  isLoading: boolean;
}

export const StatsCards = ({ patients, isLoading }: StatsCardsProps) => {
  const newPatientsCount = patients.filter(patient => isCurrentMonth(patient.createdAt)).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg border border-neutral-200">
        <h3 className="text-sm font-medium text-neutral-600">Total Patients</h3>
        <p className="mt-2 text-3xl font-semibold text-neutral-900">
          {isLoading ? '-' : patients.length}
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg border border-neutral-200">
        <h3 className="text-sm font-medium text-neutral-600">New This Month</h3>
        <p className="mt-2 text-3xl font-semibold text-secondary-600">
          {isLoading ? '-' : newPatientsCount}
        </p>
      </div>
    </div>
  );
}; 