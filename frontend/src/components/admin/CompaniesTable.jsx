import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((s) => s.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const text = searchCompanyByText?.toLowerCase() || "";
    const filtered = companies.filter((c) =>
      text ? c.name.toLowerCase().includes(text) : true
    );
    setFilterCompany(filtered);
  }, [companies, searchCompanyByText]);

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
      <Table className="min-w-full">
        <TableCaption className="text-sm text-gray-500 py-4">
          Recently registered companies
        </TableCaption>

        <TableHeader className="bg-[#f5f2ff]">
          <TableRow>
            <TableHead className="text-sm font-semibold text-gray-700">
              Logo
            </TableHead>
            <TableHead className="text-sm font-semibold text-gray-700">
              Name
            </TableHead>
            <TableHead className="text-sm font-semibold text-gray-700">
              Date
            </TableHead>
            <TableHead className="text-right text-sm font-semibold text-gray-700">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="py-6 text-center text-gray-500">
                No companies found
              </TableCell>
            </TableRow>
          ) : (
            filterCompany.map((company) => (
              <TableRow
                key={company._id}
                className="hover:bg-[#faf8ff] transition duration-150"
              >
                <TableCell>
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={company.logo || "/placeholder-logo.png"}
                      alt={`${company.name} logo`}
                    />
                  </Avatar>
                </TableCell>

                <TableCell className="text-sm text-gray-800">
                  {company.name}
                </TableCell>

                <TableCell className="text-sm text-gray-600">
                  {new Date(company.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="p-1 rounded-full hover:bg-gray-100">
                      <MoreHorizontal className="w-5 h-5 text-gray-600" />
                    </PopoverTrigger>

                    <PopoverContent className="w-36 p-2 border rounded-lg shadow bg-white">
                      <div
                        role="button"
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 text-sm text-gray-700"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
