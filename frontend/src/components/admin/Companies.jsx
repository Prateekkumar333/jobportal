import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f7ff] via-[#f2ecff] to-[#ebe3ff]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <Input
            className="max-w-sm bg-white shadow-sm border border-gray-300 rounded-md"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate('/admin/companies/create')}
            className="bg-[#6A38C2] hover:bg-[#4c2895] text-white rounded-md px-6"
          >
            New Company
          </Button>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;
