'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface TrainingCenterFormProps {
    onSuccess: () => void;
  }

interface FormData {
  centerName: string;
  centerCode: string;
  address: {
    detailedAddress: string;
    city: string;
    state: string;
    pincode: string;
  };
  studentCapacity: number;
  coursesOffered: string[];
  contactEmail: string;
  contactPhone: string;
}

const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email === '' || regex.test(email); // Empty is valid as it's optional
};

const validatePhone = (phone: string) => {
  return /^\d{10}$/.test(phone);
};

export default function TrainingCenterForm({ onSuccess }: TrainingCenterFormProps) {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    centerName: '',
    centerCode: '',
    address: {
      detailedAddress: '',
      city: '',
      state: '',
      pincode: ''
    },
    studentCapacity: 0,
    coursesOffered: [''],
    contactEmail: '',
    contactPhone: ''
  });

  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  const validate = () => {
    const errors: {[key: string]: string} = {};

    // Center Name validation
    if (!formData.centerName) {
      errors.centerName = 'Center name is required';
    } else if (formData.centerName.length >= 40) {
      errors.centerName = 'Center name must be less than 40 characters';
    }

    // Center Code validation
    if (!formData.centerCode) {
      errors.centerCode = 'Center code is required';
    } else if (!/^[A-Za-z0-9]{12}$/.test(formData.centerCode)) {
      errors.centerCode = 'Center code must be exactly 12 alphanumeric characters';
    }

    // Address validations
    if (!formData.address.detailedAddress) errors.detailedAddress = 'Detailed address is required';
    if (!formData.address.city) errors.city = 'City is required';
    if (!formData.address.state) errors.state = 'State is required';
    if (!formData.address.pincode) errors.pincode = 'Pincode is required';

    // Contact validations
    if (!formData.contactPhone) {
      errors.contactPhone = 'Contact phone is required';
    } else if (!validatePhone(formData.contactPhone)) {
      errors.contactPhone = 'Invalid phone number (must be 10 digits)';
    }

    if (formData.contactEmail && !validateEmail(formData.contactEmail)) {
      errors.contactEmail = 'Invalid email format';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!validate()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/training-centers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        switch (response.status) {
          case 409: // Conflict - Usually for duplicate center code
            throw new Error(`A training center with this code already exists`);
          case 400: // Bad Request - Validation errors
            if (errorData.centerCode) {
              throw new Error(`Center Code Error: ${errorData.centerCode}`);
            }
            // Handle other validation errors
            break;
          default:
            throw new Error(errorData.message || 'Failed to create training center');
        }
      }

      // Reset form after successful submission
      setFormData({
        centerName: '',
        centerCode: '',
        address: {
          detailedAddress: '',
          city: '',
          state: '',
          pincode: ''
        },
        studentCapacity: 0,
        coursesOffered: [''],
        contactEmail: '',
        contactPhone: ''
      });

      onSuccess();

      alert('Training center created successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
    finally {
        setLoading(false);
      }
  };

  const handleCourseChange = (index: number, value: string) => {
    const newCourses = [...formData.coursesOffered];
    newCourses[index] = value;
    setFormData({ ...formData, coursesOffered: newCourses });
  };

  const addCourse = () => {
    setFormData({
      ...formData,
      coursesOffered: [...formData.coursesOffered, '']
    });
  };

  

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Training Center</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Center Name */}
          <div className="space-y-2">
            <Label htmlFor="centerName">Center Name *</Label>
            <Input
              id="centerName"
              value={formData.centerName}
              onChange={(e) => setFormData({ ...formData, centerName: e.target.value })}
              maxLength={40}
              className={validationErrors.centerName ? 'border-red-500' : ''}
            />
            {validationErrors.centerName && (
              <p className="text-sm text-red-500">{validationErrors.centerName}</p>
            )}
          </div>

          {/* Center Code */}
          <div className="space-y-2">
            <Label htmlFor="centerCode">Center Code * (12 alphanumeric characters)</Label>
            <Input
              id="centerCode"
              value={formData.centerCode}
              onChange={(e) => setFormData({ ...formData, centerCode: e.target.value })}
              className={validationErrors.centerCode ? 'border-red-500' : ''}
            />
            {validationErrors.centerCode && (
              <p className="text-sm text-red-500">{validationErrors.centerCode}</p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="font-medium">Address *</h3>
            <div className="space-y-2">
              <Label htmlFor="detailedAddress">Detailed Address</Label>
              <Input
                id="detailedAddress"
                value={formData.address.detailedAddress}
                onChange={(e) => setFormData({
                  ...formData,
                  address: { ...formData.address, detailedAddress: e.target.value }
                })}
                className={validationErrors.detailedAddress ? 'border-red-500' : ''}
              />
              {validationErrors.detailedAddress && (
                <p className="text-sm text-red-500">{validationErrors.detailedAddress}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.address.city}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, city: e.target.value }
                  })}
                  className={validationErrors.city ? 'border-red-500' : ''}
                />
                {validationErrors.city && (
                  <p className="text-sm text-red-500">{validationErrors.city}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.address.state}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, state: e.target.value }
                  })}
                  className={validationErrors.state ? 'border-red-500' : ''}
                />
                {validationErrors.state && (
                  <p className="text-sm text-red-500">{validationErrors.state}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pincode">Pincode</Label>
              <Input
                id="pincode"
                value={formData.address.pincode}
                onChange={(e) => setFormData({
                  ...formData,
                  address: { ...formData.address, pincode: e.target.value }
                })}
                className={validationErrors.pincode ? 'border-red-500' : ''}
              />
              {validationErrors.pincode && (
                <p className="text-sm text-red-500">{validationErrors.pincode}</p>
              )}
            </div>
          </div>

          {/* Student Capacity */}
          <div className="space-y-2">
            <Label htmlFor="studentCapacity">Student Capacity</Label>
            <Input
              id="studentCapacity"
              type="number"
              min="0"
              value={formData.studentCapacity}
              onChange={(e) => setFormData({ ...formData, studentCapacity: parseInt(e.target.value) || 0 })}
            />
          </div>

          {/* Courses Offered */}
          <div className="space-y-2">
            <Label>Courses Offered</Label>
            {formData.coursesOffered.map((course, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  value={course}
                  onChange={(e) => handleCourseChange(index, e.target.value)}
                  placeholder={`Course ${index + 1}`}
                />
              </div>
            ))}
            <Button type="button" onClick={addCourse} variant="outline">
              Add Course
            </Button>
          </div>

          {/* Contact Email */}
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Contact Email (Optional)</Label>
            <Input
              id="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              className={validationErrors.contactEmail ? 'border-red-500' : ''}
            />
            {validationErrors.contactEmail && (
              <p className="text-sm text-red-500">{validationErrors.contactEmail}</p>
            )}
          </div>

          {/* Contact Phone */}
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Contact Phone *</Label>
            <Input
              id="contactPhone"
              value={formData.contactPhone}
              onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
              className={validationErrors.contactPhone ? 'border-red-500' : ''}
            />
            {validationErrors.contactPhone && (
              <p className="text-sm text-red-500">{validationErrors.contactPhone}</p>
            )}
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full">
            Create Training Center
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}