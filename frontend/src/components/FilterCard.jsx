import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    fitlerType: 'Location',
    array: ['Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai'],
  },
  {
    fitlerType: 'Industry',
    array: ['Frontend Developer', 'Backend Developer', 'FullStack Developer'],
  },
  {
    fitlerType: 'Salary',
    array: ['0-40k', '42-1lakh', '1lakh to 5lakh'],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => setSelectedValue(value);

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full rounded-xl border border-gray-400 bg-gradient-to-br from-gray-600 via-gray-600 to-gray-700 p-4 shadow text-gray-200 md:p-5 lg:p-6">
      <h1 className="mb-4 text-center text-lg font-semibold md:text-xl">🔍 Filter Jobs</h1>
      <hr className="mb-4 border-gray-500" />

      {/* Radio Groups */}
      <RadioGroup
        value={selectedValue}
        onValueChange={changeHandler}
        className="space-y-5 md:space-y-6"
      >
        {filterData.map((data, index) => (
          <div key={index}>
            <h2 className="mb-2 border-l-4 border-indigo-400 pl-2 text-base font-bold md:text-lg">
              {data.fitlerType}
            </h2>

            <div className="space-y-2 pl-1">
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div className="flex items-center space-x-2" key={itemId}>
                    <RadioGroupItem
                      value={item}
                      id={itemId}
                      className="h-4 w-4 border border-gray-400 text-indigo-400 focus:ring-indigo-400 hover:border-indigo-300 transition"
                    />
                    <Label
                      htmlFor={itemId}
                      className="cursor-pointer text-sm text-gray-300 transition hover:text-indigo-300 md:text-base"
                    >
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
