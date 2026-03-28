"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface PlannerSequence {
  id: string;
  name: string;
  activityIds: string[];
}

interface PlannerState {
  savedActivityIds: string[];
  queueActivityIds: string[];
  sequences: PlannerSequence[];
}

interface PlannerContextType {
  state: PlannerState;
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
  toggleQueue: (id: string) => void;
  isInQueue: (id: string) => boolean;
  addToSequence: (sequenceId: string, activityId: string) => void;
  removeFromSequence: (sequenceId: string, activityId: string) => void;
  createSequence: (name: string) => string;
  deleteSequence: (sequenceId: string) => void;
  reorderQueue: (newIds: string[]) => void;
  reorderSequence: (sequenceId: string, newIds: string[]) => void;
}

const PlannerContext = createContext<PlannerContextType | undefined>(undefined);

const STORAGE_KEY = 'curiosity_os_planner_v1';

const initialState: PlannerState = {
  savedActivityIds: [],
  queueActivityIds: [],
  sequences: [
    { id: 'seq_initial_01', name: 'This Week', activityIds: [] }
  ]
};

export function PlannerProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PlannerState>(initialState);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse local planner state", e);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isHydrated]);

  const toggleSave = (id: string) => {
    setState(prev => {
      const isSaved = prev.savedActivityIds.includes(id);
      return {
        ...prev,
        savedActivityIds: isSaved 
          ? prev.savedActivityIds.filter(sid => sid !== id) 
          : [...prev.savedActivityIds, id]
      };
    });
  };

  const isSaved = (id: string) => state.savedActivityIds.includes(id);

  const toggleQueue = (id: string) => {
    setState(prev => {
      const inQueue = prev.queueActivityIds.includes(id);
      let newState = { ...prev };
      
      if (inQueue) {
        newState.queueActivityIds = prev.queueActivityIds.filter(qid => qid !== id);
      } else {
        newState.queueActivityIds = [...prev.queueActivityIds, id];
        // Auto-save if added to queue
        if (!prev.savedActivityIds.includes(id)) {
          newState.savedActivityIds = [...prev.savedActivityIds, id];
        }
      }
      return newState;
    });
  };

  const isInQueue = (id: string) => state.queueActivityIds.includes(id);

  const addToSequence = (sequenceId: string, activityId: string) => {
    setState(prev => ({
      ...prev,
      sequences: prev.sequences.map(s => 
        s.id === sequenceId && !s.activityIds.includes(activityId)
          ? { ...s, activityIds: [...s.activityIds, activityId] }
          : s
      )
    }));
  };

  const removeFromSequence = (sequenceId: string, activityId: string) => {
    setState(prev => ({
      ...prev,
      sequences: prev.sequences.map(s => 
        s.id === sequenceId 
          ? { ...s, activityIds: s.activityIds.filter(aid => aid !== activityId) }
          : s
      )
    }));
  };

  const createSequence = (name: string) => {
    const id = `seq_${Date.now()}`;
    setState(prev => ({
      ...prev,
      sequences: [...prev.sequences, { id, name, activityIds: [] }]
    }));
    return id;
  };

  const deleteSequence = (sequenceId: string) => {
    setState(prev => ({
      ...prev,
      sequences: prev.sequences.filter(s => s.id !== sequenceId)
    }));
  };

  const reorderQueue = (newIds: string[]) => {
    setState(prev => ({ ...prev, queueActivityIds: newIds }));
  };

  const reorderSequence = (sequenceId: string, newIds: string[]) => {
    setState(prev => ({
      ...prev,
      sequences: prev.sequences.map(s => 
        s.id === sequenceId ? { ...s, activityIds: newIds } : s
      )
    }));
  };

  return (
    <PlannerContext.Provider value={{ 
      state, 
      toggleSave, 
      isSaved, 
      toggleQueue, 
      isInQueue,
      addToSequence,
      removeFromSequence,
      createSequence,
      deleteSequence,
      reorderQueue,
      reorderSequence
    }}>
      {children}
    </PlannerContext.Provider>
  );
}

export function usePlanner() {
  const context = useContext(PlannerContext);
  if (context === undefined) {
    throw new Error('usePlanner must be used within a PlannerProvider');
  }
  return context;
}
