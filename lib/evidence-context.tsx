"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

export type EvidenceType = 'observation' | 'confusion' | 'quote' | 'breakthrough' | 'participation' | 'next_step' | 'reflection';

export const TEACHER_TAGS = [
  "Strong Reasoning", "Confusion", "High Engagement", "Low Participation", 
  "Thoughtful Question", "Useful Disagreement", "Rushed Thinking", 
  "Needs Follow-up", "Clear Explanation", "Social Friction"
];

export interface EvidenceEntry {
  id: string;
  sessionId: string;
  activityId: string;
  stepIndex: number;
  timestamp: number;
  type: EvidenceType;
  note: string;
  tags: string[];
}

export interface Session {
  id: string;
  activityId: string;
  activityTitle: string;
  startTime: number;
  endTime?: number;
  status: 'active' | 'completed';
  reflection?: string;
  whatWorked?: string;
  whereStruggled?: string;
  adaptationNotes?: string;
  nextStepChoice?: 'rerun' | 'followup' | 'later';
  nextStepActivityId?: string;
}

interface EvidenceState {
  sessions: Session[];
  entries: EvidenceEntry[];
}

interface EvidenceContextType {
  state: EvidenceState;
  startSession: (activityId: string, activityTitle: string) => string;
  endSession: (sessionId: string, reflection?: string) => void;
  updateSession: (sessionId: string, updates: Partial<Session>) => void;
  addEntry: (entry: Omit<EvidenceEntry, 'id' | 'timestamp'>) => void;
  deleteEntry: (entryId: string) => void;
  getEntriesForSession: (sessionId: string) => EvidenceEntry[];
  getSessionsForActivity: (activityId: string) => Session[];
  getActiveSession: () => Session | undefined;
}

const EvidenceContext = createContext<EvidenceContextType | undefined>(undefined);

const STORAGE_KEY = 'curiosity_os_evidence_v1';

export function EvidenceProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<EvidenceState>({ sessions: [], entries: [] });
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse evidence state", e);
      }
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isHydrated]);

  const startSession = (activityId: string, activityTitle: string) => {
    const id = `session_${Date.now()}`;
    const newSession: Session = {
      id,
      activityId,
      activityTitle,
      startTime: Date.now(),
      status: 'active'
    };
    setState(prev => ({
      ...prev,
      sessions: [...prev.sessions, newSession]
    }));
    return id;
  };

  const endSession = (sessionId: string, reflection?: string) => {
    setState(prev => ({
      ...prev,
      sessions: prev.sessions.map(s => 
        s.id === sessionId 
          ? { ...s, status: 'completed', endTime: Date.now(), reflection }
          : s
      )
    }));
  };

  const updateSession = (sessionId: string, updates: Partial<Session>) => {
    setState(prev => ({
      ...prev,
      sessions: prev.sessions.map(s => 
        s.id === sessionId ? { ...s, ...updates } : s
      )
    }));
  };

  const addEntry = (entryData: Omit<EvidenceEntry, 'id' | 'timestamp'>) => {
    const entry: EvidenceEntry = {
      ...entryData,
      id: `entry_${Date.now()}`,
      timestamp: Date.now()
    };
    setState(prev => ({
      ...prev,
      entries: [...prev.entries, entry]
    }));
  };

  const deleteEntry = (entryId: string) => {
    setState(prev => ({
      ...prev,
      entries: prev.entries.filter(e => e.id !== entryId)
    }));
  };

  const getEntriesForSession = (sessionId: string) => 
    state.entries.filter(e => e.sessionId === sessionId);

  const getSessionsForActivity = (activityId: string) => 
    state.sessions.filter(s => s.activityId === activityId).sort((a,b) => b.startTime - a.startTime);

  const getActiveSession = () => 
    state.sessions.find(s => s.status === 'active');

  return (
    <EvidenceContext.Provider value={{
      state,
      startSession,
      endSession,
      updateSession,
      addEntry,
      deleteEntry,
      getEntriesForSession,
      getSessionsForActivity,
      getActiveSession
    }}>
      {children}
    </EvidenceContext.Provider>
  );
}

export function useEvidence() {
  const context = useContext(EvidenceContext);
  if (context === undefined) {
    throw new Error('useEvidence must be used within an EvidenceProvider');
  }
  return context;
}
