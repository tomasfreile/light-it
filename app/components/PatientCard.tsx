import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Patient } from '../types/patient';
import { Button } from './ui/Button';
import { Icons } from './ui/Icons';
import { Avatar } from './ui/Avatar';

interface PatientCardProps {
  patient: Patient;
  onEdit: (patient: Patient) => void;
}

export const PatientCard = ({ patient, onEdit }: PatientCardProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleToggle = () => setIsExpanded(!isExpanded);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-4 mb-4 transition-all hover:shadow-lg"
      role="article"
      aria-label={`Patient card for ${patient.name}`}
    >
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-4">
          <Avatar 
            src={patient.avatar || null}
            alt={`${patient.name}'s avatar`}
            size={48}
          />
          <h3 className="text-lg font-semibold">{patient.name}</h3>
        </div>
        <Button
          variant="icon"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(patient);
          }}
          aria-label={`Edit ${patient.name}'s information`}
        >
          <Icons.edit />
        </Button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-2 text-gray-600">
              <p className="whitespace-pre-wrap">{patient.description}</p>
              <a 
                href={patient.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline block"
                onClick={(e) => e.stopPropagation()}
              >
                Website
              </a>
              <p className="text-sm text-gray-400">
                Created: {new Date(patient.createdAt).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 