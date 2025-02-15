# Traini8 - Training Center Registry System

A full-stack application for managing government-funded training centers. The system provides APIs for creating and retrieving training center information, with a user-friendly web interface. Check it out at [Live Site](https://backend-traini8-anand-akbari-nxodcmv3e-anand-akbaris-projects.vercel.app/)

## Live Deployments
- Full Demo Website: [Vercel Deployment](https://backend-traini8-anand-akbari-nxodcmv3e-anand-akbaris-projects.vercel.app/)
![image](https://github.com/user-attachments/assets/c0299154-4a60-4629-8b88-dc90d57c3acd)


- Backend hosted: [Railway Deployment](https://backendtraini8anandakbari-production-6e5c.up.railway.app)
![image](https://github.com/user-attachments/assets/c6a29180-8b5b-4214-adff-f46d43518cbc)


## Project Structure

```
traini8/
├── backend/         # Spring Boot application
│   ├── src/
│   └── pom.xml
└── frontend/        # Next.js application
    ├── src/
    ├── package.json
    └── tsconfig.json
```

## Backend Setup (Spring Boot)

### Prerequisites
- Java 17 or higher
- Maven
- PostgreSQL (for local development)

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/anandakbari/traini8.git
cd traini8
```

2. Navigate to the backend directory:
```bash
cd backend
```

3. Configure the database:
   - Open `src/main/resources/application.properties`
   - Uncomment the local PostgreSQL configuration
   - Comment out the Railway deployment configuration

4. Build and run the application:
```bash
mvn spring-boot:run
```

The backend server will start on `http://localhost:8080`

## Frontend Setup (Next.js + TypeScript)

### Prerequisites
- Node.js 16 or higher
- npm or yarn

### Local Development

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The frontend application will be available at `http://localhost:3000`

## API Endpoints

All API endpoints are accessible under the base path: `/api/training-centers`

### Create Training Center (POST)
- Endpoint: `/api/training-centers`
- Full URL (local): `http://localhost:8080/api/training-centers`
- Full URL (deployed): `https://backendtraini8anandakbari-production-6e5c.up.railway.app/api/training-centers`
```
POST /api/training-centers
Content-Type: application/json

{
  "centerName": "string",
  "centerCode": "string",
  "address": {
    "detailedAddress": "string",
    "city": "string",
    "state": "string",
    "pincode": "string"
  },
  "studentCapacity": number,
  "coursesOffered": ["string"],
  "contactEmail": "string",
  "contactPhone": "string"
}
```

### Get All Training Centers (GET)
- Endpoint: `/api/training-centers`
- Full URL (local): `http://localhost:8080/api/training-centers`
- Full URL (deployed): `https://backendtraini8anandakbari-production-6e5c.up.railway.app/api/training-centers`

```
GET /api/training-centers
```

## Deployment Notes

### Backend (Railway)
- The backend is deployed on Railway with PostgreSQL
- CORS is enabled for the Vercel frontend domain
- Environment variables are configured in Railway's dashboard

### Frontend (Vercel)
- The frontend is deployed on Vercel
- API endpoints are configured to point to the Railway backend
- TypeScript and Next.js optimizations are handled automatically by Vercel

## Additional Information

- The backend uses Spring Boot with JPA for database operations
- Frontend is built with Next.js and TypeScript for type safety
- API validation is handled through annotations in the backend
- Exception handling is implemented for proper error responses
