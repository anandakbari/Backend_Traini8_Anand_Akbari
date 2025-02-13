'use client';

import { useEffect, useState, useCallback } from 'react'; // Add useCallback to imports
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import debounce from 'lodash/debounce';

interface Address {
  detailedAddress: string;
  city: string;
  state: string;
  pincode: string;
}

interface TrainingCenter {
  id?: number;
  centerName: string;
  centerCode: string;
  address: Address;
  studentCapacity: number;
  coursesOffered: string[];
  createdOn: number;
  contactEmail?: string;
  contactPhone: string;
}

export default function TrainingCenterList() {
  const [centers, setCenters] = useState<TrainingCenter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    city: '',
    state: '',
    minCapacity: '',
    course: ''
  });

  const fetchCenters = async (filterParams: typeof filters) => {
    try {
      setLoading(true);
      let url = 'http://localhost:8080/api/training-centers';
      
      const params = new URLSearchParams();
      if (filterParams.city) params.append('city', filterParams.city);
      if (filterParams.state) params.append('state', filterParams.state);
      if (filterParams.minCapacity) params.append('minCapacity', filterParams.minCapacity);
      if (filterParams.course) params.append('course', filterParams.course);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch centers');
      }
      const data = await response.json();
      setCenters(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetch = useCallback(
    debounce((filterParams: typeof filters) => {
      fetchCenters(filterParams);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedFetch(filters);
    // Cleanup
    return () => {
      debouncedFetch.cancel();
    };
  }, [filters, debouncedFetch]);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const formatDate = (epoch: number) => {
    return new Date(epoch).toLocaleString();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Training Centers</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="space-y-2">
            <Label>Filter by City</Label>
            <Input 
              placeholder="Enter city..."
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Filter by State</Label>
            <Input 
              placeholder="Enter state..."
              value={filters.state}
              onChange={(e) => handleFilterChange('state', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Minimum Capacity</Label>
            <Input 
              type="number"
              placeholder="Enter minimum capacity..."
              value={filters.minCapacity}
              onChange={(e) => handleFilterChange('minCapacity', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Filter by Course</Label>
            <Input 
              placeholder="Enter course name..."
              value={filters.course}
              onChange={(e) => handleFilterChange('course', e.target.value)}
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-4">
            Loading...
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-red-500 py-4">
            {error}
          </div>
        )}

        {/* Centers Table */}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">Center Name</TableHead>
                  <TableHead className="whitespace-nowrap">Center Code</TableHead>
                  <TableHead className="whitespace-nowrap">Address</TableHead>
                  <TableHead className="whitespace-nowrap">Capacity</TableHead>
                  <TableHead className="whitespace-nowrap">Courses</TableHead>
                  <TableHead className="whitespace-nowrap">Created On</TableHead>
                  <TableHead className="whitespace-nowrap">Contact Info</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {centers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No training centers found
                    </TableCell>
                  </TableRow>
                ) : (
                  centers.map((center) => (
                    <TableRow key={center.id}>
                      <TableCell className="font-medium">{center.centerName}</TableCell>
                      <TableCell>{center.centerCode}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{center.address.detailedAddress}</div>
                          <div>{center.address.city}, {center.address.state}</div>
                          <div>PIN: {center.address.pincode}</div>
                        </div>
                      </TableCell>
                      <TableCell>{center.studentCapacity}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {center.coursesOffered.map((course, index) => (
                            <div key={index}>{course}</div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {formatDate(center.createdOn)}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {center.contactEmail && (
                            <div>Email: {center.contactEmail}</div>
                          )}
                          <div>Phone: {center.contactPhone}</div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}