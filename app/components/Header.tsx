import { Icons } from './ui/Icons';
import { Button } from './ui/Button';

interface HeaderProps {
  onAddPatient: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const Header = ({
  onAddPatient,
  searchTerm,
  onSearchChange,
}: HeaderProps) => {
  return (
    <div className="bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Light-it</h1>
            <p className="mt-1 text-neutral-600">
              Patient manager
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full sm:w-64 px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <Icons.search className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            </div>
            <Button
              onClick={onAddPatient}
              className="gap-2 whitespace-nowrap"
            >
              <Icons.add />
              <span>Add Patient</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}; 