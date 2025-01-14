import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Patient, PatientFormData } from '../types/patient';
import { Button } from './ui/Button';

const patientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  avatar: z.string().url('Must be a valid URL'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  website: z.string().url('Must be a valid URL'),
});

interface PatientFormProps {
  onSubmit: (data: PatientFormData) => void;
  initialData?: Patient;
  onCancel: () => void;
}

export const PatientForm = ({ onSubmit, initialData, onCancel }: PatientFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: initialData,
  });

  const inputClasses = 'px-2 mt-1 block w-full rounded-md border border-neutral-300 bg-white text-neutral-900 shadow-sm focus:border-primary-500 focus:ring-primary-500';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-neutral-800">
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className={inputClasses}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 font-medium">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="avatar" className="block text-sm font-medium text-neutral-800">
          Avatar URL
        </label>
        <input
          type="url"
          id="avatar"
          {...register('avatar')}
          className={inputClasses}
        />
        {errors.avatar && (
          <p className="mt-1 text-sm text-red-600 font-medium">{errors.avatar.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-neutral-800">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          {...register('description')}
          className={inputClasses}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600 font-medium">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="website" className="block text-sm font-medium text-neutral-800">
          Website
        </label>
        <input
          type="url"
          id="website"
          {...register('website')}
          className={inputClasses}
        />
        {errors.website && (
          <p className="mt-1 text-sm text-red-600 font-medium">{errors.website.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          isLoading={isSubmitting}
          variant="primary"
        >
          {initialData ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
}; 