export interface Address {
    detailedAddress: string;
    city: string;
    state: string;
    pincode: string;
  }
  
  export interface TrainingCenter {
    id?: number;
    centerName: string;
    centerCode: string;
    address: Address;
    studentCapacity: number;
    coursesOffered: string[];
    createdOn?: number;
    contactEmail?: string;
    contactPhone: string;
  }