import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { CampaignFormData, Campaign } from '../types';
import { segments } from '../data/mockData';

interface CampaignFormProps {
  onSubmit: (campaign: Campaign) => void;
}

export default function CampaignForm({ onSubmit }: CampaignFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CampaignFormData>({
    name: '',
    type: 'email',
    audience: '',
    content: '',
    subject: '',
    schedule: {
      startDate: new Date().toISOString().split('T')[0],
      frequency: 'once'
    },
    triggers: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCampaign: Campaign = {
      id: uuidv4(),
      ...formData,
      status: 'draft',
      sentCount: 0,
      openRate: 0,
      clickRate: 0,
      createdAt: new Date().toISOString()
    };
    onSubmit(newCampaign);
    navigate('/');
  };

  const addTrigger = () => {
    setFormData(prev => ({
      ...prev,
      triggers: [...(prev.triggers || []), { event: '', condition: '' }]
    }));
  };

  const removeTrigger = (index: number) => {
    setFormData(prev => ({
      ...prev,
      triggers: prev.triggers?.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Create New Campaign</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Campaign Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Campaign Type</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.type}
            onChange={e => setFormData(prev => ({ ...prev, type: e.target.value as 'email' | 'push' | 'in-app' }))}
          >
            <option value="email">Email</option>
            <option value="push">Push Notification</option>
            <option value="in-app">In-App Message</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Target Audience</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.audience}
            onChange={e => setFormData(prev => ({ ...prev, audience: e.target.value }))}
          >
            <option value="">Select Audience</option>
            {segments.map(segment => (
              <option key={segment.id} value={segment.name}>{segment.name}</option>
            ))}
          </select>
        </div>

        {formData.type === 'email' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Subject Line</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.subject}
              onChange={e => setFormData(prev => ({ ...prev, subject: e.target.value }))}
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.content}
            onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Schedule</label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.schedule?.startDate}
              onChange={e => setFormData(prev => ({
                ...prev,
                schedule: { ...prev.schedule!, startDate: e.target.value }
              }))}
            />
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.schedule?.frequency}
              onChange={e => setFormData(prev => ({
                ...prev,
                schedule: { ...prev.schedule!, frequency: e.target.value as 'once' | 'daily' | 'weekly' | 'monthly' }
              }))}
            >
              <option value="once">Once</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Triggers</label>
            <button
              type="button"
              onClick={addTrigger}
              className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-900"
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              Add Trigger
            </button>
          </div>
          <div className="space-y-2">
            {formData.triggers?.map((trigger, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Event (e.g., user_login)"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={trigger.event}
                    onChange={e => {
                      const newTriggers = [...(formData.triggers || [])];
                      newTriggers[index].event = e.target.value;
                      setFormData(prev => ({ ...prev, triggers: newTriggers }));
                    }}
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Condition (e.g., count > 5)"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={trigger.condition}
                    onChange={e => {
                      const newTriggers = [...(formData.triggers || [])];
                      newTriggers[index].condition = e.target.value;
                      setFormData(prev => ({ ...prev, triggers: newTriggers }));
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeTrigger(index)}
                  className="mt-1 text-red-600 hover:text-red-900"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
          >
            Create Campaign
          </button>
        </div>
      </div>
    </form>
  );
}