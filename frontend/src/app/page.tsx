'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrainingCenterForm from '@/components/training-centers/form';
import TrainingCenterList from '@/components/training-centers/list';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('list');

  const handleCreateSuccess = () => {
    setActiveTab('list');
  };

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Training Centers Management</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="list">View Centers</TabsTrigger>
          <TabsTrigger value="create">Create Center</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <TrainingCenterList />
        </TabsContent>
        
        <TabsContent value="create">
          <TrainingCenterForm onSuccess={handleCreateSuccess} />
        </TabsContent>
      </Tabs>
    </main>
  );
}